/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsEmail, Length, IsInt, IsDate, IsBoolean } from 'class-validator';
import { PrimaryGeneratedColumn, Column, BaseEntity, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Column()
  @Length(8)
  password: string;

  @Column({ nullable: true })
  @IsInt()
  @Length(10, 11)
  phone: number;

  @Column({ nullable: true })
  @IsDate()
  birthday: Date;

  // True is female and false is male
  @Column({ default: true })
  @IsBoolean()
  gender: boolean;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  banner: string;

  @Column('text', { nullable: true, array: true })
  fcm_tokens: string[];
}
