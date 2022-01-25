import { getModelForClass, prop, index, Ref } from "@typegoose/typegoose";
import { Max, Min } from "class-validator";
import { Field, ObjectType, InputType, Int } from "type-graphql";
import { User } from "./userSchema";
import Moment from "moment";

@index({ finishedAt: 1 })
@ObjectType()
export class FinishedWorkout {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @Field(() => String)
  @prop({ required: true })
  workoutId: string;

  @Field()
  @prop({ default: Moment().format("YYYY-MM-DD hh:mm:ss") })
  finishedAt: string;

  @Field(() => Int)
  @prop({ required: true })
  rating: number;
}

export const FinishedWorkoutModel =
  getModelForClass<typeof FinishedWorkout>(FinishedWorkout);

@InputType()
export class FinishedWorkoutInput {
  @Field(() => String)
  workoutId: string;

  @Min(1, { message: "Rating musst be between 1 & 5" })
  @Max(5, { message: "Rating musst be between 1 & 5" })
  @Field(() => Int)
  rating: number;
}

@InputType()
export class GetFinishedWorkoutInput {
  @Field(() => String)
  workoutId: string;
}
