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
Category,
CategoryHasQuestion,
SimpleQuestion,
} from '../models';
import {CategoryHasQuestionRepository} from '../repositories';
import {CategoryRepository} from '../repositories/category.repository';

export class CategorySimpleQuestionController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/simple-questions', {
    responses: {
      '200': {
        description: 'Array of Category has many SimpleQuestion through CategoryHasQuestion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SimpleQuestion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SimpleQuestion>,
  ): Promise<SimpleQuestion[]> {
    return this.categoryRepository.simpleQuestions(id).find(filter);
  }

  @post('/categories/{id}/simple-questions', {
    responses: {
      '200': {
        description: 'create a SimpleQuestion model instance',
        content: {'application/json': {schema: getModelSchemaRef(SimpleQuestion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SimpleQuestion, {
            title: 'NewSimpleQuestionInCategory',
            exclude: ['id'],
          }),
        },
      },
    }) simpleQuestion: Omit<SimpleQuestion, 'id'>,
  ): Promise<SimpleQuestion> {
    return this.categoryRepository.simpleQuestions(id).create(simpleQuestion);
  }

  @patch('/categories/{id}/simple-questions', {
    responses: {
      '200': {
        description: 'Category.SimpleQuestion PATCH success count',
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
    return this.categoryRepository.simpleQuestions(id).patch(simpleQuestion, where);
  }

  @del('/categories/{id}/simple-questions', {
    responses: {
      '200': {
        description: 'Category.SimpleQuestion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SimpleQuestion)) where?: Where<SimpleQuestion>,
  ): Promise<Count> {
    return this.categoryRepository.simpleQuestions(id).delete(where);
  }
}
