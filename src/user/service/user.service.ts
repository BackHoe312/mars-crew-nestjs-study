import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SaveUserDto } from '../dto/request/save-user.dto';
import { UserRepository } from '../repository/user.repository';
import { LoginUserDto } from '../dto/request/login-user.dto';
import { User } from '../domain/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   *
   * @description: Save User
   */
  public async save(dto: SaveUserDto): Promise<User> {
    if (await this.userRepository.existsBy({ email: dto.email }))
      throw new BadRequestException('이미 등록된 이메일입니다.');

    const entity = this.userRepository.create(dto);

    return await this.userRepository.save(entity);
  }

  /**
   * @description: Login User
   */
  public async login(dto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (!user) throw new NotFoundException('가입되지 않은 이메일입니다.');

    await user.validationPassword(dto.password);

    return user;
  }
}
