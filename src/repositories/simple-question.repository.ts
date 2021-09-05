import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoConnectDataSource} from '../datasources';
import {SimpleQuestion, SimpleQuestionRelations, Anwser, QuestionHasAnwer} from '../models';
import {QuestionHasAnwerRepository} from './question-has-anwer.repository';
import {AnwserRepository} from './anwser.repository';

export class SimpleQuestionRepository extends DefaultCrudRepository<
  SimpleQuestion,
  typeof SimpleQuestion.prototype.id,
  SimpleQuestionRelations
> {

  public readonly anwsers: HasManyThroughRepositoryFactory<Anwser, typeof Anwser.prototype.id,
          QuestionHasAnwer,
          typeof SimpleQuestion.prototype.id
        >;

  constructor(
    @inject('datasources.MongoConnect') dataSource: MongoConnectDataSource, @repository.getter('QuestionHasAnwerRepository') protected questionHasAnwerRepositoryGetter: Getter<QuestionHasAnwerRepository>, @repository.getter('AnwserRepository') protected anwserRepositoryGetter: Getter<AnwserRepository>,
  ) {
    super(SimpleQuestion, dataSource);
    this.anwsers = this.createHasManyThroughRepositoryFactoryFor('anwsers', anwserRepositoryGetter, questionHasAnwerRepositoryGetter,);
    this.registerInclusionResolver('anwsers', this.anwsers.inclusionResolver);
  }
}
