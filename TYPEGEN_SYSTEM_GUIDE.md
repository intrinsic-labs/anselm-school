# Anselm School TypeGen System Guide

## Overview

This system provides end-to-end type safety from Sanity CMS to UI components using Sanity TypeGen. Data flows through a transformation layer that converts raw Sanity data into clean, display-focused types.

## Architecture Flow

```
Raw Sanity Data (GROQ) → Data Manager → Display Types → UI Components
```

## Key Files & Their Roles

### Configuration Files

**`frontend/sanity-typegen.json`**
- Configures TypeGen to scan `src/**/*.{ts,tsx,js,jsx}` for GROQ queries
- Points to CMS schema at `../cms/schema.json`  
- Outputs types to `./src/types/sanity.types.ts`

**`frontend/package.json`** - Scripts section:
```json
"typegen": "cd ../cms && npx sanity schema extract --path=schema.json && cd ../frontend && npx sanity typegen generate"
```
- Automated in `dev` and `build` scripts
- Extracts schema + generates types in one command

### Core Infrastructure

**`frontend/src/lib/sanity.ts`**
- Sanity client configuration with proper TypeScript types
- `urlFor()` helper for image URL generation
- Uses environment variables for project ID/dataset

**`frontend/src/lib/dataTransforms.ts`**
- `SanityImage` and `DisplayImage` type definitions
- `transformImage()` - converts Sanity images to display-ready URLs
- `transformImageWithOptions()` - infrastructure for responsive images (future)

### Query Layer (One file per schema type)

**`frontend/src/queries/heroSection.ts`**
- Uses `defineQuery()` from 'groq' package (required for TypeGen)
- Resolves document references with `->` operator
- Only selects fields needed for display
- Variable name becomes TypeGen type name (`HERO_SECTION_QUERY` → `HERO_SECTION_QUERYResult`)

**Example Query Structure:**
```typescript
export const HERO_SECTION_QUERY = defineQuery(`
  *[_type == "heroSection"][0] {
    headline,
    subheadline,
    backgroundImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`)
```

### Data Manager Layer

**`frontend/src/lib/dataManager.ts`**
- Contains fetch functions for each section (`getHeroSection()`)
- Transforms raw Sanity data → clean display types
- Handles null/undefined conversion based on schema requirements
- Proper error handling with environment-aware logging
- **Type Safety Rules:**
  - Required Sanity fields → non-optional display types
  - Optional Sanity fields → `|| undefined` conversion
  - Use type assertions for complex objects based on transform function signature, eg: `as SanityImage`

### Display Types

**`frontend/src/types/display.ts`**
- Clean interfaces focused on UI needs
- Remove CMS metadata (_id, _type, etc.)
- Use `DisplayImage` instead of complex Sanity image objects
- Make fields optional based on actual schema validation rules

**Example Display Type:**
```typescript
export interface HeroSectionDisplay {
  headline: string                // Required in schema so required here
  subheadline?: string            // Optional in schema
  backgroundImage?: DisplayImage  // Clean image object
}
```

### UI Components

**`frontend/src/components/Hero.tsx`**
- Receives clean `HeroSectionDisplay` props
- Uses established UI classes: `btn-primary`, `btn-outline-primary` from `globals.css`
- Proper null/undefined checking for optional fields
- Next.js Image component for optimized images

### Generated Types

**`frontend/src/types/sanity.types.ts`** (Auto-generated)
- Schema types for all document types
- Query result types (e.g., `HERO_SECTION_QUERYResult`)
- Never edit manually - regenerated on every typegen run

## Development Workflow

### Setting Up New Sections

1. **Create Query File**: `frontend/src/queries/[sectionName].ts`
   - Use `defineQuery()` with unique variable name
   - Resolve references with `->` operator
   - Only select needed fields

2. **Add Display Type**: `frontend/src/types/display.ts`
   - Clean interface without CMS metadata
   - Optional fields based on schema validation
   - Use `DisplayImage` for images

3. **Create Data Manager Function**: `frontend/src/lib/dataManager.ts`
   - Fetch + transform pattern
   - Use QUERY_NAME_QUERYResult type for raw data. DO NOT create additional types or interfaces for raw data. The generated result is already safe to use.
   - Handle null → undefined conversion
   - Type assertions for complex objects
   - Environment-aware logging

4. **Build UI Component**:
   - Receive display type as props
   - Use established UI classes from `globals.css`. DO NOT CREATE NEW CLASSES. DO NOT USE INLINE TEXT UTILITY CLASSES - JUST USE STANDARD HTML ELEMENTS <H1>, <H2>, <P>, ETC. There is an established design system for text styles in `globals.css` that applies utility classes to the elements.
   - Proper optional field handling

### Type Generation Commands

```bash
# Generate types (run this after schema changes)
npm run typegen

# Development (auto-runs typegen)
npm run dev

# Production build (auto-runs typegen)
npm run build
```

## Static Generation Behavior

- **Development**: Fetches data on every request (enables hot reload)
- **Production**: Fetches data once at build time (true static generation)
- Page uses `export const revalidate = false` for full static generation
- Webhook system ready for content-triggered rebuilds (future)

## Key Type Safety Patterns

### Sanity Field → Display Type Mapping

```typescript
// Schema: validation: (Rule) => Rule.required()
headline: string // Required in schema so required here

// Schema: optional field
subheadline?: string

// Transformation:
return {
  headline: rawData.headline || '',             // Convert null to empty string
  subheadline: rawData.subheadline || undefined // Convert null to undefined
}
```

### Image Handling

```typescript
// Raw Sanity
backgroundImage: {
  asset: { _id: string, url: string },
  alt: string
}

// Transform to
backgroundImage?: DisplayImage  // { url: string, alt: string }

// Implementation
backgroundImage: transformImage(rawData.backgroundImage as SanityImage) || undefined
```

## Next Steps Template

For each new section (Purpose, Identity, Anselm, etc.):

1. **Query**: Create `frontend/src/queries/[section].ts`
2. **Display Type**: Add display interface to `frontend/src/types/display.ts`  
3. **Data Manager**: Add function to `frontend/src/lib/dataManager.ts`
4. **Component**: Create `frontend/src/components/[Section].tsx`
5. **Integration**: Add to page with `btn-primary`/`btn-outline-primary` styling

## Established Button Classes

- `btn-primary` - Primary action buttons
- `btn-outline-primary` - Secondary action buttons

Use these consistently across all components for design system consistency.

## Environment Variables Required

```
NEXT_PUBLIC_SANITY_PROJECT_ID=gy4drf5d
NEXT_PUBLIC_SANITY_DATASET=production
```

This system provides full type safety, static generation, and a scalable architecture for adding new sections while maintaining consistency. 