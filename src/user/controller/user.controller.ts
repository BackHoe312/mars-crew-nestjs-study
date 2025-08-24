import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../domain/user.entity';
import { SaveUserDto } from '../dto/request/save-user.dto';
import { LoginUserDto } from '../dto/request/login-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: SaveUserDto })
  @Post('/save')
  public async save(@Body() dto: SaveUserDto): Promise<User> {
    return this.userService.save(dto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginUserDto })
  @Post('/login')
  public async login(@Body() dto: LoginUserDto): Promise<{ id: number }> {
    const userId = (await this.userService.login(dto)).userId;

    return { id: userId };
  }
}
