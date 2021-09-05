import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoConnectDataSource} from '../datasources';
import {Anwser, AnwserRelations} from '../models';

export class AnwserRepository extends DefaultCrudRepository<
  Anwser,
  typeof Anwser.prototype.id,
  AnwserRelations
> {
  constructor(
    @inject('datasources.MongoConnect') dataSource: MongoConnectDataSource,
  ) {
    super(Anwser, dataSource);
  }
}
