"use client";

import { Header } from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function App() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      console.log("object");
      router.push("/viewer", { scroll: false });
    }
  }, [session]);

  return (
    <>
      <Header />
      <div className="w-[100%] h-[calc(100vh-50px)] bg-gradient-to-b from-cyan-800 to-blue-950 flex justify-center items-center">
        <div>
          <h1 className="text-3xl text-white">Metalopolis app</h1>
          <h5 className="text-white">
            Visualiza y analiza el codigo de tus repositorios.
          </h5>
        </div>
        {/* <Chat /> */}
      </div>
    </>
  );
}
