import { BaseEntity, CreateDateColumn } from 'typeorm';

export abstract class BaseTimeEntity extends BaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '생성일자',
  })
  createAt: Date;
}
