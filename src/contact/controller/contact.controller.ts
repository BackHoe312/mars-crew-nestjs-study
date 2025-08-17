import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { ContactService } from '../service/contact.service';
import { CreateContactDto } from '../dto/request/create-contact.dto';
import { UpdateContactDto } from '../dto/request/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get('/search')
  async search(
    @Query('name') name?: string,
    @Query('phone') phone?: string
  ) {
    return this.contactService.findAllByQuery({name, phone});
  }

  @Get('/search/:phone')
  async findByPhone(@Param('phone') phone: string) {
    return this.contactService.findOneByPhone(phone);
  }

  @Delete('/:phone')
  async deleteByPhone(@Param('phone') phone: string) {
    return await this.contactService.deleteByPhone(phone);
  }

  @Delete('/')
  async deleteByPhones(@Body('phones') phones: string[]) {
    return await this.contactService.deleteByPhones(phones);
  }

  @Patch(':phone')
  async update(
    @Param('phone') phone: string,
    @Body() dto: UpdateContactDto
  ) {
    await this.contactService.updateByPhone(phone, dto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
  //   return this.contactService.update(+id, updateContactDto);
  // }
}
