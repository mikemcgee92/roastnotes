import { Inter } from 'next/font/google';
import PropTypes from 'prop-types';
import ClientProvider from '@/utils/context/ClientProvider';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

// You can manage the metadata, tab content and info about your app dynamically using this. It will work on every page in your app:
export const generateMetadata = async ({ params }) => ({
  title: `RoastNotes ${params.slug || ''}`, // Dynamically set the title using route parameters
  description: `A coffee logging app`, // Dynamic description
  // Add other metadata fields as needed, like keywords, open graph tags, etc.
  keywords: [`${params.slug}`, 'coffee', 'roast'],
  openGraph: {
    title: `RoastNotes`,
    description: `A coffee journal for brew connoisseurs`,
  },
});
