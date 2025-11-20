export interface Project {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}
export const projects: Project[] = [
  {
    slug: 'project-a',
    title: 'E-commerce Storefront',
    description: 'A full-stack e-commerce application built with Next.js, React, and Stripe for payments.',
    imageUrl: '/projects/ecommerce.jpg',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Node.js'],
    githubUrl: 'https://github.com/yourusername/ecommerce-store',
    liveUrl: 'https://ecommerce.yourwebsite.com',
  },
  {
    slug: 'project-b',
    title: 'Personal Blog Platform',
    description: 'A dynamic blog using Next.js and a headless CMS (e.g., Sanity.io) for content.',
    imageUrl: '/projects/blog.jpg',
    tags: ['Next.js', 'React', 'Sanity.io', 'GraphQL', 'MDX'],
    githubUrl: 'https://github.com/yourusername/personal-blog',
    liveUrl: 'https://blog.yourwebsite.com',
  },
  // Add more projects
];
