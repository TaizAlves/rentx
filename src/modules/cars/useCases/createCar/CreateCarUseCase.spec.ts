import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("CreateCar", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: " description",
      daily_rate: 200,
      license_plate: "AB456",
      fine_amount: 60,
      brand: "Brand",
      category_id: "categoru",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with existing licence plate ", async () => {
    await createCarUseCase.execute({
      name: "Name Car1",
      description: " description",
      daily_rate: 200,
      license_plate: "AB456",
      fine_amount: 60,
      brand: "Brand",
      category_id: "categoru",
    });

    await expect(
      createCarUseCase.execute({
        name: "Name Car2",
        description: " description",
        daily_rate: 200,
        license_plate: "AB456",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("should be able to create a car with available default as true", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: " description",
      daily_rate: 200,
      license_plate: "FH413",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
