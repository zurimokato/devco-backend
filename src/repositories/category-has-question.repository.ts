import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoConnectDataSource} from '../datasources';
import {CategoryHasQuestion, CategoryHasQuestionRelations} from '../models';

export class CategoryHasQuestionRepository extends DefaultCrudRepository<
  CategoryHasQuestion,
  typeof CategoryHasQuestion.prototype.id,
  CategoryHasQuestionRelations
> {
  constructor(
    @inject('datasources.MongoConnect') dataSource: MongoConnectDataSource,
  ) {
    super(CategoryHasQuestion, dataSource);
  }
}
