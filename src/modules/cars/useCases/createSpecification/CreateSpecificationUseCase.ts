import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificatiosRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExistes = await this.specificatiosRepository.findByName(name);

    if (specificationAlreadyExistes) {
      throw new AppError("Specification already exists");
    }

    await this.specificatiosRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
