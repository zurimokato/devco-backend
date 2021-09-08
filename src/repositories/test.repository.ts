import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoConnectDataSource} from '../datasources';
import {Test, TestRelations, SimpleQuestion, TestHasQuestion, Theme} from '../models';
import {TestHasQuestionRepository} from './test-has-question.repository';
import {SimpleQuestionRepository} from './simple-question.repository';
import {ThemeRepository} from './theme.repository';

export class TestRepository extends DefaultCrudRepository<
  Test,
  typeof Test.prototype.id,
  TestRelations
> {

  public readonly simpleQuestions: HasManyThroughRepositoryFactory<SimpleQuestion, typeof SimpleQuestion.prototype.id,
          TestHasQuestion,
          typeof Test.prototype.id
        >;

  public readonly theme: BelongsToAccessor<Theme, typeof Test.prototype.id>;

  constructor(
    @inject('datasources.MongoConnect') dataSource: MongoConnectDataSource, @repository.getter('TestHasQuestionRepository') protected testHasQuestionRepositoryGetter: Getter<TestHasQuestionRepository>, @repository.getter('SimpleQuestionRepository') protected simpleQuestionRepositoryGetter: Getter<SimpleQuestionRepository>, @repository.getter('ThemeRepository') protected themeRepositoryGetter: Getter<ThemeRepository>,
  ) {
    super(Test, dataSource);
    this.theme = this.createBelongsToAccessorFor('theme', themeRepositoryGetter,);
    this.registerInclusionResolver('theme', this.theme.inclusionResolver);
    this.simpleQuestions = this.createHasManyThroughRepositoryFactoryFor('simpleQuestions', simpleQuestionRepositoryGetter, testHasQuestionRepositoryGetter,);
    this.registerInclusionResolver('simpleQuestions', this.simpleQuestions.inclusionResolver);
  }
}
