import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoConnectDataSource} from '../datasources';
import {Category, CategoryRelations, SimpleQuestion, CategoryHasQuestion} from '../models';
import {CategoryHasQuestionRepository} from './category-has-question.repository';
import {SimpleQuestionRepository} from './simple-question.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {

  public readonly simpleQuestions: HasManyThroughRepositoryFactory<SimpleQuestion, typeof SimpleQuestion.prototype.id,
          CategoryHasQuestion,
          typeof Category.prototype.id
        >;

  constructor(
    @inject('datasources.MongoConnect') dataSource: MongoConnectDataSource, @repository.getter('CategoryHasQuestionRepository') protected categoryHasQuestionRepositoryGetter: Getter<CategoryHasQuestionRepository>, @repository.getter('SimpleQuestionRepository') protected simpleQuestionRepositoryGetter: Getter<SimpleQuestionRepository>,
  ) {
    super(Category, dataSource);
    this.simpleQuestions = this.createHasManyThroughRepositoryFactoryFor('simpleQuestions', simpleQuestionRepositoryGetter, categoryHasQuestionRepositoryGetter,);
    this.registerInclusionResolver('simpleQuestions', this.simpleQuestions.inclusionResolver);
  }
}
