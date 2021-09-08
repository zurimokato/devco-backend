import {Model, model, property, hasMany, Entity} from '@loopback/repository';
import {Test} from './test.model';

@model({settings: {strict: false}})
export class Theme extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @hasMany(() => Test)
  tests: Test[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Theme>) {
    super(data);
  }
}

export interface ThemeRelations {
  // describe navigational properties here
}

export type ThemeWithRelations = Theme & ThemeRelations;
