import Joi from "@hapi/joi";
import { Context } from "koa";

import { ILeave } from "../../interface/leave.interface";
import { LeaveModel } from "../../models/leave/Leave.model";
import { UserModel } from "../../models/user/User.model";

const RANDOM_VALUE_MULTIPLIER = 10001;

export class Leave {
  public async getAllLeaves(ctx: Context): Promise<void> {
    try {
      const leaves = await LeaveModel.find({}).sort({ created: -1 });
      ctx.body = { message: "All leaves", leaves };
    } catch (error) {
      console.log(error);
      ctx.body = error;
    }
  }

  public async addLeave(ctx: Context): Promise<void> {
    try {
      const body: ILeave = ctx.request.body;
      const schema = Joi.object().keys({
        typeOfLeave: Joi.string().optional(),
        leaveStatus: Joi.string().optional(),
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional(),
        resumptionDate: Joi.date().optional(),
      });
      const value: ILeave = await schema.validateAsync(body);
      console.log("body");
      const { id } = ctx.state.user;
      console.log("body");

      value.user = id;
      value.leaveId = `${Math.floor(Math.random() * RANDOM_VALUE_MULTIPLIER)}`;
      const leave = await LeaveModel.create(value);
      if (leave) {
        await UserModel.updateOne(
          {
            _id: id,
          },
          {
            $push: {
              leaves: {
                leave: leave._id,
              },
            },
          }
        );
        console.log("Success");
        ctx.body = { message: "Leave added successfully", leave };
      }
      ctx.body = { message: "Leave added successfully", leave };
    } catch (error) {
      ctx.body = error;
    }
  }

  public async editLeave(ctx: Context): Promise<void> {
    try {
      const body: ILeave = ctx.request.body;
      const { id } = ctx.params;
      const schema = Joi.object().keys({
        typeOfLeave: Joi.string().optional(),
        leaveStatus: Joi.string().optional(),
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional(),
        resumptionDate: Joi.date().optional(),
      });
      const value: ILeave = await schema.validateAsync(body);
      await LeaveModel.updateOne(
        {
          _id: id,
        },
        {
          typeOfLeave: value.typeOfLeave,
          leaveStatus: value.leaveStatus,
          startDate: value.startDate,
          endDate: value.endDate,
          resumptionDate: value.resumptionDate,
        }
      );
      ctx.body = { message: "Leave updated successfully" };
    } catch (error) {
      ctx.body = error;
    }
  }

  public async deleteLeave(ctx: Context): Promise<void> {
    try {
      const { _id } = ctx.params;
      const { id } = ctx.state.user;

      await LeaveModel.deleteOne({ _id });
      await UserModel.updateOne(
        {
          _id: id,
        },
        {
          $pull: {
            leaves: {
              leave: _id,
            },
          },
        }
      );

      ctx.body = { message: "Leave deleted successfully" };
    } catch (error) {
      ctx.body = error;
    }
  }
  public async approveLeave(ctx: Context): Promise<void> {
    try {
      const { _id } = ctx.params;

      await LeaveModel.updateOne(
        {
          _id,
        },
        {
          leaveStatus: "Approved",
        }
      );

      ctx.body = { message: "Leave approved successfully" };
    } catch (error) {
      ctx.body = error;
    }
  }

  public async rejectLeave(ctx: Context): Promise<void> {
    try {
      const { _id } = ctx.params;

      await LeaveModel.updateOne(
        {
          _id,
        },
        {
          leaveStatus: "Rejected",
        }
      );

      ctx.body = { message: "Leave Rejected" };
    } catch (error) {
      ctx.body = error;
    }
  }
}
