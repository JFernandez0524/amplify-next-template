import { Navigation } from '../components/Navigation';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="main">
        <h1>About Us</h1>
        <p>This is a public about page with server-side rendering.</p>
        <p>This page is accessible to everyone and is SEO-friendly.</p>
      </main>
    </>
  );
}
