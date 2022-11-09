import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgottenPasswordMailUseCase } from "./SendForgottenPasswordMailUseCase";

class SendForgottenPasswordMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgottenPasswordMailUseCase = container.resolve(
      SendForgottenPasswordMailUseCase
    );

    await sendForgottenPasswordMailUseCase.execute(email);

    return res.send();
  }
}

export { SendForgottenPasswordMailController };
