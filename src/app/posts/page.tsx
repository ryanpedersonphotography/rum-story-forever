import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import Section from "@/components/primitives/Section";
import { Heading, Stack, Text } from "@chakra-ui/react";

export const revalidate = 60; // ISR

export default async function Posts() {
  const allPosts = await getAllPosts();
  const posts = [...allPosts].sort((a, b) => (a.date > b.date ? -1 : 1));
  
  return (
    <Section>
      <Heading size="lg" mb={6} color="text.primary">Blog</Heading>
      <Stack gap={4}>
        {posts.map(p => (
          <Link key={p._id} href={`/posts/${p.slug}`} style={{ textDecoration: "none" }}>
            <Text as="span" color="text.primary" fontWeight="semibold">{p.title}</Text>
            <Text as="span" color="text.muted"> — {p.excerpt ?? ""}</Text>
          </Link>
        ))}
      </Stack>
    </Section>
  );
}