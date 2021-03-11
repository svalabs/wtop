import {
  BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
class ProgressEntry extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  @Index()
  course!: string;

  @Field()
  @Column()
  userName!: string;

  @Field()
  @Column()
  @Index()
  user!: string;

  @Field()
  @Column()
  progress!: number;

  @Field()
  @Column()
  lesson!: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
}

export default ProgressEntry;
