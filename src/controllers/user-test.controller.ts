import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Test,
} from '../models';
import {UserRepository} from '../repositories';

export class UserTestController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/tests', {
    responses: {
      '200': {
        description: 'Array of User has many Test',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Test)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Test>,
  ): Promise<Test[]> {
    return this.userRepository.tests(id).find(filter);
  }

  @post('/users/{id}/tests', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Test)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Test, {
            title: 'NewTestInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) test: Omit<Test, 'id'>,
  ): Promise<Test> {
    return this.userRepository.tests(id).create(test);
  }

  @patch('/users/{id}/tests', {
    responses: {
      '200': {
        description: 'User.Test PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Test, {partial: true}),
        },
      },
    })
    test: Partial<Test>,
    @param.query.object('where', getWhereSchemaFor(Test)) where?: Where<Test>,
  ): Promise<Count> {
    return this.userRepository.tests(id).patch(test, where);
  }

  @del('/users/{id}/tests', {
    responses: {
      '200': {
        description: 'User.Test DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Test)) where?: Where<Test>,
  ): Promise<Count> {
    return this.userRepository.tests(id).delete(where);
  }
}
