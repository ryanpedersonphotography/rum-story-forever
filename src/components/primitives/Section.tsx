"use client";
import { Box, Container } from "@chakra-ui/react";

export default function Section({
  children,
  maxW = "container.lg",
  py = { base: 10, md: 16 },
}: { children: React.ReactNode; maxW?: string; py?: any }) {
  return (
    <Box as="section" bg="bg.surface">
      <Container maxW={maxW} py={py}>{children}</Container>
    </Box>
  );
}