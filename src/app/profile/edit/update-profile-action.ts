"use server";

import { redirect } from "next/navigation";
import { createDB } from "../../../lib/db";

export async function updateProfile(
  id: number,
  username: string,
  email: string,
  displayName: string
) {
  console.log(`Updating profile for user ID: ${id}`);
  console.log(`Username: ${username}, Email: ${email}, Display Name: ${displayName}`);

  const db = createDB();

  await db
    .updateTable("users") // Assuming the table is named 'users'
    .set({
      username: username,
      email: email,
      displayName: displayName,
    })
    .where("id", "=", id)
    .execute();

  redirect(`/profile`);
}
