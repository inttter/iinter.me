import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 150) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showScrollButton) {
    return null;
  }

  return (
    <motion.button
      className="fixed bottom-6 right-6 text-soft p-2 bg-neutral-800 hover:bg-soft-gray border-2 border-neutral-800 hover:border-neutral-700 rounded-full duration-300 flex items-center tooltip tooltip-left hover:cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: showScrollButton ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      data-tip="Back To Top"
      data-theme="bumblebee"
      aria-label="Back To Top Button"
    >
      <ArrowUp />
    </motion.button>
  );
};

export default BackToTop;