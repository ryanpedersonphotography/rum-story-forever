export const dynamic = "force-dynamic";

import Section from "@/components/primitives/Section";
import { Heading, Text } from "@chakra-ui/react";

export default async function Preview() {
  // Example: live fetch from a headless preview endpoint or draft source
  // const data = await fetch("https://your-preview-api", { cache: "no-store" }).then(r => r.json());
  return (
    <Section>
      <Heading size="lg" color="text.primary">Preview (SSR)</Heading>
      <Text color="text.muted">
        This route is forced SSR so editors see draft changes immediately.
      </Text>
    </Section>
  );
}