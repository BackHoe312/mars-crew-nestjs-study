import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UserService } from '../service/user.service';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SaveUserDto } from '../dto/request/save-user.dto';
import { LoginUserDto } from '../dto/request/login-user.dto';
import { createServerExceptionResponse } from 'src/common/response/api.response';

@ApiTags('User')
@ApiInternalServerErrorResponse(createServerExceptionResponse())
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: SaveUserDto })
  @ApiResponse({
    status: 201,
    description: '회원가입 완료',
  })
  @Post('/save')
  public async save(@Body() dto: SaveUserDto) {
    return this.userService.save(dto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 200,
    description: '로그인 완료',
  })
  @Post('/login')
  @HttpCode(200)
  public async login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }
}
