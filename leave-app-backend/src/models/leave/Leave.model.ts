import mongoose from "mongoose";

import { ILeave } from "../../interface/leave.interface";

import { leaveSchema } from "./Leave.schema";

const leaveModel: mongoose.Model<ILeave> = mongoose.model<ILeave>("Leave", leaveSchema, "Leave");
export { leaveModel as LeaveModel };
