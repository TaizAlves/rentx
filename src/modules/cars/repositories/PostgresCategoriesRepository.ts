import { Category } from "../infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "./ICategoriesRepository";


class PostgresCategoriesRepository implements ICategoriesRepository {
  findbyName(name: string): Category {
    return null;
    }
    list(): Category[] {
        throw new Error("Method not implemented.");
    }
    create({ name, description }: ICreateCategoryDTO): void {
        console.log(name, description);
    }

}

export { PostgresCategoriesRepository };
