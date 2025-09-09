import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { TypeOrmExModule } from 'src/common/repository/typeorm-ex.module';
import { UserRepository } from './repository/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import JwtAccessStrategy from './passport/user.jwt-access.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtAccessStrategy],
})
export class UserModule {}
