import SegmentedCircle from "@/components/SegmentedCircle/SegmentedCircle";
import CircularLoader from "@/components/UI/CircularLoader/CircularLoader";
import LightRays from "@/components/UI/ThreeD/LightRays/LightRays";
import MorphingObject from "@/components/UI/ThreeD/MorphingObject";
import { Canvas } from "@react-three/fiber";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import styles from "./Services.module.css";

function smoothScrollTo(targetY: number, duration = 600) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const time = timestamp - startTime;
    const t = Math.min(1, time / duration);
    const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut
    window.scrollTo(0, startY + diff * eased);
    if (t < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

const defaultColors = [
  "#E57373", // soft red
  "#FFD54F", // muted gold
  "#81C784", // gentle green
  "#64B5F6", // soft blue
  "#9575CD", // elegant violet
  "#FFB74D", // warm amber
  "#4DD0E1", // teal/cyan accent
];

// const servicesList = [
//   "Brand Strategy",
//   "Social Media Marketing",
//   "Search Engine Optimization",
//   "Web Development",
//   "Electronic Commerce",
//   "Performance Marketing",
//   "Influencer Marketing",
// ];

const servicesList = [
  { part1: "Brand", part2: "Strategy" },
  { part1: "Social Media", part2: "Marketing" },
  { part1: "Search Engine", part2: "Optimization" },
  { part1: "Web", part2: "Development" },
  { part1: "Electronic", part2: "Commerce" },
  { part1: "Performance", part2: "Marketing" },
  { part1: "Influencer", part2: "Marketing" },
];

const Services = () => {
  const servicesSectionRef = useRef<HTMLElement>(null);
  const circleSegments = 7;

  const { scrollYProgress } = useScroll({
    target: servicesSectionRef,
    offset: ["start start", "end end"],
  });

  const [activeSegment, setActiveSegment] = useState(0);

  // Track scroll and update active segment
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const stepSize = 1 / circleSegments;
      const newIndex = Math.min(
        circleSegments - 1,
        Math.floor(latest / stepSize)
      );
      setActiveSegment(newIndex);
    });
  }, [scrollYProgress, circleSegments]);

  // Scroll to segment when clicked
  const handleSegmentClick = (index: number) => {
    setActiveSegment(index);

    if (!servicesSectionRef.current) return;

    const section = servicesSectionRef.current;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    const stepSize = sectionHeight / circleSegments;
    const scrollTarget =
      index === 0
        ? sectionTop + 450 // offset to keep section in view
        : sectionTop + stepSize * index;

    smoothScrollTo(scrollTarget, 800); // duration in ms
  };

  const getModifiedServiceName = (partType: "part1" | "part2") => {
    const name =
      partType === "part1"
        ? servicesList[activeSegment].part1
        : servicesList[activeSegment].part2;

    return (
      <AnimatePresence mode="wait">
        <motion.h2
          key={activeSegment}
          initial={{ y: -40, filter: "blur(10px)", color: "white" }}
          animate={{
            y: 0,
            filter: "blur(0px)",
            color: defaultColors[activeSegment],
          }}
          exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
          transition={{ duration: 0.7 }}
          className={
            partType === "part1" ? styles.wordFirst : styles.wordSecond
          }
        >
          {name}
        </motion.h2>
      </AnimatePresence>
    );
  };

  // Animations for heading
  const marginTop = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["100vh", "-30vh"]
  );
  const letterSpacing = useTransform(
    scrollYProgress,
    [0, 0.15],
    ["180px", "0px"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 0.05]);

  const rotationRaw = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const rotation = useSpring(rotationRaw, { stiffness: 100, damping: 25 });

  return (
    <section
      role="region"
      aria-labelledby="services"
      className={styles["services-container"]}
      ref={servicesSectionRef}
    >
      <motion.div className={styles["services-circle-container"]}>
        {
          <div
            style={{
              width: "100%",
              height: "100dvh",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 5,
              mixBlendMode: "lighten",
              pointerEvents: "none",
              transition: "all 0.5s ease-in-out",
              opacity: 0.7,
              //opacity: scrollYProgress.get() > 0.01 ? 1 : 0,
            }}
          >
            <LightRays
              raysOrigin="top-center"
              raysColor={defaultColors[activeSegment]}
              raysSpeed={1.5}
              lightSpread={0.8}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0.1}
              distortion={0.05}
              className="custom-rays"
            />
          </div>
        }
        <Canvas
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={<CircularLoader />}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[11.5, 5, 1]} intensity={1.5} />
            {/* <pointLight position={[0, 2, 10]} intensity={1} color={"#88ccff"} /> */}

            <MorphingObject />
          </Suspense>
        </Canvas>
        <AnimatePresence>
          <motion.div
            key={activeSegment} // triggers re-animation on segment change
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 12, opacity: 0.5 }}
            exit={{ scale: 12, opacity: 0 }} // fade out after expansion
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              backgroundColor: defaultColors[activeSegment],
              pointerEvents: "none",
              mixBlendMode: "color-dodge",
            }}
          />
        </AnimatePresence>
        {/* <AnimatePresence>
          <motion.div
            key={activeSegment} // triggers re-animation on segment change
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 12, opacity: 0.1 }}
            exit={{ scale: 12, opacity: 0 }} // fade out after expansion
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              backgroundColor: defaultColors[activeSegment],
              pointerEvents: "none",
            }}
          />
        </AnimatePresence> */}

        {servicesList.map((serviceItem, index) => (
          <motion.div
            key={index}
            initial={{ y: -40, filter: "blur(10px)", opacity: 0 }}
            animate={{
              y: index === activeSegment ? 0 : -40,
              filter: "blur(0px)",
              color: defaultColors[activeSegment],
              opacity: index === activeSegment ? 1 : 0,
            }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{ duration: 0.7 }}
            className={styles.serviceNameContainer}
          >
            <h2 className={styles.wordFirst}>{serviceItem.part1}</h2>
            <h2 className={styles.wordSecond}>{serviceItem.part2}</h2>
          </motion.div>
        ))}
        {/* {servicesList.map((serviceItem, index) => (
          <motion.h2
            key={index}
            initial={{ y: -40, filter: "blur(10px)", opacity: 0 }}
            animate={{
              y: index === activeSegment ? 0 : -40,
              filter: "blur(0px)",
              color: defaultColors[activeSegment],
              opacity: index === activeSegment ? 0.8 : 0,
            }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{ duration: 0.7 }}
            className={styles.wordFirst}
          >
            {serviceItem.part1}
          </motion.h2>
        ))}
        {servicesList.map((serviceItem, index) => (
          <motion.h2
            key={index}
            initial={{ y: 40, filter: "blur(10px)", opacity: 0 }}
            animate={{
              y: index === activeSegment ? 0 : 40,
              filter: "blur(0px)",
              color: defaultColors[activeSegment],
              opacity: index === activeSegment ? 0.2 : 0,
            }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{ duration: 0.7 }}
            className={styles.wordSecond}
          >
            {serviceItem.part2}
          </motion.h2>
        ))} */}

        {/* <div className={styles["service-name-container"]}>
          {getModifiedServiceName("part1")}
          {getModifiedServiceName("part2")}
        </div> */}
        <SegmentedCircle
          className={styles["services-circle"]}
          size={400}
          thickness={0.02}
          activeIndex={activeSegment}
          parts={circleSegments}
          onSegmentClick={handleSegmentClick}
          rotation={rotation}
        />
      </motion.div>
    </section>
  );
};
export default Services;

{
  /* <motion.h2
        className={styles["section-heading"]}
        style={{
          marginTop,
          opacity,
          letterSpacing,
        }}
      >
        What We Offer
      </motion.h2> */
}

{
  /* <Image
          src="/images/bg.jpg"
          alt="Background"
          fill
          style={{
            objectFit: "cover",
            opacity: 0.3, // change this dynamically as needed
            zIndex: -2, // behind everything
          }}
          priority
        /> */
}

{
  /* <div
        style={{
          width: "100%",
          height: "100dvh",
          position: "sticky",
          left: 0,
          top: 0,
          zIndex: 5,
          mixBlendMode: "lighten",
          pointerEvents: "none",
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor={defaultColors[activeSegment]}
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div> */
}
