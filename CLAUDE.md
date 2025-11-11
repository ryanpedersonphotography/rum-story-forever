# Website Builder - Claude Code Instructions

## Quick Start

This is a clean Next.js 15 setup optimized for rapid website development.

### Development Commands
```bash
npm install        # Install dependencies
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Run linting
```

## Project Structure

```
/
├── app/           # Next.js App Router pages and layouts
├── components/    # Reusable React components
├── public/        # Static assets (images, fonts, etc.)
│   └── images/    # Image assets
└── styles/        # Global styles and CSS modules
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

- **Tailwind CSS** is pre-configured
- Use utility classes for rapid development
- Custom styles can go in `/styles`
- Global styles in `/app/globals.css`

## Best Practices

1. **Component First**: Build reusable components
2. **Mobile Responsive**: Always design mobile-first
3. **Performance**: Use Next.js Image component for images
4. **SEO Ready**: Set metadata in layouts
5. **Type Safe**: Use TypeScript for better development experience

## Common Tasks

### Add a new page
```tsx
// app/about/page.tsx
export default function About() {
  return (
    <main>
      <h1>About Us</h1>
    </main>
  )
}
```

### Create a component
```tsx
// components/Button.tsx
export default function Button({ children, onClick }) {
  return (
    <button 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={onClick}
    >
      {children}
    </button>
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

## Ready to Build!

The project is now clean and ready for building any type of website. Just describe what you want to create!