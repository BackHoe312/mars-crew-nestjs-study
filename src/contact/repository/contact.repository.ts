import { Repository } from "typeorm";
import { Contact } from "../domain/contact.entity";
import { CustomRepository } from "src/common/typeorm-ex.decorator";
import { BadRequestException } from "@nestjs/common";

@CustomRepository(Contact)
export class ContactRepository extends Repository<Contact> { 
    async existsByPhone(phone: string): Promise<boolean> {
        return (await this.count({where: { phone: phone }}) > 0);
    }

    // async findAllByName(name: string): Promise<Contact[]> {
    //     const qb = this.createQueryBuilder('c');

    //     qb.andWhere('LOWER(c.name) LIKE LOWER(:name)', {name: `%${name}%`});

    //     return await qb.getMany();
    // }

    // async findAllByPhone(phone: string): Promise<Contact[]> {
    //     const qb = this.createQueryBuilder('c');

    //     qb.where('c.phone LIKE (:phone)', {phone: `%${phone}%`});

    //     return await qb.getMany();
    // }

    async findAllByQuery({
        name,
        phone,
    }: {
        name?: string;
        phone?: string;
    }): Promise<Contact[]> {
        const qb = this.createQueryBuilder('c');

        if (name)
            qb.andWhere('LOWER(c.name) LIKE LOWER(:name)', { name: `%${name}%`});
        if (phone)
            qb.andWhere('c.phone LIKE :phone', { phone: `%${phone}%`});
        
        return await qb.getMany();
    }

    async findOneByPhone(phone: string): Promise<Contact | null> {
        return this.findOne({where: { phone }});
    }

    async softDeleteByName(name: string): Promise<void> {
        await this.softDelete(name);
    }

    async softDeleteByPhone(phone: string): Promise<void> {
        await this.softDelete(phone);
    }

    async softDeleteByNames(names: string[]): Promise<void> {
        if (!names || names.length === 0)
            throw new BadRequestException('삭제할 이름 또는 전화번호를 제공해야 합니다.')

        await this.createQueryBuilder()
        .softDelete()
        .where('name IN (:...names)', {names})
        .execute();
    }
}