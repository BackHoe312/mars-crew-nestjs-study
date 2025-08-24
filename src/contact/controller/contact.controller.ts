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
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/util/guard/auth.guard';
import { UserId } from 'src/common/decorator/user/user.decorator';

@ApiTags('Contact')
@UseGuards(AuthGuard)
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // 전화번호 생성
  @Post()
  async createContact(
    @UserId() userId: number,
    @Body() createContactDto: CreateContactDto,
  ) {
    return this.contactService.createContact(userId, createContactDto);
  }

  // 전화번호 조회
  @Get('/search')
  async search(@UserId() userId: number, @Query() dto: SearchContactDto) {
    return this.contactService.findAllByQuery(userId, dto);
  }

  // 단일 검색
  @Get('/search/:contact_id')
  async findByPhone(
    @UserId() userId: number,
    @Param('contact_id') contact_id: number,
  ) {
    return this.contactService.findOneById(userId, contact_id);
  }

  // 단일 삭제
  @Delete('/:contact_id')
  async deleteContactByPhone(
    @UserId() userId: number,
    @Param('contact_id') contact_id: number,
  ) {
    return this.contactService.deleteContactById(userId, contact_id);
  }

  // 다중 삭제
  @Delete('/')
  async deleteContactsByIds(
    @UserId() userId: number,
    @Body() dto: DeleteContactDto,
  ) {
    return this.contactService.deleteContactsByIds(userId, dto);
  }

  // 수정
  @Patch(':contact_id')
  async update(
    @UserId() userId: number,
    @Param('contact_id') contact_id: number,
    @Body() dto: UpdateContactDto,
  ) {
    return this.contactService.updateContactById(userId, contact_id, dto);
  }
}
