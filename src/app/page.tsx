import Link from 'next/link'; // Import Link from next/link
import { CamelCasePlugin, Kysely } from "kysely";
import { DB } from "../lib/db-types"; // Check this path based on your structure
import { dialect } from "../lib/db"; // Check this path based on your structure

export default async function Home() {
  const db = new Kysely<DB>({
    dialect: dialect,
    plugins: [new CamelCasePlugin()],
  });

  const posts = await db.selectFrom("posts").selectAll().execute();

  // Handle empty posts
  if (!posts || posts.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {posts.map((p) => (
          <Link key={p.id} href={`/post/${p.id}`} passHref>
            <div className="card bg-white w-full max-w-md shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105">
              <div className="card-body p-6">
                <h2 className="text-lg font-bold text-gray-800">{p.content}</h2>
                <p className="text-sm text-gray-600">User ID: {p.userId}</p>
                <p className="text-sm text-gray-400">Created At: {new Date(p.createdAt).toLocaleString()}</p>
                <p className="mt-2 text-sm text-gray-500">Post ID: {p.id}</p>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
