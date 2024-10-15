import { CamelCasePlugin, Kysely } from "kysely";
import { DB } from "../../../lib/db-types";
import { dialect } from "../../../lib/db";

type Props = { params: { id: string } };

export default async function PostDetail(props: Props) {
  console.log(`PostDetail id: ${props.params.id}`);

  const id = parseInt(props.params.id);

  if (isNaN(id)) {
    return <div>Error: Invalid ID</div>;
  }

  const db = new Kysely<DB>({
    dialect: dialect,
    plugins: [new CamelCasePlugin()],
  });

  const postWithUser = await db
    .selectFrom("posts")
    .innerJoin("users", "posts.userId", "users.id")
    .selectAll("posts")
    .select(["users.displayName", "users.username"])
    .where("posts.id", "=", id)
    .executeTakeFirst();

  if (postWithUser == null) {
    return <div>Error: Post not found</div>;
  }

  const commentsWithUsers = await db
    .selectFrom("comments")
    .innerJoin("users", "comments.userId", "users.id")
    .selectAll("comments")
    .select(["users.displayName", "users.username"])
    .where("postId", "=", postWithUser.id)
    .execute();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 sm:items-start">
        <div
          key={postWithUser.id}
          className="card bg-base-100 w-96 drop-shadow-md"
        >
          <div className="card-body">
            <p>{postWithUser.content}</p>
            <p>{new Date(postWithUser.createdAt).toLocaleString()}</p>
            <p>{postWithUser.displayName ?? postWithUser.username}</p>
            <br />
            <ul className="list-disc">
              {commentsWithUsers.map((c) => (
                <li key={c.id}>
                  {c.content} [{c.displayName ?? c.username}]
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}