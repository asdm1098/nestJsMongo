import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BrandsService {
  
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}


  async findAll() {
    return await this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.brandModel.findOne({ _id: id }).exec();
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  async create(data: CreateBrandDto) {
    const newBrand = await new this.brandModel(data);
    return newBrand.save();
  }

  async update(id: string, changes: UpdateBrandDto) {
    const product = await this.brandModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  remove(id: string) {
    return this.brandModel.findByIdAndDelete(id);
  }
}
