import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  HasOneRepositoryFactory,
  juggler,
  repository,
} from '@loopback/repository';
import {User, UserCredentials, Test} from '../models';
import {UserCredentialsRepository} from './user-credentials.repository';
import {TestRepository} from './test.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {


  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;

  public readonly tests: HasManyRepositoryFactory<Test, typeof User.prototype.id>;

  constructor(
    @inject('datasources.MongoConnect') dataSource: juggler.DataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>, @repository.getter('TestRepository') protected testRepositoryGetter: Getter<TestRepository>,
  ) {
    super(User, dataSource);
    this.tests = this.createHasManyRepositoryFactoryFor('tests', testRepositoryGetter,);
    this.registerInclusionResolver('tests', this.tests.inclusionResolver);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );

  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err:any) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
