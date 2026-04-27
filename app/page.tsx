"use client";

import Footer from "@/components/Footer/Footer";
import FullPageSwipe from "@/components/FullPageSwipe/FullPageSwipe";
import Services from "@/components/HomePageComponents/Services/Services";
import PageLoader from "@/components/PageLoader/PageLoader";
import TestimonialCarousel from "@/components/TestimonialCarousel/TestimonialCarousel";
import WorkShowcase from "@/components/WorkShowcase/WorkShowcase";
import { useLenis } from "@/utils/hooks/useLenis";
import { TestimonialType } from "@/utils/types";
import Image from "next/image";
import HomePage from "./(home)/page";
import styles from "./page.module.css";
import TeamGallery from "@/components/UI/ThreeD/TeamGallery";

const sampleTestimonials: TestimonialType[] = [
  {
    name: "Alice Johnson",
    role: "Marketing Manager",
    message:
      "What I appreciated most during our collaboration was the communication, the daring bets of 13G, a great synergy, understanding!",
    rating: 5,
  },
  {
    name: "Michael Smith",
    role: "CEO, TechWave",
    message:
      "A seamless experience from start to finish. Exceptional attention to detail.",
    rating: 4,
  },
  {
    name: "Sophie Lee",
    role: "Product Designer",
    message:
      "Creative solutions and brilliant execution. Our team loves working with them!",
    rating: 4,
  },
  {
    name: "David Kim",
    role: "Entrepreneur",
    message:
      "Professional, efficient, and innovative. They exceeded our expectations.",
    rating: 3.5,
  },
  {
    name: "Emma Watson",
    role: "Content Strategist",
    message:
      "Their insights and strategies helped us grow our audience significantly.",
    rating: 4,
  },
  {
    name: "James Rodriguez",
    role: "Software Engineer",
    message:
      "Reliable, consistent, and always delivering high-quality work. Truly impressive.",
    rating: 4,
  },
];

export default function Home() {
  //return <Test />;
  //return <QuadrantScroll />;
  useLenis();

  // return (
  //   <FullPageSwipe
  //   // images={[
  //   //   "/images/reviewers/user1.jpg",
  //   //   "/images/reviewers/user2.jpg",
  //   //   "/images/reviewers/user3.jpg",
  //   // ]}
  //   />
  // );

  // return (
  //   <WorkShowcase
  //     images={[
  //       "/images/reviewers/user1.jpg",
  //       "/images/reviewers/user2.jpg",
  //       "/images/reviewers/user3.jpg",
  //     ]}
  //   />
  // );

  return (
    <>
      <PageLoader />
      {/* <div
        style={{
          width: "100%",
          height: "100dvh",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 1,
          mixBlendMode: "lighten",
          pointerEvents: "none",
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div> */}
      <HomePage />
      <Services />
      {/* <Testimonial testimonial={sampleTestimonials[0]} animated /> */}
      <TestimonialCarousel testimonials={sampleTestimonials} />
      <FullPageSwipe />
      <TeamGallery />
      <Footer />
      {/* <AnimatedHeading /> */}
      {/* <div
        style={{
          width: "100vw",
          height: "200vh",
        }}
      /> */}
      {/* <TimelineCarousel />
      <AboutAccordion /> */}
    </>
  );
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

// return (
//   <CardStack
//     cards={[
//       { label: "Card 1", color: "#262C33" },
//       { label: "Card 2", color: "#2F3C4A" },
//       { label: "Card 3", color: "#4D5B66" },
//       { label: "Card 4", color: "#7D8A92" },
//       { label: "Card 5", color: "#B9B6AE" },
//       { label: "Card 6", color: "#E6D6C3" },
//       { label: "Card 7", color: "#C49B6A" },
//       { label: "Card 8", color: "#A66B47" },
//       { label: "Card 9", color: "#6B7C6A" },
//       { label: "Card 10", color: "#3C5A4C" },
//       { label: "Card 11", color: "#7F8F82" },
//       { label: "Card 12", color: "#9AA7A2" },
//     ]}
//     height={260}
//     depth={36}
//     overlap={0.68}
//   />
// );
