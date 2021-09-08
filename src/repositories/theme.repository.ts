import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoConnectDataSource} from '../datasources';
import {Theme, ThemeRelations, Test} from '../models';
import {TestRepository} from './test.repository';

export class ThemeRepository extends DefaultCrudRepository<
  Theme,
  typeof Theme.prototype.id,
  ThemeRelations
> {

  public readonly tests: HasManyRepositoryFactory<Test, typeof Theme.prototype.id>;

  constructor(
    @inject('datasources.MongoConnect') dataSource: MongoConnectDataSource, @repository.getter('TestRepository') protected testRepositoryGetter: Getter<TestRepository>,
  ) {
    super(Theme, dataSource);
    this.tests = this.createHasManyRepositoryFactoryFor('tests', testRepositoryGetter,);
    this.registerInclusionResolver('tests', this.tests.inclusionResolver);
  }
}
