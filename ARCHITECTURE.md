# Next.js + Chakra UI + Decap CMS Architecture Documentation

## Overview
This project implements a modern JAMstack architecture with hybrid rendering modes (SSG/ISR/SSR) using Next.js 15, Chakra UI for styling, and Decap CMS for content management.

## Tech Stack

### Core Dependencies
- **Next.js 15.1.0**: React framework with App Router
- **React 19.0.0**: UI library
- **Chakra UI 2.10.0**: Component library with semantic tokens
- **Decap CMS 3.0**: Git-based content management
- **Gray Matter**: Markdown frontmatter parser
- **Remark**: Markdown to HTML processor

## Project Structure

```
/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with Chakra Provider
│   │   ├── page.tsx            # Home page (SSG)
│   │   ├── posts/
│   │   │   ├── page.tsx        # Blog listing (ISR - 60s)
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Blog post detail (ISR - 60s)
│   │   └── preview/
│   │       └── page.tsx        # Preview page (SSR)
│   ├── components/
│   │   └── primitives/         # Reusable UI components
│   │       ├── Section.tsx     # Layout wrapper
│   │       └── Card.tsx        # Card component
│   └── lib/
│       ├── theme.ts            # Chakra UI theme configuration
│       └── content.ts          # Content management utilities
├── content/                    # Markdown content
│   ├── pages/                  # Static pages
│   └── posts/                  # Blog posts
├── public/
│   ├── admin/                  # Decap CMS files
│   │   ├── index.html         # CMS entry point
│   │   └── config.yml         # CMS configuration
│   └── uploads/               # Media uploads
└── netlify.toml               # Netlify deployment config
```

## Key Concepts

### 1. Rendering Modes

#### Static Site Generation (SSG)
- **Home Page** (`src/app/page.tsx`)
- Built at compile time
- No revalidation
- Fastest performance

#### Incremental Static Regeneration (ISR)
- **Blog Pages** (`src/app/posts/`)
- `export const revalidate = 60`
- Regenerates every 60 seconds
- Balance of performance and freshness

#### Server-Side Rendering (SSR)
- **Preview Page** (`src/app/preview/page.tsx`)
- `export const dynamic = "force-dynamic"`
- Fresh on every request
- For live previews and drafts

### 2. Content Management

#### Custom Markdown Solution
Since Contentlayer doesn't support Next.js 15, we use a custom solution:

```typescript
// src/lib/content.ts
- getAllPages(): Reads markdown from content/pages/
- getAllPosts(): Reads markdown from content/posts/
- getPostBySlug(): Fetches specific post
- Uses gray-matter for frontmatter parsing
- Uses remark for markdown→HTML conversion
```

#### Content Structure
```markdown
---
title: "Post Title"
date: "2025-01-01"
excerpt: "Brief description"
---
Markdown content here
```

### 3. Chakra UI Theming

#### Semantic Tokens
```typescript
// src/lib/theme.ts
semanticTokens: {
  colors: {
    "bg.surface": { default: "gray.50", _dark: "gray.900" },
    "text.primary": { default: "gray.800", _dark: "gray.100" },
    "brand.solid": { default: "brand.600", _dark: "brand.400" }
  }
}
```

#### Component Primitives
- **Section**: Container with consistent padding
- **Card**: Styled card with semantic tokens
- All components use semantic tokens for automatic dark mode

### 4. CMS Configuration

#### Decap CMS Setup
- Admin panel at `/admin`
- Git-based workflow
- Two collections: Pages and Posts
- Media stored in `/public/uploads`

#### Collections Configuration
```yaml
# public/admin/config.yml
collections:
  - name: "pages"
    folder: "content/pages"
    fields: [title, excerpt, hero_image, body]
  
  - name: "posts"
    folder: "content/posts"
    fields: [title, date, excerpt, body]
```

## Development Workflow

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
# Visit http://localhost:3000
```

### 3. Access CMS
```bash
# Visit http://localhost:3000/admin
# Local backend enabled for development
```

### 4. Create Content
- Add markdown files to `content/pages/` or `content/posts/`
- Or use Decap CMS at `/admin`

### 5. Build for Production
```bash
npm run build
```

## Deployment (Netlify)

### Configuration
```toml
# netlify.toml
[build]
  command = "next build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Setup Steps
1. Connect GitHub repository to Netlify
2. Enable Identity for CMS authentication
3. Enable Git Gateway
4. Deploy

## Customization Guide

### Change Rendering Mode
```typescript
// For SSG (default)
// No export needed

// For ISR
export const revalidate = 60; // seconds

// For SSR
export const dynamic = "force-dynamic";
```

### Add New Semantic Token
```typescript
// src/lib/theme.ts
semanticTokens: {
  colors: {
    "custom.accent": { default: "#FF6B6B", _dark: "#FF9999" }
  }
}
```

### Create New Primitive Component
```typescript
// src/components/primitives/NewComponent.tsx
"use client";
import { Box } from "@chakra-ui/react";

export default function NewComponent({ children }) {
  return (
    <Box bg="bg.elevated" color="text.primary">
      {children}
    </Box>
  );
}
```

### Add Content Type
1. Update `src/lib/content.ts` with new interface and function
2. Add collection to `public/admin/config.yml`
3. Create folder in `content/`

## Performance Optimizations

1. **Image Optimization**: Next.js Image component with priority loading
2. **Code Splitting**: Automatic via Next.js App Router
3. **Semantic Tokens**: Reduced CSS bundle size
4. **ISR**: Balance between static and dynamic
5. **Netlify CDN**: Global edge caching

## Common Tasks

### Switch Page to ISR
```typescript
// Add to any page.tsx
export const revalidate = 60;
```

### Force Fresh Data
```typescript
// Add to any page.tsx
export const dynamic = "force-dynamic";
// Or in fetch
fetch(url, { cache: "no-store" });
```

### Update Theme Colors
Edit `src/lib/theme.ts` brand colors or semantic tokens

### Add Navigation
Create a Header component and add to `src/app/layout.tsx`

## Troubleshooting

### Build Errors
- Ensure Node 20+ is installed
- Clear `.next` folder: `rm -rf .next`
- Reinstall deps: `rm -rf node_modules && npm install`

### CMS Not Loading
- Check `local_backend: true` in config.yml for development
- For production, ensure Netlify Identity is enabled

### Styles Not Applying
- Verify component uses semantic tokens
- Check ChakraProvider wraps app in layout.tsx
- Clear browser cache

## File-by-File Explanation

### src/app/layout.tsx
Root layout that wraps entire app with ChakraProvider for theming

### src/app/page.tsx
Home page with full-screen hero image (SSG)

### src/lib/theme.ts
Chakra UI configuration with semantic tokens for consistent theming

### src/lib/content.ts
Content utilities for reading and parsing markdown files

### public/admin/config.yml
Decap CMS configuration defining content structure

### netlify.toml
Deployment configuration for Netlify platform

## Best Practices

1. **Use Semantic Tokens**: Instead of hardcoding colors
2. **Primitives First**: Build reusable components
3. **Type Safety**: Use TypeScript interfaces for content
4. **Git-Based CMS**: Version control for content
5. **Hybrid Rendering**: Choose right mode per page

## Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Chakra UI Documentation](https://chakra-ui.com/docs)
- [Decap CMS Documentation](https://decapcms.org/docs)
- [Netlify Next.js Plugin](https://docs.netlify.com/integrations/frameworks/next-js/)