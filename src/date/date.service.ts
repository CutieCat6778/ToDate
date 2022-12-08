import { UserService } from './../user/user.service';
import { Injectable, Inject } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { GetDateArgs, GetDatesArgs } from 'src/dto/date.args';
import { Date as DateModel } from 'src/model/user.model';
import {
  CreateDateInput,
  RemoveDateInput,
  UpdateDateInput,
} from 'src/dto/date.input';
import e from 'express';

@Injectable()
export class DateService {
  constructor(
    private userService: UserService,
    @Inject('DATE_MODEL') private dateModel: Model<DateModel & Document>,
  ) {}

  async createDate(args: CreateDateInput, authorId: string) {
    const newDate = {
      ...args,
      author: authorId,
      expireIn: new Date().getTime() + args.time
    };
    const date = new this.dateModel(newDate);
    const user = await this.userService.findById(authorId);
    user.dates.push(date._id);
    await this.userService.updateOne(
      {
        _id: authorId,
      },
      {
        dates: user.dates,
      },
    );
    await date.save();
    return date;
  }

  async getDates(args: GetDatesArgs) {
    const user = await this.userService.getUserByName(args);

    if (!user) {
      return new Error('User not found!');
    }

    const dates = [];
    const next = [];
    const currentDate = new Date().getTime();

    for (const id of user.dates) {
      const date = await this.dateModel.findOne({ _id: id.toString() });
      console.log(date, currentDate > date.expireIn);
      if (currentDate > date.expireIn)
        this.removeDate({ username: args.username, id: id.toString() });
      else if((currentDate + 1000 * 60 * 60 * 24 ) < date.expireIn && currentDate > date.createdAt) {
        next.push(date);
      }
      else if((currentDate + 1000 * 60 * 60 * 24 ) > date.expireIn && currentDate < date.expireIn && currentDate > date.createdAt) {
        dates.push(date);
      }
    }

    console.log(dates);

    return {
      dates,
      next
    };
  }

  async getDateById(args: GetDateArgs) {
    const user = await this.userService.getUserByName(args);

    if (!user) {
      return new Error('User not found!');
    }

    return this.dateModel.findOne({ _id: args.id });
  }

  async removeDate(args: RemoveDateInput) {
    const user = await this.userService.getUserByName(args);

    if (!user) {
      return new Error('User not found!');
    }

    await this.dateModel.remove({ _id: args.id });
    const pos = user.dates.indexOf(args.id, 0);
    user.dates.splice(pos, 1);
    await user.save();

    return true;
  }

  async updateDate(args: UpdateDateInput) {
    return this.dateModel.updateOne({ author: args.query }, args);
  }
}
