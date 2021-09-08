import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Test,
  User,
} from '../models';
import {TestRepository} from '../repositories';

export class TestUserController {
  constructor(
    @repository(TestRepository)
    public testRepository: TestRepository,
  ) { }

  @get('/tests/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Test',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Test.prototype.id,
  ): Promise<User> {
    return this.testRepository.candidate(id);
  }
}
