import {authenticate} from '@loopback/authentication';
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
Test,
TestHasQuestion,
SimpleQuestion,
} from '../models';
import {TestRepository} from '../repositories';
@authenticate('jwt')
export class TestSimpleQuestionController {
  constructor(
    @repository(TestRepository) protected testRepository: TestRepository,
  ) { }

  @get('/tests/{id}/simple-questions', {
    responses: {
      '200': {
        description: 'Array of Test has many SimpleQuestion through TestHasQuestion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SimpleQuestion,{includeRelations: true}),},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SimpleQuestion>,
  ): Promise<SimpleQuestion[]> {
    return this.testRepository.simpleQuestions(id).find();
  }

  @post('/tests/{id}/simple-questions', {
    responses: {
      '200': {
        description: 'create a SimpleQuestion model instance',
        content: {'application/json': {schema: getModelSchemaRef(SimpleQuestion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Test.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SimpleQuestion, {
            title: 'NewSimpleQuestionInTest',
            exclude: ['id'],
          }),
        },
      },
    }) simpleQuestion: Omit<SimpleQuestion, 'id'>,
  ): Promise<SimpleQuestion> {
    return this.testRepository.simpleQuestions(id).create(simpleQuestion);
  }

  @patch('/tests/{id}/simple-questions', {
    responses: {
      '200': {
        description: 'Test.SimpleQuestion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SimpleQuestion, {partial: true}),
        },
      },
    })
    simpleQuestion: Partial<SimpleQuestion>,
    @param.query.object('where', getWhereSchemaFor(SimpleQuestion)) where?: Where<SimpleQuestion>,
  ): Promise<Count> {
    return this.testRepository.simpleQuestions(id).patch(simpleQuestion, where);
  }

  @del('/tests/{id}/simple-questions', {
    responses: {
      '200': {
        description: 'Test.SimpleQuestion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SimpleQuestion)) where?: Where<SimpleQuestion>,
  ): Promise<Count> {
    return this.testRepository.simpleQuestions(id).delete(where);
  }
}
