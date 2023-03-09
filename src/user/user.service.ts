import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Photo } from './entity/photo-entity';
import { Place } from './entity/place-entity';
import { User } from './entity/user-entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        @InjectRepository(Place)
        private readonly placeRepository: Repository<Place>,

        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>

      ) {}

    get(): Promise<User[]> {
        return this.usersRepository.find({relations:['places','photos']})
    }

    async create(createUserDto: CreateUserDto){

        const places = await Promise.all(
            createUserDto.places.map(place => this.preloadPlacebyPlace(place))
        )
        const photos = await Promise.all(
            createUserDto.photos.map(photo => this.userPhotoUpload(photo))
        )
        

        const user = await this.usersRepository.create({
            ...createUserDto,
            places,
            photos
        });
        return this.usersRepository.save(user); 
    }

    async update(updateUserDto: UpdateUserDto,  userId: number ){
        // return this.usersRepository.update(userId, updateUserDto)
        const places = updateUserDto.places && 
        (await Promise.all(
            updateUserDto.places.map(place => this.preloadPlacebyPlace(place))
        ))

        const user = await this.usersRepository.preload({
            id: +userId,
            ...updateUserDto,
            places
        });
        if(!user){
            throw new NotFoundException(`user #${userId} not found`)
        }
        return this.usersRepository.save(user); 
    }

    show(id: number ){
        return this.usersRepository.findOne({ where: { id }, relations:['places', 'photos']});
        // return this.usersRepository.findOne({ where: { id: userId}});
    }

    async findByEmail(email: string ): Promise<User| undefined>{
        return this.usersRepository.findOne({ where: { email }});
    }

    delete(userId: number){
        return this.usersRepository.delete(userId);
    }

    private async userPhotoUpload(url: string): Promise<Photo> {
        
       
       
        return this.photoRepository.save({ url });

    }

    private async preloadPlacebyPlace(place: string): Promise<Place> {
        // console.log('test 1:' + name);
        
        const existingFlavor =  await this.placeRepository.findOne({where: {place}})
        // console.log('test :'+ existingFlavor);

        if(existingFlavor){
            return existingFlavor;
        }
        return this.placeRepository.create({ place })
    }
}
 