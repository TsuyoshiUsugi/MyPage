import { defineCollection, z } from 'astro:content';
import experienceCollection from './experience';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    priority: z.number().default(0),
    tags: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
  }),
});

const worksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['game', 'web', 'other']),
    date: z.date(),
    priority: z.number().default(0),
    technologies: z.array(z.string()),
    image: z.string().optional(),
    github: z.string().optional(),
    demo: z.string().optional(),
    status: z.enum(['published', 'draft', 'coming-soon']).default('published'),
  }),
});

export const collections = {
  blog: blogCollection,
  works: worksCollection,
  experience: experienceCollection,
};