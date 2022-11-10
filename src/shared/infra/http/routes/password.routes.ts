import { Router } from "express";

import { SendForgottenPasswordMailController } from "@modules/accounts/useCases/sendForgottenPasswoedMail/SendForgottenPasswordMailController";
import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";

const passwordRoutes = Router();

const sendForgottenPasswordMailController =
  new SendForgottenPasswordMailController();

const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgotten", sendForgottenPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
