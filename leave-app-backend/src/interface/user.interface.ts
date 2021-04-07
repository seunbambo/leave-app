import mongoose from "mongoose";
import { ILeave } from "./leave.interface";

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  role?: string;
  date?: Date;
  leaves?: [{ leave: ILeave | string }];

  comparePassword(password: string): Promise<boolean>;
}
