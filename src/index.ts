import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { connectToMongo } from "./utils/mongo";
import { resolvers } from "./resolvers";
import { verifyJwt } from "./utils/jwt";
import { User } from "./schema/userSchema";
import Context from "./types/context";
import authChecker from "./utils/authChecker";

(async () => {
  //build schema
  const schema = await buildSchema({
    resolvers,
    authChecker,
  });

  //init express
  const app = express();

  app.use(cookieParser());

  //await createConnection();

  //create apollo server
  const apolloServer = new ApolloServer({
    introspection: true,
    schema,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
              "request.credentials": "include",
            },
          })
        : ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
              "request.credentials": "include",
            },
          }),
    ],
    context: (ctx: Context) => {
      const context = ctx;

      if (ctx.req.cookies.accessToken) {
        const user = verifyJwt<User>(ctx.req.cookies.accessToken);

        context.user = user;
      }
      return context;
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  //start listening
  app.listen(4000, () => {
    console.log("express server started");
  });

  //print environment
  console.log(process.env.NODE_ENV);

  //conect to mongodb(mongo)
  connectToMongo();
})();
