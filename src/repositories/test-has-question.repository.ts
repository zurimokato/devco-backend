import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoConnectDataSource} from '../datasources';
import {TestHasQuestion, TestHasQuestionRelations} from '../models';

export class TestHasQuestionRepository extends DefaultCrudRepository<
  TestHasQuestion,
  typeof TestHasQuestion.prototype.id,
  TestHasQuestionRelations
> {
  constructor(
    @inject('datasources.MongoConnect') dataSource: MongoConnectDataSource,
  ) {
    super(TestHasQuestion, dataSource);
  }
}
