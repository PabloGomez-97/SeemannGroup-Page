import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Step {
  icon: React.ReactElement<LucideIcon>;
  title: string;
  description: string;
  duration?: string;
}

interface ProcessStepsProps {
  title?: string;
  steps: Step[];
}

const ProcessSteps = ({
  title = "Nuestro proceso de trabajo",
  steps,
}: ProcessStepsProps) => {
  return (
    <section className="process-steps-section py-5 bg-light">
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

        <div className="row g-4">
          {steps.map((step, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <motion.div
                className="process-step-card h-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <div className="step-icon text-danger mb-3">{step.icon}</div>
                <h3 className="step-title h5 mb-2">{step.title}</h3>
                <p className="step-description text-muted mb-2">
                  {step.description}
                </p>
                {step.duration && (
                  <span className="step-duration badge bg-light text-dark">
                    {step.duration}
                  </span>
                )}
                {index < steps.length - 1 && (
                  <div className="step-connector d-none d-lg-block" />
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
