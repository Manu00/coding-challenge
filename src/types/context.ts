import { Request, Response } from "express";
import { User } from "../schema/userSchema";

interface Context {
  req: Request;
  res: Response;
  user: User | null;
}

export default Context;
