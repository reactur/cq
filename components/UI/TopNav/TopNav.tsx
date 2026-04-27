import { motion } from "framer-motion";
import Hamburger from "hamburger-react";
import { useRef, useState } from "react";
import styles from "./TopNav.module.css";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";

const NAV_ANIMATION = {
  closed: {
    width: "100vw",
    transform: "translate3d(0,-200%,0)",
  },
  open: {
    width: "100vw",
    transform: "translate3d(0,0,0)",
  },
};

const navLinks = [
  { path: "/about", label: "About Us" },
  { path: "/services", label: "Services" },
  { path: "/contact", label: "Contact" },
  { path: "/career", label: "Career" },
];

const TopNav: React.FC<{ onHamburgerOpen: (isOpen: boolean) => void }> = ({
  onHamburgerOpen,
}) => {
  const navRef = useRef<HTMLElement | null>(null);
  const isPhoneScreen = useIsPhoneScreen();
  const [isOpen, setIsOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsOpen((prev) => {
      onHamburgerOpen(!prev);
      return !prev;
    });
  };

  return (
    <>
      {isPhoneScreen && (
        <div
          style={{
            marginLeft: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "end",
            zIndex: 10000,
          }}
        >
          <Hamburger
            toggled={isOpen}
            direction="right"
            size={28}
            duration={0.7}
            rounded
            onToggle={handleHamburgerClick}
            color={"white"}
          />
        </div>
      )}

      <motion.nav
        className={styles.Nav}
        initial={isPhoneScreen ? NAV_ANIMATION.closed : {}}
        animate={
          isOpen
            ? NAV_ANIMATION.open
            : isPhoneScreen
            ? NAV_ANIMATION.closed
            : {}
        }
        transition={{ duration: 0.7 }}
        onClick={() => setIsOpen(false)}
        ref={navRef}
      >
        <ul style={{ color: "white" }}>
          {navLinks.map((navItem, index) => (
            <li key={index}>{navItem.label}</li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
};

export default TopNav;
