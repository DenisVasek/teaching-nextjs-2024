import Link from 'next/link'; // Import Link for navigation
import { CamelCasePlugin, Kysely } from "kysely";
import { DB } from "../../../lib/db-types"; // Adjust path if necessary
import { dialect } from "../../../lib/db"; // Adjust path if necessary

type Props = { params: { id: string } };

const db = new Kysely<DB>({
  dialect: dialect,
  plugins: [new CamelCasePlugin()],
});

export default async function PageDetail({ params }: Props) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return <div>Error: Invalid ID</div>;
  }

  const post = await db
    .selectFrom("posts")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  if (!post) {
    return <div>Post Not Found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="card bg-white w-full max-w-md shadow-lg rounded-lg overflow-hidden">
        <div className="card-body p-6">
          <h1 className="text-2xl font-bold text-gray-800">{post.content}</h1>
          <p className="text-sm text-gray-600">User ID: {post.userId}</p>
          <p className="text-sm text-gray-400">Created At: {new Date(post.createdAt).toLocaleString()}</p>
          <p className="mt-2 text-sm text-gray-500">Post ID: {post.id}</p>
        </div>
      </div>
      <Link href="/" passHref>
        <button className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          Back to All Posts
        </button>
      </Link>
    </div>
  );
}
