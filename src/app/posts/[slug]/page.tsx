import { getPostBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import Section from "@/components/primitives/Section";
import { Heading, Text } from "@chakra-ui/react";

export const revalidate = 60; // ISR

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <Section>
      <Heading size="lg" mb={2} color="text.primary">{post.title}</Heading>
      <Text color="text.muted" mb={6}>{new Date(post.date).toDateString()}</Text>
      <article dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </Section>
  );
}