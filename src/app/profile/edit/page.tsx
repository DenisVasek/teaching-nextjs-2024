import { createDB } from "../../../lib/db";
import { EditProfileForm } from "./EditProfileForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function EditProfilePage() {
  const cookieStore = cookies();

  const sessionUserId = cookieStore.get("session-user-id");

  if (sessionUserId == null) {
    redirect("/login");
  }

  const userId = parseInt(sessionUserId.value);

  if (isNaN(userId)) {
    redirect("/login");
  }

  const db = createDB();

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", userId)
    .executeTakeFirstOrThrow();

  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
      <div className="card-body">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <EditProfileForm
          id={user.id}
          name={user.username}
          email={user.email}
          bio={user.displayName ?? ""}
        />
      </div>
    </div>
  );
}
