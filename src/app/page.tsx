'use client'

import Image from 'next/image'
import Chat from "@/components/openai";

export default function Home() {
  return (
    <main className="">
      <Chat/>
    </main>
  )
}
