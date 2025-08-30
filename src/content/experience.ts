import { defineCollection, z } from 'astro:content';

const experienceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    current: z.boolean().default(false),
    description: z.string(),
    skills: z.array(z.string()).optional(),
    priority: z.number().default(0),
  }),
});

export default experienceCollection;