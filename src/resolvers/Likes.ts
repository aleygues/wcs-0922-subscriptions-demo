import {
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Like } from "../entities/Like";

let count = 0;

@Resolver()
export class LikesResolver {
  @Query(() => Like)
  like() {
    return { counter: count };
  }

  @Mutation(() => Like)
  async doLike(@PubSub() pubSub: PubSubEngine) {
    const updatedVersion = { counter: count++ };
    pubSub.publish("LIKES", updatedVersion);
    return updatedVersion;
  }

  @Subscription(() => Like, {
    topics: "LIKES",
  })
  newLike(
    @Root() notificationPayload: { like: { counter: number } }
  ): { like: { counter: number } } & { date: Date } {
    return {
      ...notificationPayload,
      date: new Date(),
    };
  }
}
