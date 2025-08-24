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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/util/guard/auth.guard';
import { UserId } from 'src/common/decorator/user/user.decorator';

@ApiTags('Contact')
@ApiBearerAuth('x-user-id')
@UseGuards(AuthGuard)
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: '전화번호부 생성' })
  @ApiBody({ type: CreateContactDto })
  @Post()
  async createContact(
    @UserId() userId: number,
    @Body() createContactDto: CreateContactDto,
  ) {
    return this.contactService.createContact(userId, createContactDto);
  }

  @ApiOperation({ summary: '전화번호부 조회' })
  @Get('/search')
  async search(@UserId() userId: number, @Query() dto: SearchContactDto) {
    return this.contactService.findAllByQuery(userId, dto);
  }

  @ApiOperation({ summary: '전화번호부 단일 조회' })
  @Get('/search/:contactId')
  async findByPhone(
    @UserId() userId: number,
    @Param('contactId') contactId: number,
  ) {
    return this.contactService.findOneById(userId, contactId);
  }

  @ApiOperation({ summary: '전화번호부 단일 삭제' })
  @Delete('/:contactId')
  async deleteContactByPhone(
    @UserId() userId: number,
    @Param('contactId') contactId: number,
  ) {
    return this.contactService.deleteContactById(userId, contactId);
  }

  @ApiOperation({ summary: '전화번호부 다중 삭제' })
  @ApiBody({ type: DeleteContactDto })
  @Delete('/')
  async deleteContactsByIds(
    @UserId() userId: number,
    @Body() dto: DeleteContactDto,
  ) {
    return this.contactService.deleteContactsByIds(userId, dto);
  }

  @ApiOperation({ summary: '전화번호부 수정' })
  @ApiBody({ type: UpdateContactDto })
  @Patch(':contactId')
  async update(
    @UserId() userId: number,
    @Param('contactId') contactId: number,
    @Body() dto: UpdateContactDto,
  ) {
    return this.contactService.updateContactById(userId, contactId, dto);
  }
}
