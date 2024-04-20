import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaA, FaArrowUp } from 'react-icons/fa6';

const BackToTop = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
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

  return (
    <motion.button
      className="fixed bottom-6 right-6 text-neutral-600 hover:text-neutral-500 p-2 bg-neutral-900 rounded-md duration-300 border border-neutral-800 flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: showScrollButton ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      onClick={scrollToTop}
    >
      back to top <FaArrowUp className="ml-1" />
    </motion.button>
  );
};

export default BackToTop;