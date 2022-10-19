import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "car descriptnom ",
      daily_rate: 120,
      license_plate: "FFF49393",
      fine_amount: 40,
      brand: "Car_Brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});
    // console.log(cars);

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "car descriptnom ",
      daily_rate: 100,
      license_plate: "DFE49393",
      fine_amount: 40,
      brand: "Car_Brand-test",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car_Brand-test",
    });
     //console.log(cars);

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "car descriptnom ",
      daily_rate: 100,
      license_plate: "DFE -59393",
      fine_amount: 40,
      brand: "Car_Brand-test",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "car descriptnom ",
      daily_rate: 100,
      license_plate: "DFE49393",
      fine_amount: 40,
      brand: "Car_Brand-test",
      category_id: "12345",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
