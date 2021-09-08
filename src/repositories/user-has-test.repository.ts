import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoConnectDataSource} from '../datasources';
import {UserHasTest, UserHasTestRelations} from '../models';

export class UserHasTestRepository extends DefaultCrudRepository<
  UserHasTest,
  typeof UserHasTest.prototype.id,
  UserHasTestRelations
> {
  constructor(
    @inject('datasources.MongoConnect') dataSource: MongoConnectDataSource,
  ) {
    super(UserHasTest, dataSource);
  }
}
