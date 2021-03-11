import {
  Arg, Args, ArgsType, Field, Int, Mutation, ObjectType, Query, Resolver, Root, Subscription,
} from 'type-graphql';
import { getConnection, getManager, MoreThanOrEqual } from 'typeorm';
import ProgressEntry from '../models/ProgressEntry';
import ProgressEntryView from '../models/ProgressEntryView';

@ArgsType()
export class ProgressPayload {
  @Field()
  course!: string;

  @Field()
  lesson!: string;
}

@ObjectType()
export class UserLesson {
  @Field()
  course!: string;

  @Field()
  lesson!: string;

  @Field()
  uuid!: string;
}

@Resolver(() => ProgressEntry)
class ProgressResolver {
  @Query(() => [ProgressEntryView])
  async getProgress(@Arg('course') course: string, @Arg('lesson') lesson: string): Promise<Array<ProgressEntryView>> {
    return ProgressEntryView.find({
      where: {
        course,
        lesson,
      },
    });
  }

  @Query(() => [ProgressEntry])
  async getProgressByUser(@Arg('course') course: string, @Arg('lesson') lesson: string, @Arg('uuid') uuid: string): Promise<Array<ProgressEntry>> {
    return ProgressEntry.find({
      where: {
        course,
        lesson,
        user: uuid,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  @Query(() => String, { nullable: true })
  async getUserName(@Arg('course') course: string, @Arg('lesson') lesson: string, @Arg('uuid') uuid: string): Promise<string| null> {
    // TODO: Only fetch name.
    const result = await ProgressEntryView.findOne({
      where: {
        course,
        lesson,
        user: uuid,
      },
    });

    return result?.userName || null;
  }

  @Query(() => [UserLesson])
  async getLessonsByUser(@Arg('uuid') uuid: string): Promise<Array<UserLesson>> {
    const result = await ProgressEntryView.find({
      where: {
        user: uuid,
      },
    });

    return result.map(({ course, lesson, user }) => {
      const n = new UserLesson();
      n.course = course;
      n.lesson = lesson;
      n.uuid = user;
      return n;
    });
  }

  @Query(() => [String])
  async getLessons(@Arg('course') course: string): Promise<Array<string>> {
    const result = await getConnection().createQueryBuilder()
      .select('entry.lesson')
      .from(ProgressEntry, 'entry')
      .distinctOn(['lesson'])
      .where('entry.course = :course', { course })
      .getMany();
    return result.map((r) => r.lesson);
  }

  @Subscription(() => ProgressEntryView, {
    topics: ({ args }) => `${args.course}/${args.lesson}`,
    // filter: ({ payload, args }: ResolverFilterData<ProgressPayload, ProgressPayload>)
    // => args.course === payload.course && args.lesson === payload.lesson,
  })
  async courseSubscription(
    @Root() payload: ProgressEntryView,
      @Args() args: ProgressPayload,
  ): Promise<ProgressEntryView> {
    return payload;
  }

  @Query(() => [String])
  async getCourses(): Promise<Array<string>> {
    // We don't define courses as a static database entity,
    // but rather as ephemeral value on the progress entries
    const results = await ProgressEntry.createQueryBuilder('progress')
      .select('progress.course')
      .distinctOn(['course'])
      .getMany();
    // We still need to flatten the list.
    return results.map((p) => p.course);
  }

  @Mutation(() => Boolean)
  async purgeCourse(@Arg('course') course: string): Promise<boolean> {
    await ProgressEntry.delete({
      course,
    });
    return true;
  }

  @Mutation(() => Boolean)
  async purgeStudent(@Arg('user') user: string): Promise<boolean> {
    await ProgressEntry.delete({
      user,
    });
    return true;
  }
}

export default ProgressResolver;
