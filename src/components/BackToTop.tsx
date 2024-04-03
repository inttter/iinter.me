import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa6';

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
      className="fixed bottom-6 right-6 bg-neutral-800 hover:bg-neutral-700 duration-300 text-white rounded-full p-2 focus:outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: showScrollButton ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      onClick={scrollToTop}
    >
      <FaArrowUp size={24} />
    </motion.button>
  );
};

export default BackToTop;