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
import {Theme} from '../models';
import {ThemeRepository} from '../repositories';

export class ThemeController {
  constructor(
    @repository(ThemeRepository)
    public themeRepository : ThemeRepository,
  ) {}

  @post('/themes')
  @response(200, {
    description: 'Theme model instance',
    content: {'application/json': {schema: getModelSchemaRef(Theme)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Theme, {
            title: 'NewTheme',
            exclude: ['id'],
          }),
        },
      },
    })
    theme: Omit<Theme, 'id'>,
  ): Promise<Theme> {
    return this.themeRepository.create(theme);
  }

  @get('/themes/count')
  @response(200, {
    description: 'Theme model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Theme) where?: Where<Theme>,
  ): Promise<Count> {
    return this.themeRepository.count(where);
  }

  @get('/themes')
  @response(200, {
    description: 'Array of Theme model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Theme, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Theme) filter?: Filter<Theme>,
  ): Promise<Theme[]> {
    return this.themeRepository.find(filter);
  }

  @patch('/themes')
  @response(200, {
    description: 'Theme PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Theme, {partial: true}),
        },
      },
    })
    theme: Theme,
    @param.where(Theme) where?: Where<Theme>,
  ): Promise<Count> {
    return this.themeRepository.updateAll(theme, where);
  }

  @get('/themes/{id}')
  @response(200, {
    description: 'Theme model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Theme, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Theme, {exclude: 'where'}) filter?: FilterExcludingWhere<Theme>
  ): Promise<Theme> {
    return this.themeRepository.findById(id, filter);
  }

  @patch('/themes/{id}')
  @response(204, {
    description: 'Theme PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Theme, {partial: true}),
        },
      },
    })
    theme: Theme,
  ): Promise<void> {
    await this.themeRepository.updateById(id, theme);
  }

  @put('/themes/{id}')
  @response(204, {
    description: 'Theme PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() theme: Theme,
  ): Promise<void> {
    await this.themeRepository.replaceById(id, theme);
  }

  @del('/themes/{id}')
  @response(204, {
    description: 'Theme DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.themeRepository.deleteById(id);
  }
}
