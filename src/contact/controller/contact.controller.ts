import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from '../service/contact.service';
import { CreateContactDto } from '../dto/request/create-contact.dto';
import { UpdateContactDto } from '../dto/request/update-contact.dto';
import { SearchContactDto } from '../dto/response/search-contact.dto';
import { DeleteContactDto } from '../dto/request/delete-contact.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserId } from 'src/common/decorator/user/user.decorator';
import {
  createServerExceptionResponse,
  createUnauthorizedResponse,
} from 'src/global/response/common/index';
import JwtAccessGuard from 'src/user/passport/user.jwt-access.guard';
import { ContactResponse } from 'src/global/response/contact/contact.response';
import { CommonResponse } from 'src/common/response/api.response';

@ApiTags('Contact')
@ApiBearerAuth('access-token')
@UseGuards(JwtAccessGuard)
@ApiInternalServerErrorResponse(createServerExceptionResponse())
@ApiUnauthorizedResponse(createUnauthorizedResponse())
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: '전화번호부 생성' })
  @ApiBody({ type: CreateContactDto })
  @ApiResponse(ContactResponse.save[201])
  @ApiResponse(ContactResponse.save[409])
  @Post()
  async createContact(
    @UserId() userId: number,
    @Body() createContactDto: CreateContactDto,
  ) {
    const contactId = await this.contactService.createContact(
      userId,
      createContactDto,
    );

    return CommonResponse.createResponse({
      statusCode: 201,
      message: '연락처가 등록되었습니다.',
      data: {
        contactId,
      },
    });
  }

  @ApiOperation({ summary: '전화번호부 조회' })
  @ApiResponse(ContactResponse.findAll[200])
  @Get('/search')
  async search(@UserId() userId: number, @Query() dto: SearchContactDto) {
    const { data, count } = await this.contactService.findAllByQuery(
      userId,
      dto,
    );

    return CommonResponse.createPaginationResponse({
      statusCode: 200,
      message: '조회되었습니다.',
      data,
      count,
      page: dto.page || 1,
      limit: dto.limit || 10,
    });
  }

  @ApiOperation({ summary: '전화번호부 단일 조회' })
  @ApiResponse(ContactResponse.findByContactId[200])
  @ApiResponse(ContactResponse.findByContactId[404])
  @Get('/search/:contactId')
  async findByPhone(
    @UserId() userId: number,
    @Param('contactId') contactId: number,
  ) {
    const data = await this.contactService.findOneById(userId, contactId);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '조회되었습니다.',
      data,
    });
  }

  @ApiOperation({ summary: '전화번호부 단일 삭제' })
  @ApiResponse(ContactResponse.deleteByContactId[200])
  @ApiResponse(ContactResponse.deleteByContactId[404])
  @Delete('/:contactId')
  async deleteContactByPhone(
    @UserId() userId: number,
    @Param('contactId') contactId: number,
  ) {
    const count = await this.contactService.deleteContactById(
      userId,
      contactId,
    );

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '삭제되었습니다.',
      data: {
        count,
      },
    });
  }

  @ApiOperation({ summary: '전화번호부 다중 삭제' })
  @ApiBody({ type: DeleteContactDto })
  @ApiResponse(ContactResponse.deleteByContactIds[200])
  @ApiResponse(ContactResponse.deleteByContactIds[404])
  @Delete('/')
  async deleteContactsByIds(
    @UserId() userId: number,
    @Body() dto: DeleteContactDto,
  ) {
    const count = await this.contactService.deleteContactsByIds(userId, dto);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '삭제되었습니다.',
      data: {
        count,
      },
    });
  }

  @ApiOperation({ summary: '전화번호부 수정' })
  @ApiBody({ type: UpdateContactDto })
  @ApiResponse(ContactResponse.update[200])
  @ApiResponse(ContactResponse.update[404])
  @ApiResponse(ContactResponse.update[409])
  @Patch(':contactId')
  async update(
    @UserId() userId: number,
    @Param('contactId') contactId: number,
    @Body() dto: UpdateContactDto,
  ) {
    await this.contactService.updateContactById(userId, contactId, dto);

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '수정되었습니다.',
    });
  }
}
