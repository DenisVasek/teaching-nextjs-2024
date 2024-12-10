"use client";

import { useForm } from "react-hook-form";
import { updateProfile } from "./update-profile-action";

type Props = {
  id: number;
  name: string;
  email: string;
  bio: string; // Assuming `bio` corresponds to `displayName` here
};

type FormValues = {
  name: string;
  email: string;
  bio: string; // Match the form fields
};

export function EditProfileForm(props: Props) {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: props.name,
      email: props.email,
      bio: props.bio,
    },
  });

  return (
    <form
      className="grid grid-cols-1 gap-4"
      onSubmit={handleSubmit((data) => {
        // Call updateProfile with all the required data
        updateProfile(props.id, data.name, data.email, data.bio);
      })}
    >
      <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          {...register("name")}
          className="input input-bordered"
          placeholder="Your Name"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          {...register("email")}
          className="input input-bordered"
          placeholder="Your Email"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Bio</span>
        </label>
        <textarea
          {...register("bio")}
          className="textarea textarea-bordered"
          placeholder="Tell us about yourself"
        ></textarea>
      </div>

      <input className="btn btn-sm btn-outline" type="submit" value="Update Profile" />
    </form>
  );
}
