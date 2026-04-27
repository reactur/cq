import { Html } from "@react-three/drei";
import styles from "./CircularLoader.module.css";

const CircularLoader = () => {
  return (
    <Html className={styles["loader-wrapper"]}>
      <div className={styles.loader} />
    </Html>
  );
};

export default CircularLoader;
