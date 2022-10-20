import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Like {
  @Field(() => Int)
  counter: number;
}
