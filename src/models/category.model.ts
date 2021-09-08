import {Entity, model, property, hasMany} from '@loopback/repository';
import {SimpleQuestion} from './simple-question.model';
import {CategoryHasQuestion} from './category-has-question.model';

@model({settings: {strict: false}})
export class Category extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  n?: string;

  @hasMany(() => SimpleQuestion, {through: {model: () => CategoryHasQuestion}})
  simpleQuestions: SimpleQuestion[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
