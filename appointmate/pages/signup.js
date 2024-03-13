import Register from "@/Components/register";
import { getCsrfToken, getSession } from "next-auth/react"
import { useState } from "react";

export default function Login() {

    return (
      <>
        <Register />
      </>
    );
  }

export async function getServerSideProps(context) {
  const { req, query } = context;
  const session = await getSession({ req });
  const { callbackUrl } = query

  if (session) {
    return {
      redirect: {
        destination: callbackUrl || "/profile",
      },
    };
  }
  const csrfToken = await getCsrfToken(context);

  return {
    props: { callbackUrl: "/profile" },
  };
}