import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const container = useRef();
  const navigate = useNavigate();

  const handleAuthClick = (type) => {
    navigate(`/auth?mode=${type}`); // pass mode via query param
  };

  useGSAP(
    () => {
      const animateSection = (imageClass, textClass) => {
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
              toggleActions: "play none none none",
            },
          }
        );

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
              toggleActions: "play none none none",
            },
          }
        );
      };

      animateSection(".image1", ".intro-text1");
      animateSection(".image2", ".intro-text2");
      animateSection(".image3", ".intro-text3");
      animateSection(".image4", ".intro-text4");

      // Section 5
      gsap.fromTo(
        ".image5",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".image5",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".intro-text5",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".intro-text5",
            start: "top 100%",
            toggleActions: "play none none none",
          },
        }
      );

      // Section 6
      gsap.fromTo(
        ".image6",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".image6",
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".intro-text6",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".intro-text6",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="flex flex-col items-center justify-between">
      {/* Other sections omitted for brevity */}
      {/* Section 1 */}
      <section className="h-screen grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-0 px-6 md:px-20">
        <div className="flex justify-center">
          <img
            src="src/assets/branding/main1.png"
            alt=""
            className="image1 w-[250px] sm:w-[300px] md:w-[400px] lg:w-[450px] scale-x-[-1]"
          />
        </div>
        <div className="intro-text1 text-center md:text-left px-4">
          <p className="font-dancing font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Every year, billions of tons of food are wasted, while millions go
            hungry
          </p>
          <p className="mt-4 font-dancing font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            "When food ends up in bins, someone ends up without dinner"
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="h-screen grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-0 px-6 md:px-20">
        <div className="intro-text2 text-center md:text-left px-4">
          <p className="font-dancing font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Restaurants have the power to turn excess into impact.
          </p>
          <p className="mt-4 font-dancing font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            “Sharing food is not charity, it’s humanity."
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="src/assets/branding/main2.png"
            alt=""
            className="image2 w-[250px] sm:w-[300px] md:w-[400px] lg:w-[450px] scale-x-[-1]"
          />
        </div>
      </section>

      {/* Section 3 */}
      <section className="h-screen grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-6 px-6 md:px-20">
        <div className="flex justify-center">
          <img
            src="src/assets/branding/main3.png"
            alt=""
            className="image3 w-[250px] sm:w-[300px] md:w-[400px] lg:w-[450px] scale-x-[-1]"
          />
        </div>
        <div className="intro-text3 text-center md:text-left px-4">
          <p className="font-dancing font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Be the bridge between surplus food and hungry hearts.
          </p>
          <p className="mt-4 font-dancing font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            “A simple delivery can create a lasting smile.”
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section className="h-screen grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-6 px-6 md:px-20">
        <div className="intro-text4 text-center md:text-left px-4">
          <p className="font-nunito font-bold text-orange-400 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Here's the Solution for the Problem
          </p>
        </div>
        <div className="flex justify-center image4">
          <img
            src="src/assets/logo-favi.png"
            alt=""
            className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[400px] xl:w-[450px]"
          />
        </div>
      </section>

      {/* Section 5 */}
      <section className="h-screen grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-6 px-6 md:px-20">
        <div className="intro-text5 text-center md:text-left px-4">
          <p className="font-rufina font-bold text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            Together, we can turn waste into wellness.
          </p>
        </div>
        <div className="flex justify-center image5">
          <img
            src="src/assets/branding/main4.png"
            alt=""
            className="w-[350px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[650px]"
          />
        </div>
      </section>
      {/* Section 6 */}
      <section className="h-screen grid grid-rows-2 grid-cols-4 gap-4 w-full px-6 md:px-20 pb-20">
        <div className="row-start-1 row-end-2 col-start-1 col-end-5 flex items-center justify-center text-center md:text-left intro-text6">
          <p className="font-rufina font-bold text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            “Be the Change as a Restaurant, NGO, or Volunteer”
          </p>
        </div>

        <div className="row-start-2 row-end-3 col-start-1 col-end-3 hidden md:flex items-center justify-center image6">
          <img
            src="src/assets/branding/main5.png"
            alt=""
            className="w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[550px] scale-x-[-1]"
          />
        </div>

        <div className="row-start-2 row-end-3 col-start-1 md:col-start-3 col-end-5 flex flex-col items-center justify-center gap-6 image6 col-span-4 md:col-span-2">
          <button
            onClick={() => handleAuthClick("register")}
            className="bg-orange-500 p-5 text-2xl text-white rounded-2xl w-full max-w-xs"
          >
            Register
          </button>
          <p className="text-2xl text-center flex items-center gap-2 w-full max-w-xs">
            <hr className="flex-1" />
            or
            <hr className="flex-1" />
          </p>
          <button
            onClick={() => handleAuthClick("login")}
            className="bg-orange-500 p-5 text-2xl text-white rounded-2xl w-full max-w-xs"
          >
            Login
          </button>
        </div>
      </section>
    </div>
  );
};

export default Intro;
