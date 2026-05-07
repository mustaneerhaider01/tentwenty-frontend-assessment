"use client";

import { type Session } from "next-auth";
import { SessionProvider as AuthProvider } from "next-auth/react";

interface SessionProviderProps {
  session: Session | null;
  children: React.ReactNode;
}

function SessionProvider({ session, children }: SessionProviderProps) {
  return <AuthProvider session={session}>{children}</AuthProvider>;
}

export default SessionProvider;
