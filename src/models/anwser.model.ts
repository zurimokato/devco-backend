import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Anwser extends Entity {
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
    type: 'boolean',
    required: true,
  })
  isCorrectAnwser: boolean;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Anwser>) {
    super(data);
  }
}

export interface AnwserRelations {
  // describe navigational properties here
}

export type AnwserWithRelations = Anwser & AnwserRelations;
