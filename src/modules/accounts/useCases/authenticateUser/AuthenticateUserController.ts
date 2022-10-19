import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUSerUseCase } from "./AutenticateUserUseCase";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUSerUseCase);

    const authenticateinfo = await authenticateUserUseCase.execute({
      password,
      email,
    });

    return res.json(authenticateinfo);
  }
}

export { AuthenticateUserController };
