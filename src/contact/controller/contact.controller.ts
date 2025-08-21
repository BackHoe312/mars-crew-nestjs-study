import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ContactService } from '../service/contact.service';
import { CreateContactDto } from '../dto/request/create-contact.dto';
import { UpdateContactDto } from '../dto/request/update-contact.dto';
import { SearchContactDto } from '../dto/response/search-contact.dto';
import { DeleteContactDto } from '../dto/request/delete-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // 전화번호 생성
  @Post()
  async createContact(@Body() createContactDto: CreateContactDto) {
    return this.contactService.createContact(createContactDto);
  }

  // 전화번호 조회
  @Get('/search')
  async search(@Query() query: SearchContactDto) {
    return this.contactService.findAllByQuery(query);
  }

  // 단일 검색
  @Get('/search/:contact_id')
  async findByPhone(@Param('contact_id') contact_id: number) {
    return this.contactService.findOneById(contact_id);
  }

  // 단일 삭제
  @Delete('/:contact_id')
  async deleteContactByPhone(@Param('contact_id') contact_id: number) {
    return this.contactService.deleteContactById(contact_id);
  }

  // 다중 삭제
  @Delete('/')
  async deleteContactsByIds(@Body() dto: DeleteContactDto) {
    return this.contactService.deleteContactsByIds(dto);
  }

  // 수정
  @Patch(':contact_id')
  async update(
    @Param('contact_id') contact_id: number,
    @Body() dto: UpdateContactDto,
  ) {
    return this.contactService.updateContactById(contact_id, dto);
  }
}
