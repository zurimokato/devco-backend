import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {SimpleQuestion} from './simple-question.model';
import {TestHasQuestion} from './test-has-question.model';
import {Theme} from './theme.model';

@model({settings: {strict: false}})
export class Test extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  // Define well-known properties here
  @hasMany(() => SimpleQuestion, {through: {model: () => TestHasQuestion}})
  simpleQuestions: SimpleQuestion[];
  @property({
    type: 'string',
  })
  userId?: string;

  @property({
    type: 'string',
  })
  userIdCandidate?: string;

  @belongsTo(() => Theme)
  themeId: string;
  @property({
    type: 'string',
  })
  name?: string

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Test>) {
    super(data);
  }
}

export interface TestRelations {
  // describe navigational properties here
}

export type TestWithRelations = Test & TestRelations;
