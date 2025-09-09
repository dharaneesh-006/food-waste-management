import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import {React, useRef} from 'react'

const Intro = () => {

  const container = useRef();

  useGSAP(() => {
    const animateSection = (imageClass, textClass) => {
      // Image
      gsap.fromTo(
        imageClass,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageClass,
            start: "top 70%",
            end: "bottom 60%",
            onLeave: () => {
              gsap.to(imageClass, {
                y: -100, // go upward when leaving
                opacity: 0,
                duration: 1,
                ease: "power2.in",
              });
            },
            onEnterBack: () => {
              gsap.fromTo(
                imageClass,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
              );
            },
          },
        }
      );

      // Text
      gsap.fromTo(
        textClass,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: textClass,
            start: "top 85%",
            end: "bottom 60%",
            onLeave: () => {
              gsap.to(textClass, {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: "power2.in",
              });
            },
            onEnterBack: () => {
              gsap.fromTo(
                textClass,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
              );
            },
          },
        }
      );
    };

    animateSection(".image1", ".intro-text1");
    animateSection(".image2", ".intro-text2");
    animateSection(".image3", ".intro-text3");
  }, { scope: container });

  return (
    <div ref={container}>
      <section className="h-screen grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-10 px-6 md:px-20">
        <div className="flex flex-row items-center justify-center">
          <img
            src="src/assets/branding/main1.png"
            alt=""
            width={400}
            className="scale-x-[-1] image1"
          />
        </div>
        <div className="intro-text1">
          <p className="font-dancing font-bold text-5xl">
            Every year, billions of tons of food are wasted
            <br />
            while millions go hungry ....
          </p>
          <br />
          <p className="font-dancing font-bold text-4xl">
            "When food ends up in bins, someone ends up without dinner"
          </p>
        </div>
      </section>
      <section className="h-screen grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-10 px-6 md:px-20">
        <div className="intro-text2">
          <p className="font-dancing font-bold text-5xl">
            Restaurants have the power to turn excess into impact.
          </p>
          <br />
          <p className="font-dancing font-bold text-4xl">
            “Sharing food is not charity, it’s humanity."
          </p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <img
            src="src/assets/branding/main2.png"
            alt=""
            width={400}
            className="scale-x-[-1] image2"
          />
        </div>
      </section>
      <section className="h-screen grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-10 px-6 md:px-20">
        <div className="flex flex-row items-center justify-center">
          <img
            src="src/assets/branding/main3.png"
            alt=""
            width={400}
            className="scale-x-[-1] image3"
          />
        </div>
        <div className="intro-text3">
          <p className="font-dancing font-bold text-5xl">
            Be the bridge between surplus food and hungry hearts.
          </p>
          <br />
          <p className="font-dancing font-bold text-4xl">
            “A simple delivery can create a lasting smile.”
          </p>
        </div>
      </section>
    </div>
  );
}

export default Intro