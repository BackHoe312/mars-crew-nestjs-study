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
import { createServerExceptionResponse } from 'src/global/response/common/index';
import { RefreshTokenDto } from '../dto/request/refresh-token.dto';
import { UserResponse } from 'src/global/response/user/user.response';
import { CommonResponse } from 'src/common/response/api.response';

@ApiTags('User')
@ApiInternalServerErrorResponse(createServerExceptionResponse())
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: SaveUserDto })
  @ApiResponse(UserResponse.save[201])
  @ApiResponse(UserResponse.save[409])
  @ApiResponse(UserResponse.save[500])
  @Post('/save')
  public async save(@Body() dto: SaveUserDto) {
    await this.userService.save(dto);

    return CommonResponse.createResponse({
      statusCode: 201,
      message: '가입이 완료되었습니다.',
    });
  }

  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse(UserResponse.login[200])
  @ApiResponse(UserResponse.login[401])
  @ApiResponse(UserResponse.login[404])
  @Post('/login')
  @HttpCode(200)
  public async login(@Body() dto: LoginUserDto) {
    const { accessToken, refreshToken } = await this.userService.login(dto);

    return CommonResponse.createResponse({
      data: { accessToken, refreshToken },
      statusCode: 200,
      message: '로그인되었습니다.',
    });
  }

  @ApiOperation({ summary: '토큰 갱신' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse(UserResponse.refresh[200])
  @ApiResponse(UserResponse.refresh[401])
  @Post('/refresh')
  @HttpCode(200)
  public async refresh(@Body() dto: RefreshTokenDto) {
    const accessToken = await this.userService.refreshAccessToken(
      dto.refreshToken,
    );

    return CommonResponse.createResponse({
      data: { accessToken },
      statusCode: 200,
      message: '갱신되었습니다.',
    });
  }
}
