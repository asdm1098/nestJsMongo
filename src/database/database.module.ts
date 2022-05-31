import { ConfigType } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import config from '../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async ( configService: ConfigType<typeof config>) => {
        const { connection, host, port, dbName } = configService.mongo;

        const uri = `${connection}://${host}:${port}`
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;

      },
      inject: [config.KEY]
    }
  ],
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule {}
