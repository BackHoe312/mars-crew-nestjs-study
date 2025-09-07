import { BaseEntity, CreateDateColumn } from 'typeorm';

export abstract class BaseCreateTimeEntity extends BaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '생성일자',
  })
  createAt: Date;
}
