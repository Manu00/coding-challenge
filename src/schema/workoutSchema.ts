import {
  getModelForClass,
  prop,
  Ref,
  index,
  ReturnModelType,
} from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "./userSchema";
import { customAlphabet } from "nanoid";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";

const nanoid = customAlphabet("1234567890", 10);

export class WorkoutList {
  workoutList: Array<String>;

  constructor(workoutList: Array<String>) {
    this.workoutList = workoutList;
  }

  getWorkoutList() {
    return this.workoutList;
  }
}

function findByUserId(
  this: ReturnModelType<typeof Workout, QueryHelpers>,
  _id: User["_id"]
) {
  return this.findOne({ _id });
}

interface QueryHelpers {
  findByUserId: AsQueryMethod<typeof findByUserId>;
}

@ObjectType()
@index({ workoutId: 1 })
export class Workout {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @Field(() => String)
  @prop({ required: true })
  title: string;

  @Field(() => [String])
  @prop({ required: true, type: () => [String] })
  exercises?: String[];

  @Field(() => String)
  @prop({ required: true, default: () => `workout_${nanoid()}` })
  workoutId: string;
}

export const WorkoutModel = getModelForClass<typeof Workout, QueryHelpers>(
  Workout
);

@InputType()
export class CreateWorkoutInput {
  @Field(() => String)
  title: string;

  @Field(() => [String])
  exercises: Array<String>;
}

@InputType()
export class DeleteWorkoutInput {
  @Field(() => String)
  workoutId: string;
}

@InputType()
export class GetWorkoutInput {
  @Field(() => String)
  workoutId: string;
}
