import { CustomRepository } from 'src/common/repository/typeorm-ex.decorator';
import { User } from '../domain/user.entity';
import { Repository } from 'typeorm';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
