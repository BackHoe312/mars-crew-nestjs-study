import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from '../dto/request/create-contact.dto';
import { UpdateContactDto } from '../dto/request/update-contact.dto';
import { Contact } from '../domain/contact.entity';
import { In } from 'typeorm';
import { ContactRepository } from '../repository/contact.repository';
import { SearchContactDto } from '../dto/response/search-contact.dto';
import { DeleteContactDto } from '../dto/request/delete-contact.dto';
import { CommonResponse } from 'src/common/response/api.response';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  /**
   * @description 연락처 저장
   */
  async createContact(userId: number, dto: CreateContactDto): Promise<any> {
    if (await this.contactRepository.existsBy({ userId, phone: dto.phone }))
      throw new ConflictException('이미 등록된 전화번호입니다.');

    const contactId = await this.contactRepository.createContact(userId, dto);

    return CommonResponse.createResponse({
      data: {
        contactId: contactId,
      },
      statusCode: 201,
      message: '연락처가 등록되었습니다.',
    });
  }

  /**
   * @description 연락처 다중 조회
   */
  async findAllByQuery(userId: number, dto: SearchContactDto): Promise<any> {
    const [data, count] = await this.contactRepository.findAllByPaging(
      userId,
      dto,
    );

    return CommonResponse.createPaginationResponse({
      data,
      statusCode: 200,
      message: '조회되었습니다.',
      count,
      page: dto.page || 1,
      limit: dto.limit || 10,
    });
  }

  /**
   * @description 연락처 단일 조회
   */
  async findOneById(userId: number, contactId: number): Promise<any> {
    const data = await this.contactRepository.findOne({
      where: { userId, contactId },
    });

    if (!data) throw new NotFoundException('존재하지 않는 연락처입니다.');

    return CommonResponse.createResponse({
      data,
      statusCode: 200,
      message: '조회되었습니다.',
    });
  }

  /**
   * @description 연락처 단일 삭제
   */
  async deleteContactById(userId: number, contactId: number): Promise<any> {
    const result = await this.contactRepository.softDelete({
      userId,
      contactId,
    });

    if (result.affected === 0)
      throw new NotFoundException('존재하지 않는 연락처입니다.');

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '삭제되었습니다.',
      count: result.affected,
    });
  }

  /**
   * @description 연락처 다중 삭제
   */
  async deleteContactsByIds(
    userId: number,
    dto: DeleteContactDto,
  ): Promise<any> {
    const result = await this.contactRepository.softDelete({
      contactId: In(dto.ids),
      userId,
    });

    if (result.affected === 0)
      throw new NotFoundException(
        '존재하지 않거나 이미 삭제된 전화번호 입니다.',
      );

    return CommonResponse.createResponse({
      statusCode: 200,
      message: '삭제되었습니다.',
      count: result.affected,
    });
  }

  /**
   * @description 연락처 수정
   */
  async updateContactById(
    userId: number,
    contactId: number,
    dto: UpdateContactDto,
  ): Promise<any> {
    const contact = await this.contactRepository.findOne({
      where: { userId, contactId },
    });
    if (!contact) throw new NotFoundException('존재하지 않는 전화번호입니다.');

    if (dto.updateName) contact.name = dto.updateName;
    if (dto.updatePhone) contact.phone = dto.updatePhone;

    try {
      await this.contactRepository.save(contact);

      return CommonResponse.createResponse({
        statusCode: 200,
        message: '수정되었습니다.',
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ConflictException(
          '이미 존재하는 전화번호로 수정할 수 없습니다.',
        );

      throw error;
    }
  }
}
