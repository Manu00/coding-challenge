import {
  WorkoutModel,
  CreateWorkoutInput,
  GetWorkoutInput,
  DeleteWorkoutInput,
} from "../schema/workoutSchema";
import { User } from "../schema/userSchema";

class WorkoutService {
  async createWorkout(input: CreateWorkoutInput & { user: User["_id"] }) {
    return WorkoutModel.create(input);
  }

  async findWorkouts() {
    return WorkoutModel.find().lean();
  }

  async findSingleWorkout(input: GetWorkoutInput) {
    return WorkoutModel.findOne(input).lean();
  }

  async deleteWorkout(input: DeleteWorkoutInput, userObj: User) {
    return WorkoutModel.findOneAndDelete({workoutId: input["workoutId"], user: userObj["_id"]});
  }
}

export default WorkoutService;
