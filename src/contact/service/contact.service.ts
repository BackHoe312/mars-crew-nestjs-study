import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateContactDto } from '../dto/request/create-contact.dto';
import { UpdateContactDto } from '../dto/request/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../domain/contact.entity';
import { Repository } from 'typeorm';
import { ContactRepository } from '../repository/contact.repository';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async create(dto: CreateContactDto): Promise<Contact> {
    if (await this.contactRepository.existsByPhone(dto.phone))
      throw new ConflictException('이미 등록된 전화번호입니다.');
    
    const entity = this.contactRepository.create(dto);
    return await this.contactRepository.save(entity);
  }

  // async findAll() {
  //   return await this.contactRepository.find({ order: { id: 'ASC'} });
  // }

  // async findAllByName(name: string) {
  //   return this.contactRepository.findAllByName(name);
  // }

  // async findAllByPhone(phone: string) {
  //   return this.contactRepository.findAllByPhone(phone);
  // }
  async findAllByQuery(query: {
    name?: string;
    phone?: string;
  }) {
    return this.contactRepository.findAllByQuery(query);
  }

  async findOneByPhone(phone: string) {
    return this.contactRepository.findOneByPhone(phone);
  }

  async deleteByPhone(phone: string) {
    return this.contactRepository.softDeleteByPhone(phone);
  }

  async deleteByPhones(phones: string[]) {
    if (!phones || phones.length == 0)
      throw new BadRequestException('삭제할 이름 또는 전화번호를 제공해야 합니다.')

    return this.contactRepository.softDeleteByPhones(phones);
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
