import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  FinishedWorkoutInput,
  FinishedWorkout,
  GetFinishedWorkoutInput,
} from "../schema/finishedWorkoutSchema";
import FinishedWorkoutService from "../service/finishedWorkoutService";
import Context from "../types/context";

@Resolver()
export default class FinishedWorkoutResolver {
  constructor(private finishedWorkoutService: FinishedWorkoutService) {
    this.finishedWorkoutService = new FinishedWorkoutService();
  }

  @Authorized()
  @Mutation(() => FinishedWorkout)
  async finishWorkout(
    @Arg("input") input: FinishedWorkoutInput,
    @Ctx() context: Context
  ) {
    const user = context.user!;
    return this.finishedWorkoutService.finishWorkout({
      ...input,
      user: user?._id,
    });
  }

  @Authorized()
  @Query(() => [FinishedWorkout], { nullable: true })
  finishedWorkouts(
    @Ctx() context: Context
  ) {
    return this.finishedWorkoutService.findFinishedWorkouts(context.user!);
  }
  //@Query(() => [FinishedWorkout], { nullable: true })
  //finishedWorkouts() {
  //  return this.finishedWorkoutService.findFinishedWorkouts();
  //}

  @Authorized()
  @Query(() => FinishedWorkout, { nullable: true })
  finishedWorkout(
    @Arg("input") input: GetFinishedWorkoutInput,
    @Ctx() context: Context
  ) {
    return this.finishedWorkoutService.findSingleFinishedWorkout(
      input,
      context.user!
    );
  }
  /*@Authorized()
  @Query(() => FinishedWorkout, { nullable: true })
  finishedWorkout(
    @Arg("input") input: GetFinishedWorkoutInput,
    @Ctx() context: Context
  ) {
    const user = context.user!;
    return this.finishedWorkoutService.findSingleFinishedWorkout({
      ...input,
      user: user?._id,
    });
  }*/
}
