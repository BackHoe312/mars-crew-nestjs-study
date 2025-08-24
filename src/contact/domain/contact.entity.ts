import { User } from 'src/user/domain/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_contacts' })
@Unique('uq_phone', ['phone', 'not_archived'])
export class Contact {
  @PrimaryGeneratedColumn({ name: 'id' })
  contact_id: number;

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

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  updateAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deleteAt: Date;

  @Column({
    type: 'boolean',
    generatedType: 'VIRTUAL',
    asExpression: 'IF(deleteAt IS NULL, 1, NULL)',
    nullable: true,
  })
  not_archived: string;
}
