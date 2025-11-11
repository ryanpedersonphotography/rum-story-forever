import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: "#f4f6ff",
    100: "#e5e9ff",
    200: "#cbd4ff",
    300: "#a9b6ff",
    400: "#7e8bff",
    500: "#5663f2",
    600: "#434ecc",
    700: "#343ca3",
    800: "#262c7a",
    900: "#1b205c",
  },
};

export const theme = extendTheme({
  config,
  colors,
  radii: { sm: "6px", md: "10px", lg: "16px", xl: "24px", "2xl": "32px" },
  fonts: {
    heading: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    body: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  },
  semanticTokens: {
    colors: {
      "bg.surface": { default: "gray.50", _dark: "gray.900" },
      "bg.elevated": { default: "white", _dark: "gray.800" },
      "text.primary": { default: "gray.800", _dark: "gray.100" },
      "text.muted": { default: "gray.600", _dark: "gray.300" },
      "brand.solid": { default: "brand.600", _dark: "brand.400" },
      "brand.subtle": { default: "brand.50", _dark: "brand.900" },
      "border.muted": { default: "gray.200", _dark: "gray.700" },
    },
    radii: { card: { default: "lg", _dark: "lg" } },
    shadows: { "elevation.1": { default: "sm", _dark: "dark-lg" } },
  },
  components: {
    Button: {
      defaultProps: { colorScheme: "brand" },
      variants: {
        soft: {
          bg: "brand.subtle",
          color: "brand.solid",
          _hover: { bg: "brand.100" },
          _dark: { _hover: { bg: "brand.800" } },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: "bg.elevated",
          borderWidth: "1px",
          borderColor: "border.muted",
          borderRadius: "card",
          boxShadow: "elevation.1",
        },
      },
    },
  },
});