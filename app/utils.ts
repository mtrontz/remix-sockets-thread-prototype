import { build, fake } from '@jackfranklin/test-data-bot';
import { v4 } from 'uuid';
import type {CommentType, AuthorName} from '~/types';


export const buildAuthorName = build<AuthorName>('AuthorName', {
  fields: {
    authorName: fake((faker) => faker.name.firstName()),
  },
})

export const buildComment = build<CommentType>('CommentType', {
  fields: {
    id: v4(),
  authorName: fake((faker) => faker.name.firstName()),
  text: fake((faker) => faker.lorem.sentences(Math.round(Math.random() * 10))),
  date: fake((faker) => faker.date.recent()),
  },
});

export const buildComments = (count: number) => {
  let comments: CommentType[] = [];
  for (let index = 0; index < count; index++) {
    const comment = buildComment();
    comments.push(comment);
  };
  return comments;
}