import Context from "../types/context";
import { UserModel, LoginInput, PPInput } from "../schema/userSchema";
import { ApolloError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt";
import { User } from "../schema/userSchema";

class UserService {
  async createUser(input: any) {
    return UserModel.create(input);
  }

  async login(input: LoginInput, context: Context) {
    const e = "Invalid email or password";

    // Get our user by email
    const user = await UserModel.find().findByEmail(input.email).lean();

    if (!user) {
      throw new ApolloError(e);
    }

    // validate the password
    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) {
      throw new ApolloError(e);
    }

    // sign a jwt
    const token = signJwt(user);

    // set a cookie for the jwt
    context.res.cookie("accessToken", token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: false,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    });

    return token;
  }

  async uploadPP(input: PPInput & { user: User["_id"] }) {
    console.log(input);
    return null;
  }
}

export default UserService;
