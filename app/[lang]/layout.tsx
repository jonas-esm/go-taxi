import React from "react";

import { Stack } from "@mui/material";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Stack justifyContent={"center"}>{children}</Stack>;
}
