import mongoose from "mongoose";

export interface ILeave extends mongoose.Document {
  _id: string;
  user: string;
  leaveId: string;
  typeOfLeave: string;
  leaveStatus: string;
  startDate: Date;
  endDate: Date;
  resumptionDate: Date;
}
