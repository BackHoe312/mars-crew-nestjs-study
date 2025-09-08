import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from '../dto/request/create-contact.dto';
import { UpdateContactDto } from '../dto/request/update-contact.dto';
import { In } from 'typeorm';
import { ContactRepository } from '../repository/contact.repository';
import { SearchContactDto } from '../dto/response/search-contact.dto';
import { DeleteContactDto } from '../dto/request/delete-contact.dto';
import { CommonResponse } from 'src/common/response/api.response';
import { Contact } from '../domain/contact.entity';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  /**
   * @description 연락처 저장
   */
  async createContact(userId: number, dto: CreateContactDto): Promise<number> {
    if (await this.contactRepository.existsBy({ userId, phone: dto.phone }))
      throw new ConflictException('이미 등록된 전화번호입니다.');

    const contactId = await this.contactRepository.createContact(userId, dto);

    return contactId;
  }

  /**
   * @description 연락처 다중 조회
   */
  async findAllByQuery(
    userId: number,
    dto: SearchContactDto,
  ): Promise<{ data: Contact[]; count: number }> {
    const [data, count] = await this.contactRepository.findAllByPaging(
      userId,
      dto,
    );

    return { data, count };
  }

  /**
   * @description 연락처 단일 조회
   */
  async findOneById(userId: number, contactId: number): Promise<any> {
    const data = await this.contactRepository.findOne({
      where: { userId, contactId },
    });

    if (!data) throw new NotFoundException('존재하지 않는 연락처입니다.');

    return data;
  }

  /**
   * @description 연락처 단일 삭제
   */
  async deleteContactById(userId: number, contactId: number): Promise<number> {
    const result = await this.contactRepository.softDelete({
      userId,
      contactId,
    });

    if (!result.affected)
      throw new NotFoundException('존재하지 않는 연락처입니다.');

    return result.affected;
  }

  /**
   * @description 연락처 다중 삭제
   */
  async deleteContactsByIds(
    userId: number,
    dto: DeleteContactDto,
  ): Promise<number> {
    const result = await this.contactRepository.softDelete({
      contactId: In(dto.ids),
      userId,
    });

    if (!result.affected)
      throw new NotFoundException('존재하지 않는 연락처입니다.');

    return result.affected;
  }

  /**
   * @description 연락처 수정
   */
  async updateContactById(
    userId: number,
    contactId: number,
    dto: UpdateContactDto,
  ): Promise<void> {
    const contact = await this.contactRepository.findOne({
      where: { userId, contactId },
    });
    if (!contact) throw new NotFoundException('존재하지 않는 전화번호입니다.');

    if (dto.updateName) contact.name = dto.updateName;
    if (dto.updatePhone) contact.phone = dto.updatePhone;

    try {
      await this.contactRepository.save(contact);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ConflictException(
          '이미 존재하는 전화번호로 수정할 수 없습니다.',
        );

      throw error;
    }
  }
}
