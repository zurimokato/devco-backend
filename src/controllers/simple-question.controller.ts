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
import {SimpleQuestion} from '../models';
import {SimpleQuestionRepository} from '../repositories';
@authenticate('jwt')
export class SimpleQuestionController {
  constructor(
    @repository(SimpleQuestionRepository)
    public simpleQuestionRepository : SimpleQuestionRepository,
  ) {}

  @post('/simple-questions')
  @response(200, {
    description: 'SimpleQuestion model instance',
    content: {'application/json': {schema: getModelSchemaRef(SimpleQuestion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SimpleQuestion, {
            title: 'NewSimpleQuestion',
            exclude: ['y'],
          }),
        },
      },
    })
    simpleQuestion: Omit<SimpleQuestion, 'y'>,
  ): Promise<SimpleQuestion> {
    return this.simpleQuestionRepository.create(simpleQuestion);
  }

  @get('/simple-questions/count')
  @response(200, {
    description: 'SimpleQuestion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SimpleQuestion) where?: Where<SimpleQuestion>,
  ): Promise<Count> {
    return this.simpleQuestionRepository.count(where);
  }

  @get('/simple-questions')
  @response(200, {
    description: 'Array of SimpleQuestion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SimpleQuestion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SimpleQuestion) filter?: Filter<SimpleQuestion>,
  ): Promise<SimpleQuestion[]> {
    return this.simpleQuestionRepository.find(filter);
  }

  @patch('/simple-questions')
  @response(200, {
    description: 'SimpleQuestion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SimpleQuestion, {partial: true}),
        },
      },
    })
    simpleQuestion: SimpleQuestion,
    @param.where(SimpleQuestion) where?: Where<SimpleQuestion>,
  ): Promise<Count> {
    return this.simpleQuestionRepository.updateAll(simpleQuestion, where);
  }

  @get('/simple-questions/{id}')
  @response(200, {
    description: 'SimpleQuestion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SimpleQuestion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SimpleQuestion, {exclude: 'where'}) filter?: FilterExcludingWhere<SimpleQuestion>
  ): Promise<SimpleQuestion> {
    return this.simpleQuestionRepository.findById(id, filter);
  }

  @patch('/simple-questions/{id}')
  @response(204, {
    description: 'SimpleQuestion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SimpleQuestion, {partial: true}),
        },
      },
    })
    simpleQuestion: SimpleQuestion,
  ): Promise<void> {
    await this.simpleQuestionRepository.updateById(id, simpleQuestion);
  }

  @put('/simple-questions/{id}')
  @response(204, {
    description: 'SimpleQuestion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() simpleQuestion: SimpleQuestion,
  ): Promise<void> {
    await this.simpleQuestionRepository.replaceById(id, simpleQuestion);
  }

  @del('/simple-questions/{id}')
  @response(204, {
    description: 'SimpleQuestion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.simpleQuestionRepository.deleteById(id);
  }
}
