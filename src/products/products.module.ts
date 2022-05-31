import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Brand, BrandSchema } from './entities/brand.entity';
import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  imports: [ MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema
    },
    {
      name: Brand.name,
      schema: BrandSchema,
    },
  ])],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService],
})
export class ProductsModule {}
