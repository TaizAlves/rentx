import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCase/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCase/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCase/listRentalsByUser/ListRentalsByUserController";

import { ensureAutenticated } from "../middleware/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAutenticated, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAutenticated,
  devolutionRentalController.handle
);

rentalRoutes.get(
  "/user",
  ensureAutenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };
