import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SaveUserDto } from '../dto/request/save-user.dto';
import { UserRepository } from '../repository/user.repository';
import { LoginUserDto } from '../dto/request/login-user.dto';
import { JwtPayload } from '../passport/user.jwt-access.strategy';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * @description: 회원가입
   */
  public async save(dto: SaveUserDto) {
    if (await this.userRepository.existsBy({ email: dto.email }))
      throw new ConflictException('이미 등록된 이메일입니다.');

    const entity = this.userRepository.create(dto);

    try {
      await this.userRepository.save(entity);
    } catch (e) {
      throw new InternalServerErrorException('서버 에러가 발생했습니다.');
    }
  }

  /**
   * @description: 로그인
   */
  public async login(
    dto: LoginUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (!user) throw new NotFoundException('가입되지 않은 이메일입니다.');

    await user.validationPassword(dto.password);

    const accessToken = this.generateAccessToken({
      userId: user.userId,
      email: user.email,
    });

    const refreshToken = this.generateRefreshToken({
      userId: user.userId,
      email: user.email,
    });

    const hashedRefreshToken = await user.hashRefreshToken(refreshToken);

    user.refreshToken = hashedRefreshToken;
    await this.userRepository.save(user);

    return { accessToken, refreshToken };
  }

  /**
   * @description JWT Access Token 생성
   */
  private generateAccessToken(payload: JwtPayload): string {
    const accessToken = this.jwtService.sign({
      userId: payload.userId,
      email: payload.email,
    });

    return accessToken;
  }

  /**
   * @description JWT Refresh Token 생성
   */
  private generateRefreshToken(payload: JwtPayload): string {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });

    return refreshToken;
  }

  /**
   * @description JWT Access Token 갱신
   */
  public async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload: JwtPayload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      });
      const user = await this.userRepository.findOneBy({
        userId: payload.userId,
      });

      if (!user || !user.validationRefreshToken(refreshToken))
        throw new UnauthorizedException('refresh token이 유효하지 않습니다.');

      const newAccessToken = this.generateAccessToken(payload);

      return newAccessToken;
    } catch (e) {
      throw new UnauthorizedException('refresh token이 유효하지 않습니다.');
    }
  }
}
