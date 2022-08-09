import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { GraphQLJSON } from 'graphql-type-json';
import { NewUserInput } from './dto/create-user.input';
import { UserArgs } from './dto/user.args';

@Injectable()
export class UserService {
  async create(data: NewUserInput): Promise<{ name: string; email: string }> {
    console.log('Display the user input', data);
    return { name: data.name, email: data.email };
  }

  async findAll(userArgs: UserArgs): Promise<typeof GraphQLJSON> {
    // baseUrl to use
    const baseUrl = 'https://jsonplaceholder.typicode.com/users';
    // parse data from the args
    const id = userArgs.ids;
    const name = userArgs.names;
    const email = userArgs.emails;
    // here we only add the input send by the user to the query
    const inputArgs =
      id != undefined ? { id } : name != undefined ? { name } : { email };
    // we need to make a query string to query the required data
    const queryString =
      `${baseUrl}?` +
      Object.entries(inputArgs)
        .map(([k, v]) => v.map((e, i) => `${k}[${i}]=${e}`).join('&'))
        .join('&');
    // call the external api through axios
    const result = await axios.get(`${queryString}`);
    // throw exception if nothing is returned
    if (!result) throw new InternalServerErrorException('error from axios');
    return result.data;
  }
}
