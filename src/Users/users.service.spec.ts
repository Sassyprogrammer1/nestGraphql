import { Test, TestingModule } from '@nestjs/testing';
import { mockData } from './mock';
import { UserService } from './users.service';

type userInput = { name: string; email: string };
interface mockInp {
  ids: number[];
  names: string[];
  emails: string[];
  correctUserInput: userInput;
  incorrectUserInput: userInput;
}
describe('UsersService', () => {
  let usersService: UserService;
  const mockInputs: mockInp = {
    ids: [1, 2, 3, 4, 5],
    names: [
      'Ervin Howell',
      'Leanne Graham',
      'Clementine Bauch',
      'Patricia Lebsack',
      'Chelsey Dietrich',
    ],
    emails: [
      'Sincere@april.biz',
      'Shanna@melissa.tv',
      'Nathan@yesenia.net',
      'Julianne.OConner@kory.org',
      'Lucio_Hettinger@annie.ca',
    ],
    correctUserInput: {
      name: 'Nicholas Runolfsdottir V',
      email: 'Sherwood@rosamond.me',
    },
    incorrectUserInput: {
      name: 'Nicholas Runolfsdottir V',
      email: 'Sherwood@rosamond.me',
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();
    usersService = module.get<UserService>(UserService);
  });
  // check service is defined
  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('check findall => () method returns correct records for search query param ids[]', () => {
    it('should return records with respect to ids sent in the query', async () => {
      const result = await usersService.findAll({ ids: mockInputs.ids });
      expect(result).toHaveLength(5);
      expect(result).toMatchObject(mockData);
    });
  });

  describe('check findall => () method returns correct records for search query param names[]', () => {
    it('should return records with respect to names sent in the query', async () => {
      const result = await usersService.findAll({ names: mockInputs.names });
      expect(result).toHaveLength(5);
      expect(result).toMatchObject(mockData);
    });
  });

  describe('check findall => () method returns correct records for search query param emails[]', () => {
    it('should return records with respect to emails sent in the query', async () => {
      const result = await usersService.findAll({ emails: mockInputs.emails });
      expect(result).toHaveLength(5);
      expect(result).toMatchObject(mockData);
    });
  });

  describe('check create => () method returns correct records when user calls it', () => {
    it('should return user input with respect to user input sent in the mutation', async () => {
      const userInput = mockInputs.correctUserInput;
      const result = await usersService.create({
        name: userInput.name,
        email: userInput.email,
      });
      expect(result).toMatchObject(userInput);
    });
  });
});
