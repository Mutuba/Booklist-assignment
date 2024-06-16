import React from "react";
import { motion } from "framer-motion";
import { useCoverPhotoURL } from "../../../useCoverPhotoURL";

const EmptyReadingListIcon: React.FC = () => {
  const DancingBook = useCoverPhotoURL("DancingKidIcon.svg");

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <img src={DancingBook} alt="Dancing Kid Icon" width={150} height={150} />
    </motion.div>
  );
};

export default EmptyReadingListIcon;
