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
SimpleQuestion,
QuestionHasAnwer,
Anwser,
} from '../models';
import {SimpleQuestionRepository} from '../repositories';

export class SimpleQuestionAnwserController {
  constructor(
    @repository(SimpleQuestionRepository) protected simpleQuestionRepository: SimpleQuestionRepository,
  ) { }

  @get('/simple-questions/{id}/anwsers', {
    responses: {
      '200': {
        description: 'Array of SimpleQuestion has many Anwser through QuestionHasAnwer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Anwser)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Anwser>,
  ): Promise<Anwser[]> {
    return this.simpleQuestionRepository.anwsers(id).find(filter);
  }

  @post('/simple-questions/{id}/anwsers', {
    responses: {
      '200': {
        description: 'create a Anwser model instance',
        content: {'application/json': {schema: getModelSchemaRef(Anwser)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SimpleQuestion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Anwser, {
            title: 'NewAnwserInSimpleQuestion',
            exclude: ['id'],
          }),
        },
      },
    }) anwser: Omit<Anwser, 'id'>,
  ): Promise<Anwser> {
    return this.simpleQuestionRepository.anwsers(id).create(anwser);
  }

  @patch('/simple-questions/{id}/anwsers', {
    responses: {
      '200': {
        description: 'SimpleQuestion.Anwser PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Anwser, {partial: true}),
        },
      },
    })
    anwser: Partial<Anwser>,
    @param.query.object('where', getWhereSchemaFor(Anwser)) where?: Where<Anwser>,
  ): Promise<Count> {
    return this.simpleQuestionRepository.anwsers(id).patch(anwser, where);
  }

  @del('/simple-questions/{id}/anwsers', {
    responses: {
      '200': {
        description: 'SimpleQuestion.Anwser DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Anwser)) where?: Where<Anwser>,
  ): Promise<Count> {
    return this.simpleQuestionRepository.anwsers(id).delete(where);
  }
}
