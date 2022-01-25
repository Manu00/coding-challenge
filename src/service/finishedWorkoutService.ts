import {
  FinishedWorkoutModel,
  GetFinishedWorkoutInput,
  FinishedWorkoutInput,
} from "../schema/finishedWorkoutSchema";
import { User } from "../schema/userSchema";

class FinishedWorkoutService {
  async finishWorkout(input: FinishedWorkoutInput & { user: User["_id"] }) {
    return FinishedWorkoutModel.create(input);
  }

  async findFinishedWorkouts(userObj: User) {
    return FinishedWorkoutModel.find({ user: userObj["_id"] }).lean();
  }
  /*  async findFinishedWorkouts() {
    return FinishedWorkoutModel.find().lean();
  }*/

  async findSingleFinishedWorkout(input: GetFinishedWorkoutInput, userObj: User) {
    return FinishedWorkoutModel.findOne({user: userObj["_id"], workoutId: input["workoutId"]}).lean();
  }
  /*async findSingleFinishedWorkout(
    input: GetFinishedWorkoutInput & { user: User["_id"] }
  ) {
    return FinishedWorkoutModel.findOne(input).lean();
  }*/
}

export default FinishedWorkoutService;
