import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoConnectDataSource} from '../datasources';
import {QuestionHasAnwer, QuestionHasAnwerRelations} from '../models';

export class QuestionHasAnwerRepository extends DefaultCrudRepository<
  QuestionHasAnwer,
  typeof QuestionHasAnwer.prototype.id,
  QuestionHasAnwerRelations
> {
  constructor(
    @inject('datasources.MongoConnect') dataSource: MongoConnectDataSource,
  ) {
    super(QuestionHasAnwer, dataSource);
  }
}
