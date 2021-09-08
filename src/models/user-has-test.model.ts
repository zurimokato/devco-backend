import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class UserHasTest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isFinished?: boolean;

  @property({
    type: 'number',
    default: 0,
  })
  score?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserHasTest>) {
    super(data);
  }
}

export interface UserHasTestRelations {
  // describe navigational properties here
}

export type UserHasTestWithRelations = UserHasTest & UserHasTestRelations;
