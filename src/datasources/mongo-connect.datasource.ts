import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'MongoConnect',
  connector: 'mongodb',
  url: 'mongodb+srv://root:root@clusterdevco.s9h5h.mongodb.net/devco?retryWrites=true&w=majority',
  host: 'clusterdevco-shard-00-00.s9h5h.mongodb.net',
  port: 27017,
  user: 'root',
  password: 'root',
  database: 'devco',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoConnectDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MongoConnect';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MongoConnect', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
