# Website Builder - Claude Code Instructions

## Architecture Documentation
**IMPORTANT: Read `ARCHITECTURE.md` for complete technical documentation including:**
- Rendering modes (SSG/ISR/SSR) implementation
- Chakra UI theming system with semantic tokens
- Content management with Decap CMS
- Custom markdown solution details
- Deployment configuration

## Quick Start

This is a Next.js 15 + Chakra UI + Decap CMS setup with hybrid rendering.

### Development Commands
```bash
npm install        # Install dependencies
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run lint       # Run linting
```

### Key URLs
- **Main Site**: http://localhost:3000
- **CMS Admin**: http://localhost:3000/admin
- **Blog**: http://localhost:3000/posts
- **Preview (SSR)**: http://localhost:3000/preview

## Project Structure

```
/
├── src/
│   ├── app/           # Next.js App Router pages (SSG/ISR/SSR)
│   ├── components/    # Reusable Chakra UI components
│   └── lib/           # Theme config & content utilities
├── content/           # Markdown files for CMS
├── public/           
│   ├── admin/        # Decap CMS interface
│   └── uploads/      # Media uploads
└── ARCHITECTURE.md   # Complete technical documentation
```

## Building Websites

### Quick Website Creation
Just tell Claude what you want:
- "Build a modern portfolio website"
- "Create a restaurant website with menu and gallery"
- "Make a SaaS landing page with pricing tables"

### Component Development
- All components go in `/components`
- Use TypeScript for type safety
- Tailwind CSS for styling
- Keep components modular and reusable

### Page Creation
- Create new pages in `/app` directory
- Use `page.tsx` for page components
- Use `layout.tsx` for shared layouts
- API routes go in `/app/api`

## Styling

- **Chakra UI** with semantic tokens (NO Tailwind)
- Use semantic tokens for consistent theming
- Dark mode support built-in
- Theme configuration in `/src/lib/theme.ts`
- Primitives in `/src/components/primitives/`

## Best Practices

1. **Read ARCHITECTURE.md first** for complete understanding
2. **Use Semantic Tokens**: Not hardcoded colors
3. **Choose Rendering Mode**: SSG (static), ISR (semi-dynamic), SSR (live)
4. **Component Primitives**: Build with reusable Chakra components
5. **Type Safe**: Use TypeScript for better development experience
6. **Content in Markdown**: Edit via CMS or directly in `/content`

## Common Tasks

### Add a new page (with rendering mode)
```tsx
// src/app/about/page.tsx
import Section from "@/components/primitives/Section";
import { Heading, Text } from "@chakra-ui/react";

// Choose rendering mode:
// export const revalidate = 60;  // ISR
// export const dynamic = "force-dynamic";  // SSR
// (no export for SSG)

export default function About() {
  return (
    <Section>
      <Heading color="text.primary">About Us</Heading>
      <Text color="text.muted">Content here</Text>
    </Section>
  )
}
```

### Create a Chakra UI component
```tsx
// src/components/primitives/Button.tsx
"use client";
import { Button as ChakraButton } from "@chakra-ui/react";

export default function Button({ children, ...props }) {
  return (
    <ChakraButton
      colorScheme="brand"
      variant="soft"
      {...props}
    >
      {children}
    </ChakraButton>
  )
}
```

### Add an API endpoint
```tsx
// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello World' })
}
```

## Important Technical Notes

### Rendering Modes Reference
- **SSG (Static)**: Default, no export needed, fastest
- **ISR (Incremental)**: `export const revalidate = 60` (seconds)
- **SSR (Dynamic)**: `export const dynamic = "force-dynamic"`

### Content Management
- Edit markdown files in `/content/pages/` or `/content/posts/`
- Or use Decap CMS at `/admin` (git-based)
- Content parsed with gray-matter and remark

### Deployment
- Configured for Netlify (see `netlify.toml`)
- Enable Identity & Git Gateway for CMS auth
- Node 20 required (`.nvmrc` configured)

## Ready to Build!

**Start with `ARCHITECTURE.md` for deep technical understanding**, then describe what you want to create!