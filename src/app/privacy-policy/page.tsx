import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/ui/SmoothScroll';

const sections = [
  {
    title: '1. Introduction',
    body: [
      'ALLSOLL ("we", "our", or "us") operates the website at allsoll.com and provides branding, marketing, and digital services to clients across India and internationally.',
      'This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, contact us, or engage with our services.',
      'By using our website, you agree to the collection and use of information in accordance with this policy.',
    ],
  },
  {
    title: '2. Information We Collect',
    body: [
      'We may collect information that you voluntarily provide, including your name, email address, phone number, company name, and any message you submit through our contact forms or email.',
      'We may automatically collect certain technical data when you visit our site, such as your IP address, browser type, device information, pages viewed, referring URLs, and general usage data through cookies and analytics tools.',
    ],
  },
  {
    title: '3. How We Use Your Information',
    body: [
      'We use collected information to respond to inquiries, provide services, improve our website, analyze performance, communicate with you, and maintain the security of our platform.',
      'We may also use aggregated or anonymized data for internal reporting, marketing insights, and service optimization.',
    ],
  },
  {
    title: '4. Cookies & Analytics',
    body: [
      'Our website uses cookies and similar technologies to understand visitor behavior and improve user experience. We use Google Analytics to measure traffic and engagement on our site.',
      'You can control or disable cookies through your browser settings. Please note that disabling cookies may affect certain website functionality.',
    ],
  },
  {
    title: '5. Sharing of Information',
    body: [
      'We do not sell your personal information. We may share data with trusted service providers who assist us in operating our website, analytics, hosting, communication, or business operations — only to the extent necessary and under appropriate confidentiality obligations.',
      'We may also disclose information if required by law, regulation, legal process, or to protect the rights, property, or safety of ALLSOLL, our users, or others.',
    ],
  },
  {
    title: '6. Data Retention',
    body: [
      'We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.',
      'When information is no longer needed, we take reasonable steps to delete or anonymize it.',
    ],
  },
  {
    title: '7. Data Security',
    body: [
      'We implement reasonable administrative, technical, and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.',
      'However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    title: '8. Your Rights',
    body: [
      'Depending on applicable law, you may have the right to request access to, correction of, or deletion of your personal information, or to object to or restrict certain processing activities.',
      'To exercise these rights, please contact us using the details below. We will respond within a reasonable timeframe.',
    ],
  },
  {
    title: '9. Third-Party Links',
    body: [
      'Our website may contain links to third-party websites or platforms, such as social media profiles. We are not responsible for the privacy practices or content of those external sites.',
      'We encourage you to review the privacy policies of any third-party sites you visit.',
    ],
  },
  {
    title: '10. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.',
      'Your continued use of the website after changes are posted constitutes acceptance of the revised policy.',
    ],
  },
  {
    title: '11. Contact Us',
    body: [
      'If you have questions about this Privacy Policy or how we handle your data, contact us at:',
      'Email: tanishka@allsoll.com',
      'Company: ALLSOLL — An IDEA India Product',
      'Location: Jaipur, Rajasthan, India',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <SmoothScroll>
      <Header />

      <main className="relative w-full overflow-x-hidden bg-bg-primary">
        <section className="relative px-[6%] pb-16 pt-36 md:px-[8%] md:pt-44">
          <div className="mx-auto max-w-[900px]">
            <span className="mb-6 block font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              // Legal
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tighter text-white md:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-6 font-body text-base leading-relaxed text-text-secondary md:text-lg">
              Effective date: August 17, 2026
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-text-secondary md:text-lg">
              This policy describes how ALLSOLL handles personal information when you use our website
              and services.
            </p>
          </div>
        </section>

        <section className="border-t border-border-custom px-[6%] py-16 md:px-[8%] md:py-24">
          <div className="mx-auto max-w-[900px] space-y-14">
            {sections.map((section) => (
              <article key={section.title}>
                <h2 className="mb-5 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="font-body text-base leading-relaxed text-text-secondary md:text-[17px]"
                    >
                      {paragraph.startsWith('Email:') ? (
                        <>
                          Email:{' '}
                          <a
                            href="mailto:tanishka@allsoll.com"
                            className="text-accent hover:underline"
                          >
                            tanishka@allsoll.com
                          </a>
                        </>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border-custom px-[6%] py-16 text-center md:px-[8%]">
          <p className="font-body text-sm text-text-secondary">
            Questions about your data?{' '}
            <Link href="/contact/" className="text-accent hover:underline">
              Contact us
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
