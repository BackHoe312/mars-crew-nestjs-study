import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { ContactService } from '../service/contact.service';
import { CreateContactDto } from '../dto/request/create-contact.dto';
import { UpdateContactDto } from '../dto/request/update-contact.dto';
import { SearchContactDto } from '../dto/response/search-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // 전화번호 생성
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  // 전화번호 조회
  @Get('/search')
  async search(@Query() query: SearchContactDto) {
    return this.contactService.findAllByQuery(query);
  }

  // 단일 검색
  @Get('/search/:phone')
  async findByPhone(@Param('phone') phone: string) {
    return this.contactService.findOneByPhone(phone);
  }

  // 단일 삭제
  @Delete('/:phone')
  async deleteByPhone(@Param('phone') phone: string) {
    return await this.contactService.deleteByPhone(phone);
  }

  // 다중 삭제
  @Delete('/')
  async deleteByPhones(@Body('phones') phones: string[]) {
    return await this.contactService.deleteByPhones(phones);
  }

  // 수정
  @Patch(':phone')
  async update(
    @Param('phone') phone: string,
    @Body() dto: UpdateContactDto
  ) {
    await this.contactService.updateByPhone(phone, dto);
  }
}
