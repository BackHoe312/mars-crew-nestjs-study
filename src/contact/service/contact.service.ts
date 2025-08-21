import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from '../dto/request/create-contact.dto';
import { UpdateContactDto } from '../dto/request/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../domain/contact.entity';
import { In, Repository } from 'typeorm';
import { ContactRepository } from '../repository/contact.repository';
import { SearchContactDto } from '../dto/response/search-contact.dto';
import { DeleteContactDto } from '../dto/request/delete-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async createContact(dto: CreateContactDto): Promise<Contact> {
    if (await this.contactRepository.existsBy({ phone: dto.phone }))
      throw new ConflictException('이미 등록된 전화번호입니다.');

    return this.contactRepository.createContact(dto);
  }

  async findAllByQuery(query: SearchContactDto) {
    const [data, total] = await this.contactRepository.findAllByPaging(query);

    return {
      data,
      total,
      page: query.page || 1,
      limit: query.limit || 10,
      totalPages: Math.ceil(total / (query.limit || 10)),
    };
  }

  async findOneById(contact_id: number) {
    const contact = await this.contactRepository.findOneBy({ contact_id });

    if (!contact) throw new NotFoundException('존재하지 않는 연락처입니다.');

    return contact;
  }

  async deleteContactById(contact_id: number) {
    const result = await this.contactRepository.softDelete(contact_id);

    if (result.affected === 0)
      throw new NotFoundException('존재하지 않는 연락처입니다.');

    return { deletedCount: result.affected };
  }

  async deleteContactsByIds(dto: DeleteContactDto) {
    const result = await this.contactRepository.softDelete({
      contact_id: In(dto.ids),
    });

    if (result.affected === 0)
      throw new NotFoundException(
        '존재하지 않거나 이미 삭제된 전화번호 입니다.',
      );

    return { deletedCount: result.affected };
  }

  async updateContactById(contact_id: number, dto: UpdateContactDto) {
    const contact = await this.contactRepository.findOneBy({ contact_id });
    if (!contact) throw new NotFoundException('존재하지 않는 전화번호입니다.');

    if (dto.updateName) contact.name = dto.updateName;
    if (dto.updatePhone) contact.phone = dto.updatePhone;

    try {
      return await this.contactRepository.save(contact);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ConflictException(
          '이미 존재하는 전화번호로 수정할 수 없습니다.',
        );

      throw error;
    }
  }
}
