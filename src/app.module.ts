import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entity/user-entity';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { Place } from './user/entity/place-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user1',
      password: 'changeme',
      database: 'MyApp',
      entities: [User,Place],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
