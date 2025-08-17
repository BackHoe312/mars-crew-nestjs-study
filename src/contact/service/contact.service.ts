import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    if (await this.contactRepository.existsBy({phone: dto.phone}))
      throw new ConflictException('이미 등록된 전화번호입니다.');
    
    return await this.contactRepository.createContact(dto);
  }

  async findAllByQuery(query: {name?: string; phone?: string}) {
    const {name, phone} = query;
    if (!name && !phone)
      throw new BadRequestException('이름 또는 전화번호를 제공해야 합니다.')

    return this.contactRepository.findAllByQuery(query);
  }

  async findOneByPhone(phone: string) {
    return this.contactRepository.findOneByPhone(phone);
  }

  async deleteByPhone(phone: string) {
    const id = await this.contactRepository.findIdByPhone(phone);

    if (!id)
      throw new NotFoundException("존재하지 않는 전화번호입니다.");

    const result = await this.contactRepository.softDeleteContact(id);

    if (result.affected === 0)
      throw new NotFoundException("존재하지 않거나 이미 삭제된 전화번호입니다.");

  }

  async deleteByPhones(phones: string[]) {
    let ids: number[] = [];

    if (!phones || phones.length == 0)
      throw new BadRequestException('삭제할 이름 또는 전화번호를 제공해야 합니다.')

    for (const phone of phones) {
      const id = await this.contactRepository.findIdByPhone(phone);
      if (id !== null)
        ids.push(id);
    }

    const result = await this.contactRepository.softDeleteContacts(ids);
    if (result.affected === 0)
      throw new NotFoundException("존재하지 않거나 이미 삭제된 전화번호 입니다.")
  }

  async updateByPhone(phone: string, dto: UpdateContactDto) {
    const id = await this.contactRepository.findIdByPhone(phone);

    if (!id || await this.contactRepository.isDeletedContact(id))
      throw new NotFoundException("존재하지 않는 전화번호입니다.");

    if (await this.contactRepository.existsBy({phone: dto.updatePhone})) {
      throw new BadRequestException("이미 존재하는 전화번호로 수정할 수 없습니다.");
    }

    await this.contactRepository.updatePhone(id, dto);
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
}
