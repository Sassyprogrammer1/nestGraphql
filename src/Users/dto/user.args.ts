import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class UserArgs {
  @IsOptional()
  @Field(() => [Number], { nullable: true })
  ids?: number[];

  @IsOptional()
  @Field(() => [String], { nullable: true })
  names?: string[];

  @IsOptional()
  @Field(() => [String], { nullable: true })
  emails?: string[];
}
