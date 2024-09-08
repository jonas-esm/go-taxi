import { Stack } from "@mui/material";
import React from "react";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Stack justifyContent={"center"}>{children}</Stack>;
}
