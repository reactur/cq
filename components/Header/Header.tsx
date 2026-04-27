import { useRef } from "react";
import TopNav from "../UI/TopNav/TopNav";
import styles from "./Header.module.css";
import { usePageLoaderStore } from "@/utils/hooks/usePageLoader";

const Header = () => {
  const { isPageLoaded } = usePageLoaderStore();
  const headerRef = useRef<HTMLElement>(null);

  // const getImgLink = (pageName: string) => {
  //   if (
  //     pageName.startsWith("/press-release") ||
  //     pageName.startsWith("/case-study")
  //   ) {
  //     return "dark-ocean-logo-blue";
  //   }

  //   switch (pageName) {
  //     case "/about":
  //       return "dark-ocean-logo-blue";
  //     default:
  //       return "dark-ocean-logo";
  //   }
  // };

  // useEffect(() => {
  //   if (isPageLoaded) {
  //     setTimeout(() => {
  //       if (!headerRef.current) return;

  //       headerRef.current.style.visibility = loaderHeader
  //         ? "hidden"
  //         : "visible";
  //     }, 500);
  //   }
  // }, [isPageLoaded]);

  return (
    <header
      ref={headerRef}
      className={styles.Header}
      style={
        isPageLoaded
          ? {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
            }
          : {}
      }
    >
      <img src={`/icons/cq-logo-full.png`} alt="Crayon & Quill" />
      <TopNav onHamburgerOpen={(_) => {}} />
    </header>
  );
};

export default Header;
