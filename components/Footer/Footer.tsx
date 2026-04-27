import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <img
            className={styles["footer-logo"]}
            src={`/icons/cq-logo-full.png`}
            alt="Crayon & Quill"
          />
          <p className={styles.description}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
            odit, voluptate totam, possimus saepe eum quasi odit cum, iusto
            cumque blanditiis excepturi praesentium cupiditate! Neque.
          </p>
          <p className={styles.copy}>
            © 2025 Crayon & Quill. All Rights reserved.
          </p>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>Links</h4>
          <ul>
            <li>Home</li>
            <li>Get Started</li>
            <li>Services</li>
            <li>Portfolio</li>
            <li>Corporate</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>Others</h4>
          <ul>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Something goes here</li>
            <li>Portfolio</li>
            <li>Corporate</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>Others</h4>
          <p className={styles.socialText}>Follow us on Social Media</p>
          <div className={styles.socialIcons}>
            <Facebook size={18} />
            <Instagram size={18} />
            <Twitter size={18} />
            <Youtube size={18} />
            <Linkedin size={18} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
