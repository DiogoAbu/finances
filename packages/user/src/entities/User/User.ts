import { Field, ObjectType, Directive, ID } from 'type-graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Directive(`@key(fields: "id")`)
@ObjectType()
@Entity('users')
export default class User extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'text' })
  name: string;

  @Field()
  @Column({ type: 'text', unique: true })
  email: string;

  @Field()
  @VersionColumn()
  version: number;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;
}
