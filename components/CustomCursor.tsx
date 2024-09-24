import { useEffect, useState, useRef } from 'react';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const mousePositionRef = useRef({ x: 0, y: 0 }); // Reference to store the last known mouse position
  const pullingEffect = useRef(0.3); // Adjust this for stronger/weaker pulling effect
  const animationFrameId = useRef(0); // Reference for animation frame ID

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.pageX, y: e.pageY }; // Update mouse position on move
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId.current); // Cleanup on component unmount
    };
  }, []);

  useEffect(() => {
    const followMouse = () => {
      setFollowerPosition((prev) => {
        const target = mousePositionRef.current; // Get the last known cursor position
        const deltaX = target.x - prev.x - 10; // Difference in x position
        const deltaY = target.y - prev.y - 80; // Difference in y position

        // Calculate new position with easing effect
        const newX = prev.x + deltaX * pullingEffect.current; // Easing towards cursor
        const newY = prev.y + deltaY * pullingEffect.current; // Easing towards cursor

        return {
          x: newX,
          y: newY,
        };
      });

      animationFrameId.current = requestAnimationFrame(followMouse); // Continue updating
    };

    followMouse();
  }, []);

  return (
    <div
      className={styles.cursorFollower}
      style={{
        transform: `translate3d(${followerPosition.x}px, ${followerPosition.y}px, 0)`,
      }}
    ></div>
  );
};

export default CustomCursor;
