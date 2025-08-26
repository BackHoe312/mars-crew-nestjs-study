import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SaveUserDto } from '../dto/request/save-user.dto';
import { UserRepository } from '../repository/user.repository';
import { LoginUserDto } from '../dto/request/login-user.dto';
import { User } from '../domain/user.entity';
import { CommonResponse } from 'src/common/response/api.response';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * @description: 회원가입
   */
  public async save(dto: SaveUserDto): Promise<any> {
    if (await this.userRepository.existsBy({ email: dto.email }))
      throw new BadRequestException('이미 등록된 이메일입니다.');

    const entity = this.userRepository.create(dto);

    try {
      await this.userRepository.save(entity);
    } catch (e) {
      throw new InternalServerErrorException('서버 에러가 발생했습니다.');
    }

    return CommonResponse.createResponse({
      statusCode: 201,
      message: '가입이 완료되었습니다.',
    });
  }

  /**
   * @description: 로그인
   */
  public async login(dto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (!user) throw new NotFoundException('가입되지 않은 이메일입니다.');

    await user.validationPassword(dto.password);

    return CommonResponse.createResponse({
      data: {
        userId: user.userId,
      },
      statusCode: 200,
      message: '로그인되었습니다.',
    });
  }
}
