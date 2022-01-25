import WorkoutResolver from "./WorkoutResolver";
import FinishedWorkoutResolver from "./FinishedWorkoutResolver";
import UserResolver from "./UserResolver";

export const resolvers = [
  WorkoutResolver,
  FinishedWorkoutResolver,
  UserResolver,
] as const;
