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
  Theme,
  Test,
} from '../models';
import {ThemeRepository} from '../repositories';

export class ThemeTestController {
  constructor(
    @repository(ThemeRepository) protected themeRepository: ThemeRepository,
  ) { }

  @get('/themes/{id}/tests', {
    responses: {
      '200': {
        description: 'Array of Theme has many Test',
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
    return this.themeRepository.tests(id).find(filter);
  }

  @post('/themes/{id}/tests', {
    responses: {
      '200': {
        description: 'Theme model instance',
        content: {'application/json': {schema: getModelSchemaRef(Test)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Theme.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Test, {
            title: 'NewTestInTheme',
            exclude: ['id'],
            optional: ['themeId']
          }),
        },
      },
    }) test: Omit<Test, 'id'>,
  ): Promise<Test> {
    return this.themeRepository.tests(id).create(test);
  }

  @patch('/themes/{id}/tests', {
    responses: {
      '200': {
        description: 'Theme.Test PATCH success count',
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
    return this.themeRepository.tests(id).patch(test, where);
  }

  @del('/themes/{id}/tests', {
    responses: {
      '200': {
        description: 'Theme.Test DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Test)) where?: Where<Test>,
  ): Promise<Count> {
    return this.themeRepository.tests(id).delete(where);
  }
}
