import {Entity, model, property} from '@loopback/repository';

@model()
export class TestHasQuestion extends Entity {
  @property({
    type:'string',
    id:true,
    generated: true
  })
  id?:string;

  @property({
    type: 'string',
  })
  testId?: string;

  @property({
    type: 'string',
  })
  simpleQuestionId?: string;

  constructor(data?: Partial<TestHasQuestion>) {
    super(data);
  }
}

export interface TestHasQuestionRelations {
  // describe navigational properties here
}

export type TestHasQuestionWithRelations = TestHasQuestion & TestHasQuestionRelations;
