import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAutenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeather = req.headers.authorization;

  const userTokensRepository = new UsersTokensRepository();

  if (!authHeather) {
    throw new AppError("Token missing", 401);
  }
  // desestruturar o token Bearer 29929djkajdkjd
  const [, token] = authHeather.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    // const usersRepository = new UsersRepository();

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError("User does not exists", 401);
    }
    req.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid Token", 401);
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjMwMTEwNTIsImV4cCI6MTY2MzA5NzQ1Miwic3ViIjoiNjM5ZGMyZDMtYzkwMS00MjRhLThiNGMtMTg2MjBiMmE0Y2M5In0.eVeXfBIo0KkqQ5u5-osA6K0goRoTGED0QNugcT6zhD
