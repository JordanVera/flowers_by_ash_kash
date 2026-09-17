import Admin from '@/components/florist/admin';
import { siteConfig as c } from '@/siteConfig';
import { notFound } from 'next/navigation';
export const metadata = {
  title: 'Studio orders',
  robots: { index: false, follow: false },
};
export default function Page() {
  if (!c.hasEcommerce) notFound();
  return (
    <section className="section page-section">
      <p className="eyebrow">FOR THE STUDIO</p>
      <h1>Flowers on their way.</h1>
      <Admin />
    </section>
  );
}
