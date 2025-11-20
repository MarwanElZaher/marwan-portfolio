// src/app/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about Your Name, a professional web developer with expertise in...',
};

export default function AboutPage() {
  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
      <div className="max-w-3xl mx-auto text-lg text-gray-700 space-y-6">
        <p>
          Hello! My name is [Your Name], and I'm a [Your Profession] with X years of experience
          in building high-quality web applications. My journey into web development began when...
        </p>
        <p>
          I specialize in [list your main tech stack, e.g., React, Next.js, Node.js, TypeScript, Tailwind CSS].
          I'm passionate about creating intuitive user experiences and writing clean, efficient code.
        </p>
        <h3>My Journey & Values</h3>
        <p>
          Over the years, I've had the opportunity to work on diverse projects ranging from...
          I believe in continuous learning, open collaboration, and building products that genuinely solve user problems.
        </p>
        <h3>Skills</h3>
        <ul className="list-disc pl-5">
          <li>**Frontend:** React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, SASS</li>
          <li>**Backend:** Node.js, Express.js, Python, Django, GraphQL, RESTful APIs</li>
          <li>**Databases:** PostgreSQL, MongoDB, MySQL</li>
          <li>**Tools & Platforms:** Git, Docker, AWS, Vercel, Netlify, CI/CD</li>
        </ul>
        <p>
          Feel free to explore my projects or get in touch if you'd like to collaborate!
        </p>
      </div>
    </section>
  );
}