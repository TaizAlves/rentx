import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface IRequest {
  car_id: string;
  specification_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute({ car_id, specification_id }: IRequest): Promise<Car> {
    const carExist = await this.carsRepository.findById(car_id);

    if (!carExist) {
      throw new AppError("Car does not exists");
    }
    const specifications = await this.specificationsRepository.findByIds(
      specification_id
    );
    carExist.specifications = specifications;
    await this.carsRepository.create(carExist);
    // console.log(carExist)
    return carExist;
  }
}

export { CreateCarSpecificationUseCase };
