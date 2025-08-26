import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseTimeEntity extends BaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '생성일자'
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    comment: '수정일자'
  })
  updateAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    comment: '삭제일자'
  })
  deleteAt: Date;
}
