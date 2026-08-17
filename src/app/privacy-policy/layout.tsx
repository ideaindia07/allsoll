import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — ALLSOLL',
  description:
    'Read how ALLSOLL collects, uses, and protects personal information when you visit our website or work with our branding and digital marketing services in India.',
  alternates: { canonical: '/privacy-policy/' },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
