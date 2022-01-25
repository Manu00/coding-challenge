import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateWorkoutInput,
  GetWorkoutInput,
  DeleteWorkoutInput,
  Workout,
} from "../schema/workoutSchema";
import WorkoutService from "../service/workoutService";
import Context from "../types/context";

@Resolver()
export default class WorkoutResolver {
  constructor(private workoutService: WorkoutService) {
    this.workoutService = new WorkoutService();
  }

  @Authorized()
  @Mutation(() => Workout)
  async createWorkout(
    @Arg("input") input: CreateWorkoutInput,
    @Ctx() context: Context
  ) {
    const user = context.user!;
    return this.workoutService.createWorkout({ ...input, user: user?._id });
  }

  @Authorized()
  @Mutation(() => Workout, { nullable: true })
  async deleteWorkout(
    @Arg("input") input: DeleteWorkoutInput,
    @Ctx() context: Context
  ) {
    return this.workoutService.deleteWorkout(input, context.user!);
  }

  @Query(() => [Workout], { nullable: true })
  workouts() {
    return this.workoutService.findWorkouts();
  }

  @Query(() => Workout, { nullable: true })
  workout(@Arg("input") input: GetWorkoutInput) {
    return this.workoutService.findSingleWorkout(input);
  }
}
