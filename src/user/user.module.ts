import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entity/photo-entity';
import { Place } from './entity/place-entity';
import { User } from './entity/user-entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[TypeOrmModule.forFeature([User, Place, Photo])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
