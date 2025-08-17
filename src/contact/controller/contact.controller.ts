import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { ContactService } from '../service/contact.service';
import { CreateContactDto } from '../dto/request/create-contact.dto';
import { UpdateContactDto } from '../dto/request/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    console.log(createContactDto);
    return this.contactService.create(createContactDto);
  }

  // @Get('/search')
  // findAll() {
  //   return this.contactService.findAll();
  // }

  @Get('/search')
  async search(
    @Query('name') name?: string,
    @Query('phone') phone?: string
  ) {

    return this.contactService.findAllByQuery({name, phone});

    throw new BadRequestException('이름 또는 전화번호를 제공해야 합니다.')
  }

  @Get('/search/:phone')
  async findByPhone(@Param('phone') phone: string) {
    return this.contactService.findOneByPhone(phone);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
