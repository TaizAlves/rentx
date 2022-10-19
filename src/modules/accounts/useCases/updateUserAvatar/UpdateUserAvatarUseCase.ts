import { inject, injectable } from "tsyringe";
import { deleteFile } from "@utils/file";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}
// add coluna avatar na tabela
// refaturar usuario com coluna avatar
// configuracao upload multer
// criar regra de negocio do upload

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
