import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle } from 'lucide-react';

interface ServiceItem {
  title: string;
  description: string;
  examples?: string[];
}

interface ServiceAccordionProps {
  title: string;
  items: ServiceItem[];
}

const ServiceAccordion = ({ title, items }: ServiceAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="service-accordion-section py-5 bg-light">
      <div className="container">
        <motion.h2
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="accordion-container">
              {items.map((item, index) => {
                const isOpen = openIndex === index;
                
                return (
                  <motion.div
                    key={index}
                    className="accordion-item-custom mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <button
                      className={`accordion-header-custom ${isOpen ? 'active' : ''}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`accordion-content-${index}`}
                    >
                      <span className="accordion-title">{item.title}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={24} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={`accordion-content-${index}`}
                          className="accordion-content-custom"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="accordion-body-custom">
                            <p className="mb-3">{item.description}</p>
                            {item.examples && item.examples.length > 0 && (
                              <ul className="list-unstyled">
                                {item.examples.map((example, i) => (
                                  <li key={i} className="d-flex align-items-start mb-2">
                                    <CheckCircle size={18} className="text-success me-2 mt-1 flex-shrink-0" />
                                    <span>{example}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAccordion;

