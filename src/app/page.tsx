import { getAllPages } from "@/lib/content";
import Image from "next/image";
import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";

export default async function Home() {
  const allPages = await getAllPages();
  const home = allPages[0];
  
  return (
    <Box position="relative" height="100vh" width="100%" overflow="hidden">
      {/* Full-screen hero image */}
      <Image
        src={home?.hero_image || "/uploads/home-hero-01.jpeg"}
        alt={home?.title || "Hero"}
        fill
        style={{ objectFit: "cover" }}
        priority
        quality={90}
      />
      
      {/* Dark overlay for better text visibility */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.400"
        zIndex={1}
      />
      
      {/* Hero content */}
      <Container
        position="relative"
        zIndex={2}
        height="100%"
        maxW="container.xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={6} textAlign="center" color="white">
          <Heading
            size={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            textShadow="2px 2px 4px rgba(0,0,0,0.5)"
          >
            {home?.title ?? "Welcome"}
          </Heading>
          
          {home?.excerpt && (
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              maxW="2xl"
              textShadow="1px 1px 2px rgba(0,0,0,0.5)"
            >
              {home.excerpt}
            </Text>
          )}
          
          <Button
            size="lg"
            colorScheme="brand"
            variant="solid"
            mt={4}
            px={8}
            _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
            transition="all 0.2s"
          >
            Get Started
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}