import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: 'tb_contacts'})
// @Unique(['phone'])
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 64,
        nullable: false,
        comment: '이름'
    })
    name: string;
    
    @Column({
        type: 'varchar',
        length: 32,
        nullable: false,
        comment: '전화번호'
    })
    phone: string;

    @CreateDateColumn({
        type: 'datetime',
        nullable: false
    })
    createAt: Date;

    @DeleteDateColumn({
        type: 'datetime',
        nullable: true
    })
    deleteAt: Date | null;
}
