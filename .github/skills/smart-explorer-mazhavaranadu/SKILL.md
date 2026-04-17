---
name: smart-explorer-mazhavaranadu-app
description: "Use when building or updating the Smart Explorer Mazhavaranadu React app with a responsive desktop navbar, mobile sidebar, React Three Fiber scene, Framer Motion animations, and reusable feature sections."
---

# Smart Explorer Mazhavaranadu App

## Goal

Build a modern, mobile-first React web application for Smart Explorer Mazhavaranadu that highlights featured places, categories, and gallery content with a strong regional identity.

## Workflow

1. Inspect the existing Vite React structure before changing files.
2. Confirm the page map and decide where each section belongs:
   - Home: hero, 3D scene, featured places, categories, gallery
   - Explore: location-focused discovery content
   - Categories: temples, nature, food, culture
   - About: project story and region context
   - Contact: user inquiry or support details
3. Keep the component tree reusable and small.
4. Implement responsive navigation with desktop and mobile variants.
5. Add a performant 3D section using React Three Fiber only where it improves the homepage.
6. Lazy-load heavy sections and keep assets optimized.
7. Validate the UI at mobile and desktop breakpoints before finishing.

## Required UI Decisions

- Use a top navigation bar on desktop.
- Use a hamburger-driven sidebar on mobile.
- Keep sidebar transitions smooth and lightweight.
- Use cards for places, categories, and gallery items.
- Favor clean spacing, readable typography, and clear visual hierarchy.

## Component Boundaries

- Navbar: desktop navigation and mobile toggle trigger.
- Sidebar: mobile drawer navigation and close behavior.
- HeroSection: landing message, call to action, and quick regional context.
- ThreeScene: lazy-loaded 3D showcase section.
- Card: reusable place/category/gallery card.
- FeaturedPlaces, CategoriesSection, GallerySection: data-driven content sections.

## Implementation Rules

- Use functional components and React hooks.
- Prefer composition over duplicated markup.
- Keep CSS modular and scoped by feature when possible.
- Do not let the 3D scene block first render.
- Optimize images with appropriate sizing and lazy loading.
- Use Framer Motion only for purposeful transitions and reveals.

## Quality Checklist

- Navigation works on both desktop and mobile.
- Sidebar opens, closes, and animates correctly.
- 3D content loads without hurting basic usability.
- All major sections are responsive and visually consistent.
- Featured places, categories, and gallery data render from reusable structures.
- The page feels intentional, not like a default starter template.

## Output Expectation

When using this skill, produce clean code, clear file organization, and concise comments only where the logic is not obvious.