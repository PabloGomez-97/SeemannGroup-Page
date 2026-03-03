import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Feature {
  icon: React.ReactElement<LucideIcon>;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
}

const FeatureGrid = ({ features, columns = 3 }: FeatureGridProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="service-feature-grid py-5">
      <div className="container">
        <motion.div
          className={`row g-4 row-cols-1 row-cols-md-${columns === 4 ? '2' : columns} row-cols-lg-${columns}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="col"
              variants={itemVariants}
            >
              <div className="feature-card h-100">
                <div className="feature-icon mb-3" style={{ color: '#bd2121' }}>
                  {feature.icon}
                </div>
                <h3 className="feature-title mb-2">{feature.title}</h3>
                <p className="feature-description text-muted mb-0">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGrid;

