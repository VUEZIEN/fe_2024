"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import useAuthModule from "../auth/lib";

const Admin = () => {
  const { useProfile } = useAuthModule();
  const { data: profile, isFetching } = useProfile();
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(profile);
  return (
    <div className="m-5">
      Admin
      {JSON.stringify(session)}
      <br />
      {JSON.stringify(profile)}
      <br />
      {status}
      <picture>
        <img
          src={profile?.data.avatar}
          alt=""
          draggable="false"
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
      </picture>
      <section className="space-y-3 mt-5">
        <Button
          title="Update"
          colorSchema="blue"
          onClick={() => {
            router.push("admin/update/profile");
          }}
        />
        <Button
          title="Logout"
          colorSchema="red"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/login");
            });
          }}
        />
      </section>
    </div>
  );
};

export default Admin;
