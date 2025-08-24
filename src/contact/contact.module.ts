import { Module } from '@nestjs/common';
import { ContactService } from './service/contact.service';
import { ContactController } from './controller/contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './domain/contact.entity';
import { ContactRepository } from './repository/contact.repository';
import { TypeOrmExModule } from 'src/common/repository/typeorm-ex.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
    TypeOrmExModule.forCustomRepository([ContactRepository]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [TypeOrmModule],
})
export class ContactModule {}
