import Link from "next/link";
import { checkAuth } from "../../../lib/auth";
import { createDB } from "../../../lib/db";

export default async function Marketplace() {
  const userId = checkAuth();

  const db = createDB();

  const posts = await db
    .selectFrom("marketplace")
    .selectAll()
    .orderBy("createdAt desc")
    .execute();

  return (
    <div>
      {posts.map((p) => (
        <div key={p.id} className="card bg-base-100 w-96 drop-shadow-md">
          <div className="card-body">
            <p>{p.name}</p>
            <p>{p.price}</p>
            <p>{p.category}</p>
            <p>{p.description}</p>
            <p>{new Date(p.createdAt).toString()}</p>
            <Link href={`/user/${p.userId}`}>
              {p.userId}
              {p.userId === userId ? " *" : ""}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
