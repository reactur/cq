import Image from "next/image";
import styles from "./FullBgCard.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceShowcaseItemType } from "@/utils/types";

const FullBgCard: React.FC<{ serviceItem: ServiceShowcaseItemType }> = ({
  serviceItem,
}) => {
  return (
    <div className={styles.outerFrame}>
      <Image
        src={serviceItem.imgLink}
        alt="Background"
        fill
        className={styles.backgroundImage}
        priority
      />
      <div className={styles.centerImageWrapper}>
        <Image
          src={serviceItem.imgLink}
          alt="Center"
          width={300} // adjust portrait size
          height={450} // adjust portrait size
          className={styles.centerImage}
        />
      </div>
      <div className={styles.projectDetailsContainer}>
        <h2>Dark Ocean</h2>
        <p>Immersive Underwater Journey</p>
      </div>
    </div>
  );
};

export default FullBgCard;
