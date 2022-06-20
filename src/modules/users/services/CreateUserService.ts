import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email address Alredy use.", 401);
    }

    const hashedPasswaord = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPasswaord,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
