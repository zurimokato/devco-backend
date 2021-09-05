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
import {Anwser} from '../models';
import {AnwserRepository} from '../repositories';

export class AnwserController {
  constructor(
    @repository(AnwserRepository)
    public anwserRepository : AnwserRepository,
  ) {}

  @post('/anwsers')
  @response(200, {
    description: 'Anwser model instance',
    content: {'application/json': {schema: getModelSchemaRef(Anwser)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Anwser, {
            title: 'NewAnwser',
            exclude: ['id'],
          }),
        },
      },
    })
    anwser: Omit<Anwser, 'id'>,
  ): Promise<Anwser> {
    return this.anwserRepository.create(anwser);
  }

  @get('/anwsers/count')
  @response(200, {
    description: 'Anwser model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Anwser) where?: Where<Anwser>,
  ): Promise<Count> {
    return this.anwserRepository.count(where);
  }

  @get('/anwsers')
  @response(200, {
    description: 'Array of Anwser model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Anwser, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Anwser) filter?: Filter<Anwser>,
  ): Promise<Anwser[]> {
    return this.anwserRepository.find(filter);
  }

  @patch('/anwsers')
  @response(200, {
    description: 'Anwser PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Anwser, {partial: true}),
        },
      },
    })
    anwser: Anwser,
    @param.where(Anwser) where?: Where<Anwser>,
  ): Promise<Count> {
    return this.anwserRepository.updateAll(anwser, where);
  }

  @get('/anwsers/{id}')
  @response(200, {
    description: 'Anwser model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Anwser, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Anwser, {exclude: 'where'}) filter?: FilterExcludingWhere<Anwser>
  ): Promise<Anwser> {
    return this.anwserRepository.findById(id, filter);
  }

  @patch('/anwsers/{id}')
  @response(204, {
    description: 'Anwser PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Anwser, {partial: true}),
        },
      },
    })
    anwser: Anwser,
  ): Promise<void> {
    await this.anwserRepository.updateById(id, anwser);
  }

  @put('/anwsers/{id}')
  @response(204, {
    description: 'Anwser PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() anwser: Anwser,
  ): Promise<void> {
    await this.anwserRepository.replaceById(id, anwser);
  }

  @del('/anwsers/{id}')
  @response(204, {
    description: 'Anwser DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.anwserRepository.deleteById(id);
  }
}
