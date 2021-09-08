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
  Theme,
} from '../models';
import {TestRepository} from '../repositories';

export class TestThemeController {
  constructor(
    @repository(TestRepository)
    public testRepository: TestRepository,
  ) { }

  @get('/tests/{id}/theme', {
    responses: {
      '200': {
        description: 'Theme belonging to Test',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Theme)},
          },
        },
      },
    },
  })
  async getTheme(
    @param.path.string('id') id: typeof Test.prototype.id,
  ): Promise<Theme> {
    return this.testRepository.theme(id);
  }
}
