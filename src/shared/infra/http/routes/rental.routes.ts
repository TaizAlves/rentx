import { CreateRentalController } from "@modules/rentals/useCase/createRental/CreateRentalController";
import { Router } from "express";
import { ensureAutenticated } from "../middleware/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController()

rentalRoutes.post("/", ensureAutenticated, createRentalController.handle);

export { rentalRoutes };
