# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is an Astro-based project using React components and Tailwind CSS with npm scripts:

- **Development server**: `npm run dev`
- **Build**: `npm run build`
- **Preview build**: `npm run preview`
- **Type checking**: `npm run check`
- **Add integrations**: `npm run add [integration-name]`

## Architecture Overview

This is a Spanish container rental marketplace landing page built as an Astro static site with React islands architecture.

### Technology Stack
- **Framework**: Astro v5 with static output
- **UI Components**: Mix of Astro components (.astro) and React components (.jsx)
- **Styling**: Tailwind CSS v4 + custom CSS in `src/styles/components.css`
- **Database**: Supabase (PostgreSQL with real-time subscriptions)
- **Fonts**: Montserrat (headings) and Open Sans (body text)

### Project Structure
- **Pages**: Single-page application with `src/pages/index.astro` as the main entry point
- **Components**: Located in `src/components/` - mix of Astro and React components
- **Layouts**: Base layout in `src/layouts/Layout.astro` with SEO, meta tags, and global styles
- **Styles**: Global CSS variables and component styles in `src/styles/components.css`
- **Database**: 
  - Client-side Supabase configuration in `src/lib/supabase.js`
  - Server-side Supabase configuration with service role in `src/lib/supabase-server.js`
- **API Routes**: Located in `src/pages/api/` for server-side operations

### Component Architecture
The main page (`index.astro`) imports and renders components in this order:
1. `Hero.astro` - Landing hero with registration counter
2. `ValueProposition.astro` - Value proposition section
3. `RegistrationForm.jsx` - React form component with client-side interaction
4. `SocialProof.jsx` - Stats and activity display with React state
5. `Benefits.astro` - Static benefits section
6. `PriceSimulator.jsx` - Interactive pricing calculator with React state
7. `Timeline.astro` - Launch timeline
8. `FAQ.astro` - Frequently asked questions
9. `Footer.astro` - Site footer

### React Islands
React components are hydrated with `client:load` directive for interactivity:
- Form validation and submission
- Dynamic pricing calculation
- Real-time counters and activity feeds

### Styling System
- CSS custom properties defined in Layout.astro (:root)
- Tailwind config in `tailwind.config.cjs` with custom color palette
- Component-specific styles in `src/styles/components.css`
- Color scheme: Primary (#FF6B35), Secondary (#2E86AB), with semantic colors for success/warning/error states

### Key Features
- SEO optimized with structured data and Open Graph tags
- Mobile-responsive design
- Spanish language content targeting Sevilla container rental market
- Registration flow with form validation
- Interactive price simulator
- Social proof elements with simulated activity

### API Routes
- **POST /api/registrations** - Save user registrations to database using service role
- **GET /api/stats** - Get registration statistics and counts

### Development Notes
- Components use semantic HTML and ARIA attributes for accessibility
- Images sourced from Unsplash with proper attribution
- Google Analytics placeholder (GA_MEASUREMENT_ID needs configuration)
- API routes use Supabase service role key for server-side database operations
- Environment variables required: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY