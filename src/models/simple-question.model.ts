import {Entity, model, property, hasMany} from '@loopback/repository';
import {Anwser} from './anwser.model';
import {QuestionHasAnwer} from './question-has-anwer.model';

@model({settings: {strict: false}})
export class SimpleQuestion extends Entity {
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

  @property({
    type:'string'
  })
  type?:string

  @hasMany(() => Anwser, {through: {model: () => QuestionHasAnwer}})
  anwsers: Anwser[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SimpleQuestion>) {
    super(data);
  }
}

export interface SimpleQuestionRelations {
  // describe navigational properties here
}

export type SimpleQuestionWithRelations = SimpleQuestion & SimpleQuestionRelations;
