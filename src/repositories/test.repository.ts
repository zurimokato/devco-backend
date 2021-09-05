import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoConnectDataSource} from '../datasources';
import {Test, TestRelations, SimpleQuestion, TestHasQuestion} from '../models';
import {TestHasQuestionRepository} from './test-has-question.repository';
import {SimpleQuestionRepository} from './simple-question.repository';

export class TestRepository extends DefaultCrudRepository<
  Test,
  typeof Test.prototype.id,
  TestRelations
> {

  public readonly simpleQuestions: HasManyThroughRepositoryFactory<SimpleQuestion, typeof SimpleQuestion.prototype.id,
          TestHasQuestion,
          typeof Test.prototype.id
        >;

  constructor(
    @inject('datasources.MongoConnect') dataSource: MongoConnectDataSource, @repository.getter('TestHasQuestionRepository') protected testHasQuestionRepositoryGetter: Getter<TestHasQuestionRepository>, @repository.getter('SimpleQuestionRepository') protected simpleQuestionRepositoryGetter: Getter<SimpleQuestionRepository>,
  ) {
    super(Test, dataSource);
    this.simpleQuestions = this.createHasManyThroughRepositoryFactoryFor('simpleQuestions', simpleQuestionRepositoryGetter, testHasQuestionRepositoryGetter,);
    this.registerInclusionResolver('simpleQuestions', this.simpleQuestions.inclusionResolver);
  }
}
