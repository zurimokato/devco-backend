import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Test, Theme} from '../models';
import {TestRepository} from '../repositories';

@authenticate('jwt')
export class TestController {
  constructor(
    @repository(TestRepository)
    public testRepository : TestRepository,
  ) {}

  @post('/tests')
  @response(200, {
    description: 'Test model instance',
    content: {'application/json': {schema: getModelSchemaRef(Test)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Test, {
            title: 'NewTest',
            exclude: ['id'],
          }),
        },
      },
    })
    test: Omit<Test, 'id'>,
  ): Promise<Test> {
    return this.testRepository.create(test);
  }

  @get('/tests/count')
  @response(200, {
    description: 'Test model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Test) where?: Where<Test>,
  ): Promise<Count> {
    return this.testRepository.count(where);
  }
  // te traes lso tests que has creado junto con sus relaciones
  @get('/tests')
  @response(200, {
    description: 'Array of Test model instances with relations Category and Quesntions',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Test, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Test) filter?: Filter<Test>,
  ): Promise<Test[]> {
    return this.testRepository.find({include:['theme','simpleQuestions']});
  }

  @patch('/tests')
  @response(200, {
    description: 'Test PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Test, {partial: true}),
        },
      },
    })
    test: Test,
    @param.where(Test) where?: Where<Test>,
  ): Promise<Count> {
    return this.testRepository.updateAll(test, where);
  }

  @get('/tests/{id}')
  @response(200, {
    description: 'Test model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Test, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Test, {exclude: 'where'}) filter?: FilterExcludingWhere<Test>
  ): Promise<Test> {
    return this.testRepository.findById(id, filter);
  }

  @patch('/tests/{id}')
  @response(204, {
    description: 'Test PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Test, {partial: true}),
        },
      },
    })
    test: Test,
  ): Promise<void> {
    await this.testRepository.updateById(id, test);
  }

  @put('/tests/{id}')
  @response(204, {
    description: 'Test PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() test: Test,
  ): Promise<void> {
    await this.testRepository.replaceById(id, test);
  }

  @del('/tests/{id}')
  @response(204, {
    description: 'Test DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.testRepository.deleteById(id);
  }
}
