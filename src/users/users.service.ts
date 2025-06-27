import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSigninDto } from './dto/user-signin.dto';
import { Secret, sign } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
  ) { }

  async signup(userSignupDto: UserSignupDto) {
    const userExists = await this.FindUserByEmail(userSignupDto.email);
    if (userExists) throw new BadRequestException("Email is not available.");
    userSignupDto.password = await hash(userSignupDto.password, 10);
    let user = this.usersRepo.create(userSignupDto);
    user = await this.usersRepo.save(user);
    const { password, ...newUser } = user;
    return newUser;
  }

  async signin(userSigninDto: UserSigninDto) {
    const userExists = await this.usersRepo
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email = :email', { email: userSigninDto.email }).getOne();

    if (!userExists) throw new BadRequestException("Bad creadentials.");
    const matchPassword = await compare(userSigninDto.password, userExists.password);
    if (!matchPassword) throw new BadRequestException("Bad creadentials.");
    const { password, ...newUser } = userExists;

    return newUser;
  }


  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepo.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async FindUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.usersRepo.findOneBy({ email });
  }

  async accessToken(user: any): Promise<string> {
    const expireTime = process.env.ACCESS_TOKEN_EXPIRE_TIME;
    const token = sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY!,
      { expiresIn: expireTime as import("ms").StringValue }
    );
    return token;
  }
}
