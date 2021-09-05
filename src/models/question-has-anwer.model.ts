import {Entity, model, property} from '@loopback/repository';

@model()
export class QuestionHasAnwer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  simpleQuestionId?: string;

  @property({
    type: 'string',
  })
  anwserId?: string;

  constructor(data?: Partial<QuestionHasAnwer>) {
    super(data);
  }
}

export interface QuestionHasAnwerRelations {
  // describe navigational properties here
}

export type QuestionHasAnwerWithRelations = QuestionHasAnwer & QuestionHasAnwerRelations;
