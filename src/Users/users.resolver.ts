import { InternalServerErrorException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { NewUserInput } from './dto/create-user.input';
import { UserArgs } from './dto/user.args';
import { User } from './schemas/user.schema';
import { UserService } from './users.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => GraphQLJSON)
  async findUsers(@Args() userArgs?: UserArgs): Promise<typeof GraphQLJSON> {
    try {
      return await this.userService.findAll(userArgs);
    } catch (err) {
      if (err instanceof InternalServerErrorException)
        throw new InternalServerErrorException(err.message);
    }
  }

  @Mutation((returns) => User)
  async createUser(@Args('newUserData') newUserData: NewUserInput) {
    try {
      return await this.userService.create(newUserData);
    } catch (err) {
      console.log(err);
    }
  }
}
