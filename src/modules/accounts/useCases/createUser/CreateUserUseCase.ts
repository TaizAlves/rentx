import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUsersDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordhash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordhash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
