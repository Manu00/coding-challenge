import { Arg, Ctx, Mutation, Authorized, Query, Resolver } from "type-graphql";
import {
  CreateUserInput,
  LoginInput,
  User,
  PPInput,
} from "../schema/userSchema";
import UserService from "../service/userService";
import Context from "../types/context";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String)
  login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: Context) {
    return context.user;
  }

  @Authorized()
  @Mutation(() => User, { nullable: true })
  uploadPP(@Arg("input") input: PPInput, @Ctx() context: Context) {
    const user = context.user!;
    return this.userService.uploadPP({ ...input, user: user?._id });
  }
}
