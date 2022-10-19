import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { ICreateUsersDTO } from "../../dtos/ICreateUsersDTO";
import { IUserRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async create({
    email,
    name,
    password,
    driver_license,
  }: ICreateUsersDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      email,
      name,
      driver_license,
      password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
