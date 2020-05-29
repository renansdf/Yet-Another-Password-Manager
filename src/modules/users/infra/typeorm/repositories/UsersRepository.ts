import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import User from '@modules/users/infra/typeorm/entities/User';
import { getRepository, Repository } from 'typeorm';
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ name, email, master_password }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, master_password });
    await this.ormRepository.save(user);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });
    return user;
  }
}

export default UsersRepository;