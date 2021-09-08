import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoConnectDataSource} from '../datasources';
import {SimpleQuestion, SimpleQuestionRelations, Anwser} from '../models';
import {AnwserRepository} from './anwser.repository';

export class QuestionRepository extends DefaultCrudRepository<
SimpleQuestion,
  typeof SimpleQuestion.prototype.id,
  SimpleQuestion
> {

  public readonly anwsers: HasManyRepositoryFactory<Anwser, typeof SimpleQuestion.prototype.id>;

  constructor(
    @inject('datasources.MongoConnect') dataSource: MongoConnectDataSource, @repository.getter('AnwserRepository') protected anwserRepositoryGetter: Getter<AnwserRepository>,
  ) {
    super(SimpleQuestion, dataSource);
    this.anwsers = this.createHasManyRepositoryFactoryFor('anwsers', anwserRepositoryGetter,);
    this.registerInclusionResolver('anwsers', this.anwsers.inclusionResolver);
  }
}
