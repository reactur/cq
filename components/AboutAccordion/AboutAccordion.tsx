import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import Image from "next/image";
import { useState } from "react";
import styles from "./AboutAccordion.module.css";

const aboutUsList = [
  {
    heading: "Who are we?",
    subheading: "",
    description:
      "At Crayon & Quill, we're passionate about empowering individuals like you to thrive in the fast-paced world of technology. With years of industry experience and a commitment to excellence, we've curated a range of courses designed to equip you with the skills and knowledge you need to succeed.",
  },
  {
    heading: "Why choose us?",
    subheading: "",
    description:
      "Because we understand the challenges you face in mastering complex technical concepts. Our courses are crafted with your learning journey in mind, blending theory with hands-on practice and real-world projects to ensure you not only grasp the material but also gain practical experience.",
  },
  {
    heading: "How can we help?",
    subheading: "",
    description:
      "Whether you're a beginner looking to kickstart your tech career or a seasoned professional seeking to upskill, we offer tailored courses that cater to your needs. With our supportive community, expert instructors, and cutting-edge curriculum, we're here to guide you every step of the way.",
  },
];

const AboutAccordion: React.FC<{ className?: string }> = ({ className }) => {
  const [activeSectionId, setActiveSectionId] = useState<null | number>(null);
  const isPhoneScreen = useIsPhoneScreen();

  // useEffect(() => {
  //   setActiveSectionId(0);
  // }, []);

  const getDescription = (
    title: string,
    description: string,
    sectionId: number
  ) => {
    if (activeSectionId !== null && sectionId === activeSectionId) {
      return (
        <>
          <div
            className={styles["about-services-section-description-container"]}
            style={getDescriptionStyle(sectionId)}
          >
            <div className={styles["about-services-section-circle-container"]}>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  className={styles["about-services-section-circle"]}
                  key={index}
                />
              ))}
            </div>
            <div className={styles["about-services-section-description"]}>
              {/* <h2>{title}</h2> */}
              {sectionId === 0 && (
                <div className={styles["founder-images-container"]}>
                  {Array.from({ length: 2 }).map((_, index) => {
                    const name = index === 0 ? "John Doe" : "Foe Snow";

                    return (
                      <div
                        className={styles["founder-image-item-container"]}
                        key={index}
                      >
                        <div className={styles["founder-image-holder"]}>
                          <Image
                            src={`/images/founder-${index + 1}.jpg`}
                            alt={name}
                            fill
                          />
                        </div>
                        <p>{name}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              <p>{description}</p>
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };

  const getDescriptionStyle = (sectionId: number) => {
    if (activeSectionId !== null && sectionId === activeSectionId) {
      return { padding: isPhoneScreen ? "12rem" : "5rem" };
    } else {
      return {};
    }
  };

  const getSectionStyle = (sectionId: number, zIndex: number) => {
    if (activeSectionId !== null && sectionId === activeSectionId) {
      return {
        backgroundColor: "var(--primary-dark)",
        color: "white",
        flex: 1,
        zIndex,
      };
    } else if (activeSectionId === null) {
      return {
        width: "100%",
        zIndex,
        flex: 1,
      };
    } else {
      return {
        color: "#e9e9e9",
        zIndex,
        flex: 0,
      };
    }
  };

  const getSectionTitleClass = () => {
    if (activeSectionId === null) {
      return `${styles["about-services-section-title"]}`;
    } else {
      return `${styles["about-services-section-title"]} ${styles["about-services-section-title-active"]}`;
    }
  };

  const sectionClickHandler = (sectionId: number) => {
    setActiveSectionId((currentId) => {
      if (currentId !== null && currentId === sectionId) {
        return null;
      }
      return sectionId;
    });
  };

  return (
    <section
      aria-label="about-us-section"
      className={`${styles["about-services-section-container"]} ${className}`}
      id="about-us-section"
    >
      {aboutUsList.map((aboutUsItem, index) => (
        <section
          key={index}
          style={getSectionStyle(index, 2 - index)}
          onClick={() => sectionClickHandler(index)}
        >
          <h1 className={getSectionTitleClass()}>{aboutUsItem.heading}</h1>

          {getDescription("We are Lorem Ipsum", aboutUsItem.description, index)}
        </section>
      ))}
    </section>
  );
};

export default AboutAccordion;
