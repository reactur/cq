// components/PageLoader.tsx
import { useEffect, useState } from "react";
import styles from "./PageLoader.module.css";
import { usePageLoaderStore } from "@/utils/hooks/usePageLoader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const PageLoader = () => {
  const [animate, setAnimate] = useState(false);

  const { setIsLoaded } = usePageLoaderStore();
  //const { progress, loaded } = useProgress();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 600);

    const finishTimeout = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => {
      clearTimeout(timeout);
      clearTimeout(finishTimeout);
    };
    // if (!loaded) {
    //   setAnimate(true);
    // } else {
    //   setIsLoaded(true);
    // }
  }, []);

  return (
    <div className={`${styles.loader} ${animate ? styles.animate : ""}`}>
      <div className={styles.headerBlindDummy}></div>
      <div
        className={styles.headerBlind}
        // /style={isPageLoaded ? { opacity: 0 } : {}}
      >
        <Header />
      </div>
      <div className={styles.footerBlind}>
        <Footer />
      </div>
    </div>
  );
};

export default PageLoader;
