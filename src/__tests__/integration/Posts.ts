import { Database } from "@";
import { getPG, setupPG, teardownPG } from "./utils";
import { PostsTable, UsersTable } from "./tables";
import { assert, IsExact } from "conditional-type-checks";

beforeEach(setupPG);
afterEach(teardownPG);

test("Integration test with users and posts", async () => {
  const pg = getPG();
  const db = Database(pg, {
    users: new UsersTable(),
    posts: new PostsTable(),
  });

  const result = await db.select(db.users, "id", "name");
  assert<IsExact<(typeof result)[0], { id: number; name: string }>>(true);

  await db.insertInto(db.users).values({
    name: "Travis",
  });
  await db.insertInto(db.posts).values({
    authorId: 1,
    body: "My first post!",
  });

  const post = await db.selectOne(db.posts, "createdAt");
  expect(post).toBeTruthy();

  const { createdAt } = post!;
  expect(new Date().getTime() - createdAt.getTime()).toBeLessThan(5);
});