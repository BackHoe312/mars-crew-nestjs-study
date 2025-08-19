import { In, IsNull, Not, Repository } from "typeorm";
import { Contact } from "../domain/contact.entity";
import { CustomRepository } from "src/common/typeorm-ex.decorator";
import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";
import { UpdateContactDto } from "../dto/request/update-contact.dto";
import { CreateContactDto } from "../dto/request/create-contact.dto";
import { SearchContactDto } from "../dto/response/search-contact.dto";

@CustomRepository(Contact)
export class ContactRepository extends Repository<Contact> {
    async createContact(dto: CreateContactDto): Promise<Contact> {
        const entity = this.create(dto);
        return this.save(entity);
    }

    /**
     * 이름 또는 전화번호를 이용한 조회
     * @param param0 name, phone
     * @returns 
     */
    async findAllByPaging(query: SearchContactDto): Promise<[Contact[], number, number]> {
        const { name, phone, page = 1, limit = 10 } = query;

        const qb = this.createQueryBuilder('c');

        if (name)
            qb.andWhere('LOWER(c.name) LIKE LOWER(:name)', { name: `%${name}%`});
        if (phone)
            qb.andWhere('c.phone LIKE :phone', { phone: `%${phone}%`});

        qb.skip((page - 1) * limit)
            .take(limit)
            .orderBy('c.id', 'ASC');

        const [data, total] = await qb.getManyAndCount();
        const totalPages = Math.ceil(total / limit);
        
        return [data, total, totalPages];
    }
}