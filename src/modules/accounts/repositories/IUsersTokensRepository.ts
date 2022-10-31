import { ICreateUsersTokensDTO } from "../dtos/ICreateUsersTokensDTO";
import { UsersTokens } from "../infra/typeorm/entities/UsersTokens";


interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersTokensDTO): Promise<UsersTokens>;
}

export { IUsersTokensRepository };
