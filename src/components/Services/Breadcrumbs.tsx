import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="breadcrumb" className="breadcrumbs-container">
      <div className="container">
        <ol className="breadcrumb mb-0 py-3">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <li
                key={index}
                className={`breadcrumb-item ${isLast ? 'active' : ''}`}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.link && !isLast ? (
                  <>
                    <Link to={item.link}>{item.label}</Link>
                    <ChevronRight size={16} className="mx-2 text-muted" />
                  </>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;

