import {
  ViewEntity, ViewColumn, Connection, BaseEntity,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import ProgressEntry from './ProgressEntry';

@ObjectType()
@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select('entry.course', 'course')
    .addSelect('entry.user', 'user')
    .addSelect('entry.lesson', 'lesson')
    .addSelect('MAX(entry.progress) >= 95', 'isFinished')
    .addSelect('(array_agg(entry.progress ORDER BY entry.id DESC))[1]', 'progress')
    .addSelect('(array_agg(entry.userName ORDER BY entry.id DESC))[1]', 'userName')
    .addGroupBy('entry.user')
    .addGroupBy('entry.course')
    .addGroupBy('entry.lesson')
    .from(ProgressEntry, 'entry'),
})
class ProgressEntryView extends BaseEntity {
  @ViewColumn()
  @Field()
  course!: string;

  @ViewColumn()
  @Field()
  user!: string;

  @ViewColumn()
  @Field()
  userName!: string;

  @ViewColumn()
  @Field()
  lesson!: string;

  @ViewColumn()
  @Field()
  progress!: number;

  @ViewColumn()
  @Field()
  isFinished!: boolean;
}

export default ProgressEntryView;
