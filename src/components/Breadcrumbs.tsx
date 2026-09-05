import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  if (pathnames.length === 0) return null;

  const breadcrumbs: BreadcrumbItem[] = pathnames.map((name, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;
    // Humanize labels
    const label = name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
      
    return { label, path, isLast };
  });

  // Home item
  const allItems = [
    { label: 'Home', path: '/', isLast: false },
    ...breadcrumbs
  ];

  // Generate JSON-LD for AI visibility
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": window.location.origin + item.path
    }))
  };

  return (
    <nav className="flex px-4 py-2 text-sm text-gray-500 bg-gray-50/50 rounded-lg backdrop-blur-sm mb-6 max-w-fit" aria-label="Breadcrumb">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
        {allItems.map((item, index) => (
          <li key={item.path} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
            {item.isLast ? (
              <span className="font-medium text-amber-900 truncate max-w-[150px] md:max-w-none">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="inline-flex items-center hover:text-amber-700 transition-colors"
              >
                {index === 0 && <Home className="w-4 h-4 mr-1.5" />}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
