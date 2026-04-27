import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // now scrollYProgress is relative to .home-page-container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springConfig = { stiffness: 80, damping: 20, mass: 0.5 };

  // --- Text Animations ---
  const text1XRaw = useTransform(scrollYProgress, [0, 1], ["0%", "-250%"]);
  const text1OpacityRaw = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const text1ScaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.8]);
  const text1LetterSpacingRaw = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "180px"]
  );

  const text1X = useSpring(text1XRaw, springConfig);
  const text1Opacity = useSpring(text1OpacityRaw, springConfig);
  const text1Scale = useSpring(text1ScaleRaw, springConfig);
  const text1LetterSpacing = useSpring(text1LetterSpacingRaw, springConfig);

  const text2XRaw = useTransform(scrollYProgress, [0, 1], ["0%", "250%"]);
  const text2OpacityRaw = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const text2ScaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.8]);
  const text2LetterSpacingRaw = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "180px"]
  );

  const text2X = useSpring(text2XRaw, springConfig);
  const text2Opacity = useSpring(text2OpacityRaw, springConfig);
  const text2Scale = useSpring(text2ScaleRaw, springConfig);
  const text2LetterSpacing = useSpring(text2LetterSpacingRaw, springConfig);

  const marginTopRawNextHeading = useTransform(
    scrollYProgress,
    [0, 1],
    ["100vh", "-30vh"]
  );
  const text3LetterSpacingRaw = useTransform(
    scrollYProgress,
    [0, 1],
    ["180px", "0px"]
  );

  // const marginTopNextHeading = useSpring(marginTopRawNextHeading, springConfig);
  // const text3LetterSpacing = useSpring(text3LetterSpacingRaw, springConfig);

  // --- Logo Animations ---

  // const marginTopRaw = useTransform(
  //   scrollYProgress,
  //   [0, 1],
  //   ["100vh", "0vh"]
  // );
  const marginTopRawCircle = useTransform(
    scrollYProgress,
    [0, 1],
    ["50vh", "0vh"]
  );
  //const logoOpacityRaw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const logoOpacityRawCircle = useTransform(
    scrollYProgress,
    [0, 0.8, 0.9, 1],
    [0, 1, 0, 0]
  );
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [0.1, 5]); // scale from 0.5 → 1

  const marginTopCircle = useSpring(marginTopRawCircle, springConfig);
  //const logoOpacity = useSpring(logoOpacityRaw, springConfig);
  const logoOpacityCircle = useSpring(logoOpacityRawCircle, springConfig);
  const scale = useSpring(scaleRaw, springConfig);

  return (
    <div className={styles["home-page-container"]} ref={containerRef}>
      <div className={styles["video-background"]}>
        <video autoPlay loop muted playsInline className={styles["video"]}>
          <source src="/videos/bg-video2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles["hero-text-container"]}>
        <motion.h2
          style={{
            x: text1X,
            opacity: text1Opacity,
            scale: text1Scale,
            letterSpacing: text1LetterSpacing,
            transformPerspective: 1000,
          }}
        >
          Timeless Marketing<span className={styles.blueDot}>.</span>
        </motion.h2>
        <motion.h2
          style={{
            x: text2X,
            opacity: text2Opacity,
            scale: text2Scale,
            letterSpacing: text2LetterSpacing,
            transformPerspective: 1000,
          }}
        >
          Bold Impact<span className={styles.blueDot}>.</span>
        </motion.h2>
      </div>

      {/* <motion.div
        className={styles["cq-logo"]}
        style={{
          marginTop,
          opacity: logoOpacity,
          width: useSpring(
            useTransform(scrollYProgress, [0, 1], [100, 250]),
            springConfig
          ),
          height: useSpring(
            useTransform(scrollYProgress, [0, 1], [100, 250]),
            springConfig
          ),
        }}
      >
        <Image
          src="/icons/cq-logo.svg"
          fill
          style={{ objectFit: "contain" }}
          alt="Crayon and Quill"
        />
      </motion.div> */}

      {/* <motion.h2
        className={styles["next-section-heading"]}
        style={{
          // x: text1X,
          // opacity: text1Opacity,
          // scale: text1Scale,
          // letterSpacing: text1LetterSpacing,
          marginTop: marginTopNextHeading,
          opacity: logoOpacity,
          letterSpacing: text3LetterSpacing,
        }}
      >
        What We Offer
      </motion.h2> */}
      <motion.div
        className={styles["bg-circle"]}
        style={{
          marginTop: marginTopCircle,
          opacity: logoOpacityCircle,
          scale,
          x: "-50%",
          y: "-50%",
        }}
      />
    </div>
  );
};

export default HomePage;
