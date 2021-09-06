import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  SecuritySpecEnhancer,
  SECURITY_SCHEME_SPEC,
  TokenServiceBindings,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig,createBindingFromClass} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MongoConnectDataSource} from './datasources';
import {PasswordHasherBindings} from './keys';
import {MySequence} from './sequence';
import {BcryptHasher, UserManagementService, JWTService} from './services';
import {ErrorHandlerMiddlewareProvider} from './middlewares';
import crypto from 'crypto';

export {ApplicationConfig};

export class DevcoBackendApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);



    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);





    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };


    // JWT configuration
    // ------ ADD SNIPPET AT THE BOTTOM ---------
    // Mount authentication system
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    // Bind datasource
    // This is where your User data will be stored.
    this.dataSource(MongoConnectDataSource, UserServiceBindings.DATASOURCE_NAME);
    // Bind the user service to the one in @loopback/authentication-jwt
    this.bind(UserServiceBindings.USER_SERVICE).toClass(UserManagementService);
    // ------------- END OF SNIPPET -------------

    this.setUpBindings()
  }


  setUpBindings(): void {


    // Bind bcrypt hash services
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);

    this.bind(UserServiceBindings.USER_SERVICE).toClass(UserManagementService);
    this.add(createBindingFromClass(SecuritySpecEnhancer));

    this.add(createBindingFromClass(ErrorHandlerMiddlewareProvider));

    // Use JWT secret from JWT_SECRET environment variable if set
    // otherwise create a random string of 64 hex digits
    const secret =
      process.env.JWT_SECRET ?? crypto.randomBytes(32).toString('hex');
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(secret);
  }

}
