import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CategoryHasQuestion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  categoryId?: string;

  @property({
    type: 'string',
  })
  simpleQuestionId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CategoryHasQuestion>) {
    super(data);
  }
}

export interface CategoryHasQuestionRelations {
  // describe navigational properties here
}

export type CategoryHasQuestionWithRelations = CategoryHasQuestion & CategoryHasQuestionRelations;
