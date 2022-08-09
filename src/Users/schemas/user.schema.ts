import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@ObjectType({ description: 'user' })
export class User {
  @Field((type) => ID)
  id: number;

  @IsString()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;
}
