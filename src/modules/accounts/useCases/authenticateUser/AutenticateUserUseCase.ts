import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUSerUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // usuário existe
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password Incorrect");
    }

    // senha correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password Incorrect");
    }

    // gerar jsonwebtoken
    const token = sign({}, "1eaa5d6ebd5c1521099f942e4700c06c", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
    return tokenReturn;
  }
}

export { AuthenticateUSerUseCase };
