# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MyPage is a portfolio website built with Astro, featuring a dark theme design. The site includes a tech blog, works showcase, YouTube playlist integration, and is optimized for GitHub Pages deployment with AdSense integration capability.

## Technology Stack

- **Astro 4.13.1** - Static site generator with TypeScript support
- **GitHub Pages** - Hosting platform
- **GitHub Actions** - CI/CD and playlist automation
- **YouTube Data API v3** - For playlist integration
- **Noto Sans JP** - Primary font

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Type check
npx astro check
```

## Project Architecture

### Directory Structure
- `src/pages/` - Route pages (index, about, privacy, blog, works)
- `src/layouts/` - Layout components (BaseLayout.astro)
- `src/components/` - Reusable components (PostCard, NowPlaylist, GameEmbed)
- `src/content/` - Markdown content collections (blog posts)
- `public/` - Static assets, Unity WebGL builds, playlist data
- `.github/workflows/` - GitHub Actions for deployment and playlist updates

### Key Components
- **BaseLayout**: Dark theme layout with sticky header, responsive navigation
- **PostCard**: Blog post cards with tags and meta information
- **NowPlaylist**: YouTube playlist display (5 most recent items)
- **GameEmbed**: Unity WebGL game embedding with fullscreen support

### Content Management
- Blog posts: Markdown files in `src/content/blog/` with frontmatter schema
- Works: Individual pages in `src/pages/works/` with project details
- Playlist: Auto-updated JSON file at `public/data/playlist.json`

## Design System

Dark theme with consistent color variables:
- Primary background: `#0f1115`
- Primary text: `#e6e6e6`
- Secondary text: `#9aa0a6`
- Accent color: `#8ab4f8`
- Border color: `#2d3748`

## GitHub Actions Workflows

### Deploy (`deploy.yml`)
- Triggers on push to master branch
- Builds Astro site and deploys to GitHub Pages
- Uses Node.js 18 and standard Pages deployment action

### Playlist Update (`update-playlist.yml`)
- Runs every 30 minutes via cron schedule
- Fetches YouTube playlist data using API
- Commits updates to `public/data/playlist.json`
- Requires secrets: `YOUTUBE_API_KEY`, `YOUTUBE_PLAYLIST_ID`

## Adding Content

### Blog Posts
1. Create `.md` file in `src/content/blog/`
2. Include required frontmatter: `title`, `description`, `pubDate`, optional `tags`, `ogImage`
3. Content automatically appears in blog listing and RSS

### Unity WebGL Games
1. Place Unity WebGL build in `public/works/[game-name]/`
2. Create detail page at `src/pages/works/[game-name].astro`
3. Use `GameEmbed` component for iframe embedding
4. Ensure Decompression Fallback is enabled in Unity build

### YouTube Playlist
- Configure API credentials in GitHub repository secrets
- Playlist automatically updates every 30 minutes
- Data structure: `id`, `title`, `channelTitle`, `thumbnail`, `publishedAt`, `videoId`

## Performance Requirements
- Target Lighthouse mobile score: 80+
- Images use `loading="lazy"` attribute
- OGP meta tags for social sharing
- Responsive design for mobile devices

## Repository Information
- **Remote**: git@github.com:TsuyoshiUsugi/MyPage.git
- **Main Branch**: master
- **Deployment**: Automatic via GitHub Actions to GitHub Pages

## Claude Code Workflow
When making changes to the codebase, Claude should follow this workflow:
1. Create a new feature branch for the work
2. Make necessary code changes
3. Test the changes (build, type check, etc.)
4. Create a pull request with descriptive title and summary
5. Include test plan in the PR description

This ensures proper version control and code review process for all changes.