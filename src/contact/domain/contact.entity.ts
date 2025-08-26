import { BaseTimeEntity } from 'src/common/domain/BaseTime.Entity';
import { User } from 'src/user/domain/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'tb_contacts' })
@Unique('uq_phone', ['phone', 'not_archived', 'userId'])
export class Contact extends BaseTimeEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  contactId: number;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    comment: '이름',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
    comment: '전화번호',
  })
  phone: string;

  @ManyToOne(() => User, (user) => user.contacts, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @Column({
    type: 'boolean',
    generatedType: 'VIRTUAL',
    asExpression: 'IF(deleteAt IS NULL, 1, NULL)',
    nullable: true,
  })
  not_archived: string;
}
