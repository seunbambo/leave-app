import mongoose from "mongoose";

const leaveSchema: mongoose.Schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  leaveId: { type: String },
  typeOfLeave: { type: String },
  leaveStatus: { type: String, default: "Pending" },
  startDate: { type: Date },
  endDate: { type: Date },
  resumptionDate: { type: Date },
});

export { leaveSchema };
