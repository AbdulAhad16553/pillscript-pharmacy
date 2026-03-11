"use client";

import { NhostProvider as NhostProviderBase } from "@nhost/nextjs";
import { nhost } from "@/lib/nhost";

export default function NhostProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NhostProviderBase nhost={nhost}>{children}</NhostProviderBase>
  );
}


