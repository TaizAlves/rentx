import { SimpleConsoleLogger } from "typeorm";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUSerUseCase } from "./AutenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUSerUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUSerUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to autenticate an user", async () => {
    const user: ICreateUsersDTO = {
      driver_license: "001234",
      name: " User Test",
      email: "user@test.com",
      password: "1234",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    // console.log(result);

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "kaka@tstets.com",
        password: "9183837",
      })
    ).rejects.toEqual(new AppError("Email or password Incorrect"));
  });

  it("should not be able to authenticate with an incorrect password", async () => {
    const user: ICreateUsersDTO = {
      driver_license: "99999",
      email: "user@isis.com",
      password: "1234",
      name: " Use Test error",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectpassword",
      })
    ).rejects.toEqual(new AppError("Email or password Incorrect"));
  });
});
