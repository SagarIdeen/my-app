import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user-entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

    get(): Promise<User[]> {
        return this.usersRepository.find()
    }

    async create(createUserDto: CreateUserDto){
        return await this.usersRepository.save(createUserDto);
    }

    update(updateUserDto: UpdateUserDto,  userId: number ){
        return this.usersRepository.update(userId, updateUserDto)
    }

    show(id: number ){
        return this.usersRepository.findOne({ where: { id }});
        // return this.usersRepository.findOne({ where: { id: userId}});
    }

    async findByEmail(email: string ): Promise<User| undefined>{
        return this.usersRepository.findOne({ where: { email }});
    }

    delete(userId: number){
        return this.usersRepository.delete(userId);
    }
}
 