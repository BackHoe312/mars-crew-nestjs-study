import { IsNull, Not, Repository } from "typeorm";
import { Contact } from "../domain/contact.entity";
import { CustomRepository } from "src/common/typeorm-ex.decorator";
import { BadRequestException, ConflictException } from "@nestjs/common";
import { UpdateContactDto } from "../dto/request/update-contact.dto";
import { CreateContactDto } from "../dto/request/create-contact.dto";
import { SearchContactDto } from "../dto/response/search-contact.dto";

@CustomRepository(Contact)
export class ContactRepository extends Repository<Contact> {
    async createContact(dto: CreateContactDto): Promise<Contact> {
        const entity = this.create(dto);
        return await this.save(entity);
    }

    /**
     * 삭제 유무 확인
     * @param phone 전화번호
     * @returns 
     */
    async isDeletedContact(id: number): Promise<boolean> {
        const isDeleted = await this.findOne({where: { id, deleteAt: Not(IsNull()) }});

        return !!isDeleted;
    }

    async findIdByName(name: string): Promise<number | null> {
        const contact = await this.findOne({
            where: {name},
            select: ['id']
        });
        

        return contact ? contact.id : null;
    }

    async findIdByPhone(phone: string): Promise<number | null> {
        const contact = await this.findOne({
            where: {phone},
            select: ['id']
        });

        return contact ? contact.id : null;
    }

    /**
     * 이름 또는 전화번호를 이용한 조회
     * @param param0 name, phone
     * @returns 
     */
    async findAllByPaging(query: SearchContactDto): Promise<[Contact[], number]> {
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
        
        return await qb.getManyAndCount();
    }

    async findOneByPhone(phone: string): Promise<Contact | null> {
        return this.findOne({where: { phone }});
    }

    /**
     * 단일 전화번호 소프트 삭제
     * @param id id
     */
    async softDeleteContact(id: number) {
        return await this.softDelete(id);
    }

    /**
     * 전화번호 다중 소프트 삭제
     * @param ids id
     */
    async softDeleteContacts(ids: number[]) {
        return (await this.createQueryBuilder()
            .softDelete()
            .where('id IN (:...ids)', {ids})
            .execute());
    }

    async updatePhone(id: number, dto: UpdateContactDto): Promise<boolean> {
        const result = await this.createQueryBuilder()
            .update(Contact)
            .set({phone: dto.updatePhone})
            .where('id = :id AND deleteAt is NULL', {id})
            .execute();

        return result.affected !== 0;
    }
}