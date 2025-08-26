import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { comparePassword, generatePassword } from 'src/common/util/password';
import { Contact } from 'src/contact/domain/contact.entity';
import { BaseTimeEntity } from 'src/common/domain/BaseTime.Entity';

@Entity({ name: 'tb_users' })
@Unique(['email'])
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    comment: '사용자 이름',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '이메일',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '비밀번호',
  })
  password: string;

  @OneToMany(() => Contact, (contact) => contact.userId)
  contacts: Contact[];

  @BeforeInsert()
  public async hashPassword() {
    const hashPassword = await generatePassword(this.password);
    this.password = hashPassword;
  }

  public async validationPassword(password: string): Promise<void> {
    const isValid = await comparePassword(password, this.password);

    if (!isValid)
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      );
  }
}
