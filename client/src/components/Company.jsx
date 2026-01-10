import { Helmet } from 'react-helmet-async';

const Company = () => {
  const company = {
    name: 'Rodvers Company Limited',
    url: 'https://rodvers.vercel.app',
    logo: 'https://res.cloudinary.com/dnj7dtnvx/image/upload/v1760456116/listings_app_avatars/dpkpjjogegqnsjvbgx5x.png',
    sameAs: [
      'https://www.linkedin.com/company/rodvers',
      'https://twitter.com/rodvers',
      'https://facebook.com/rodvers'
    ],
    founder: {
      '@type': 'Person',
      name: 'Mugagga Rodgers'
    },
    ceo: {
      '@type': 'Person',
      name: 'Mugagga Rodgers'
    }
  };

  return (
    <section
      id="company"
      className="min-h-screen py-20 px-8 bg-bg-light dark:bg-bg-dark text-text-dark dark:text-text-light relative overflow-hidden"
    >
      <Helmet>
        <title>Founder & CEO — Rodvers Company Limited | Rodgers Mugagga</title>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: company.name,
            url: company.url,
            logo: company.logo,
            sameAs: company.sameAs,
            founder: company.founder,
            employee: [company.ceo]
          })}
        </script>
      </Helmet>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 animate-fade-in-up">
          <p className="text-gray-400 text-sm mb-2 tracking-wider uppercase">Featured Company</p>
          <h2 className="text-4xl font-bold">Rodvers Company Limited</h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
            Founder & CEO: Mugagga Rodgers. Rodvers Company Limited builds digital experiences and
            web solutions for businesses across Uganda and East Africa. Visit the company site to
            learn more about services, case studies, and local partnerships.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <a
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-accent text-white rounded-xl font-semibold hover:-translate-y-1 transition-all"
            >
              Visit Rodvers
            </a>
            <a
              href="mailto:rodgersmugagga84@gmail.com"
              className="px-6 py-3 bg-transparent text-accent border-2 border-accent rounded-xl font-semibold hover:bg-accent hover:text-white transition-all"
            >
              Contact Company
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;
