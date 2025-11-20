import { portfolioData } from '../content/portfolio-data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-glass-border py-12 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2 text-foreground">Marwan ElZaher</h3>
            <p className="text-muted text-sm">
              Building digital experiences that matter.
            </p>
          </div>

          <div className="flex space-x-6">
            {Object.entries(portfolioData.personal.socials).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary capitalize transition-colors"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-glass-border text-center text-muted/80 text-sm">
          © {currentYear} Marwan ElZaher. All rights reserved.
        </div>
      </div>
    </footer>
  );
}