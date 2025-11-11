"use client";
import { Card as CkCard, CardBody, Heading, Text } from "@chakra-ui/react";

export function Card({ title, body }: { title: string; body: string }) {
  return (
    <CkCard>
      <CardBody>
        <Heading size="md" color="text.primary" mb={2}>{title}</Heading>
        <Text color="text.muted">{body}</Text>
      </CardBody>
    </CkCard>
  );
}