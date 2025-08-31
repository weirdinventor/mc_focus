import { Colors } from './../../../constants/Colors';
import  { useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

const CONTAINER_WIDTH = 50;
const INNER_WIDTH = 30;
const MAX_STEPS = 3;

interface TutorialSegmentProps {
  step: number;
}

export const TutorialSegment = ({ step }: TutorialSegmentProps) => {
  const stepSize = (CONTAINER_WIDTH - INNER_WIDTH) / (MAX_STEPS - 1);

  const translateX = useMotionValue(0);

  useEffect(() => {
    const targetPosition = stepSize * step;
    animate(translateX, targetPosition, { duration: 0.3 });
  }, [step]);

  return (
    <div style={styles.mainContainer}>
      <motion.div
        style={{
          ...styles.movableSegment,
          x: translateX,
        }}
      />
    </div>
  );
};

const styles = {
  mainContainer: {
    width: CONTAINER_WIDTH,
    height: 8,
    backgroundColor: Colors.black30,
    alignSelf: 'center',
    borderRadius: 16,
  },
  movableSegment: {
    width: INNER_WIDTH,
    height: 8,
    backgroundColor: Colors.white,
    borderRadius: 16,
  },
};