import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAutenticated } from "@shared/infra/http/middleware/ensureAuthenticated";

import { ensureAdmin } from "../middleware/ensureAdmin";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAutenticated);

specificationRoutes.post(
  "/",
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationRoutes };
