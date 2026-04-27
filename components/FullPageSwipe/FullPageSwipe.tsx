import { ServiceShowcaseItemType } from "@/utils/types";
import { cubicBezier, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./FullPageSwipe.module.css";

const sections: ServiceShowcaseItemType[] = [
  {
    title: "Dark Ocean",
    subtitle: "Immersive Underwater Journey",
    imgLink: "/images/do-homepage.png",
  },
  {
    title: "Page Two",
    subtitle: "Cleaning Mosquito Journey",
    imgLink: "/images/dekriminator-home.png",
  },
  {
    title: "Page Three",
    subtitle: "Elegant Design Journey",
    imgLink: "/images/reviewers/user3.jpg",
  },
];

export default function FullPageSwipe() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextPage = useCallback(() => {
    if (page < sections.length - 1 && !animating) {
      setDirection(1);
      setAnimating(true);
      setTimeout(() => setPage((p) => p + 1), 50);
    }
  }, [page, animating]);

  const prevPage = useCallback(() => {
    if (page > 0 && !animating) {
      setDirection(-1);
      setAnimating(true);
      setTimeout(() => setPage((p) => p - 1), 50);
    }
  }, [page, animating]);

  // Wheel handling with debouncing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (animating) return;

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 50) nextPage();
        else if (e.deltaY < -50) prevPage();
      }, 100);
    };

    el.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [animating, nextPage, prevPage]);

  // Handle animation completion
  const handleAnimationComplete = useCallback(() => {
    setAnimating(false);
  }, []);

  const handleAnimationStart = useCallback(() => {
    setAnimating(true);
  }, []);

  return (
    <div className={styles.outer}>
      <div className={styles.sticky} ref={containerRef}>
        {sections.map((sectionItem, index) => {
          const initial = {
            y: "100%",
            filter: "blur(15px)",
            opacity: 0,
            scale: 1.2,
          };

          let position: "previous" | "active" | "next";

          if (index < page) position = "previous";
          else if (index === page) position = "active";
          else position = "next";

          // Fixed animation states
          const states = {
            previous: {
              y: "-100%",
              filter: "blur(15px)",
              opacity: 0,
              scale: 1.2,
              transition: {
                duration: 1.1,
                ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
              },
            },
            active: {
              y: "0%",
              filter: "blur(0px)",
              opacity: 1,
              scale: 1,
              transition: {
                duration: 1.2,
                ease: cubicBezier(0.33, 1, 0.68, 1),
              },
            },
            next: {
              ...initial,
              transition: {
                duration: 1.1,
                ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
              },
            },
          };

          return (
            <motion.div
              key={index}
              className={styles.page}
              custom={direction}
              initial={initial}
              animate={states[position]} // No more error!
              onAnimationStart={handleAnimationStart}
              onAnimationComplete={handleAnimationComplete}
              style={{
                zIndex: sections.length - index,
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src={sectionItem.imgLink}
                alt="Background"
                fill
                className={styles.backgroundImage}
                priority={index === 0}
                unoptimized
              />
              <div className={styles.centerImageWrapper}>
                <Image
                  src={sectionItem.imgLink}
                  alt="Center"
                  width={300}
                  height={450}
                  unoptimized
                  className={styles.centerImage}
                />
              </div>
              <div className={styles.projectDetailsContainer}>
                <h2>{sectionItem.title}</h2>
                <p>{sectionItem.subtitle}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// // Variants with clip-path + blur
// const variants = {
//   enter: (dir: number) => ({
//     y: dir > 0 ? "100%" : "-100%",
//     filter: "blur(20px)",
//     transform: "translateY(-110px) scale(2)",
//     scale: 2,
//     opacity: 0,
//     //   clipPath:
//     //     dir > 0
//     //       ? "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" // hidden bottom
//     //       : "polygon(0 0, 100% 0, 100% 0, 0 0)", // hidden top
//     zIndex: 0,
//   }),
//   center: {
//     y: 0,
//     filter: "blur(0px)",
//     transform: "translateY(0px) scale(1)",
//     scale: 1,
//     opacity: 1,
//     //clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // full viewport
//     zIndex: 1,
//   },
//   exit: (dir: number) => ({
//     y: dir > 0 ? "-100%" : "100%",
//     filter: "blur(20px)",
//     transform: "translateY(-110px) scale(2)",
//     scale: 2,
//     opacity: 0,
//     //   clipPath:
//     //     dir > 0
//     //       ? "polygon(0 0, 100% 0, 100% 0, 0 0)" // exit upward
//     //       : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", // exit downward
//     zIndex: 0,
//   }),
// };

{
  /* <AnimatePresence mode="sync" custom={direction}>
          <motion.div
            key={page}
            className={styles.page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.9, ease: "easeInOut" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (animating) return;
              if (info.offset.y < -100) nextPage();
              if (info.offset.y > 100) prevPage();
            }}
          >
            <Image
              src={sections[page].imgLink}
              alt="Background"
              fill
              className={styles.backgroundImage}
              priority
              unoptimized
            />
            <div className={styles.centerImageWrapper}>
              <Image
                src={sections[page].imgLink}
                alt="Center"
                width={300}
                height={450}
                unoptimized
                className={styles.centerImage}
              />
            </div>
            <div className={styles.projectDetailsContainer}>
              <h2>{sections[page].title}</h2>
              <p>{sections[page].subtitle}</p>
            </div>
          </motion.div>
        </AnimatePresence> */
}
