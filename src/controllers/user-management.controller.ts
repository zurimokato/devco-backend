import {
  authenticate,
  TokenService,
  UserService
} from '@loopback/authentication';
import {TokenServiceBindings} from '@loopback/authentication-jwt';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {model, property, repository,Filter} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  post,
  put,
  requestBody
} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import _ from 'lodash';
import {PasswordHasherBindings, UserServiceBindings} from '../keys';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories';
import {
  basicAuthorization,
  PasswordHasher,
  UserManagementService,
  validateCredentials
} from '../services';
import {OPERATION_SECURITY_SPEC} from '../utils';
import {CredentialsRequestBody} from './user.controller';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class UserManagementController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
    @inject(UserServiceBindings.USER_SERVICE)
    public userManagementService: UserManagementService,
  ) { }

  @post('/users', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    // All new users have the "candidate" role by default
    newUserRequest.roles = ['candidate'];
    newUserRequest.rol='candidate';
    // ensure a valid email value and password value
    validateCredentials(_.pick(newUserRequest, ['email', 'password']));

    try {
      newUserRequest.resetKey = '';
      return await this.userManagementService.createUser(newUserRequest);
    } catch (error: any) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }

  @put('/users/{userId}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['recruiter', 'candidate'],
    voters: [basicAuthorization],
  })
  async set(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.path.string('userId') userId: string,
    @requestBody({description: 'update user'}) user: User,
  ): Promise<void> {
    try {
      // Only recruiter can assign roles
      if (!currentUserProfile.roles.includes('recruiter')) {
        delete user.roles;
      }
      return await this.userRepository.updateById(userId, user);
    } catch (e: any) {
      return e;
    }
  }

  @get('/users/{userId}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    //roles permitidos
    allowedRoles: ['recruiter', 'candidate'],
    voters: [basicAuthorization],
  })
  async findById(@param.path.string('userId') userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }



  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return {token};
  }


  @get('/users/candidates', {security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User',

        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['recruiter', 'candidate'],
    voters: [basicAuthorization],
  })
  async getCandidates(@param.filter(User) filter?: Filter<User>,){
    return this.userRepository.find({where:{'rol':'candidate'}})
  }



}
