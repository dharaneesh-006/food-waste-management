import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import React from 'react'

const Intro = () => {

  useGSAP(()=>{
    gsap.fromTo(
      ".image",
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      ".intro-text",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: "power2.out",
      }
    );
  },[])

  return (
    <>
      <section className="h-screen grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-10 px-6 md:px-20">
        <div className="flex flex-row items-center justify-center">
          <img
            src="src/assets/branding/main1.png"
            alt=""
            width={400}
            className="scale-x-[-1] image"
          />
        </div>
        <div className="intro-text">
          <p className="font-dancing font-bold text-5xl">
            Every year, billions of tons of food are wasted
            <br />
            while millions go hungry ....
          </p>
          <br />
          <p className="font-dancing font-bold text-4xl">
            When food ends up in bins, someone ends up without dinner
          </p>
        </div>
      </section>
      <section className="h-screen grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-10 px-6 md:px-20">
        <div className="intro-text">
          <p className="font-dancing font-bold text-5xl">
            Every year, billions of tons of food are wasted
            <br />
            while millions go hungry ....
          </p>
          <br />
          <p className="font-dancing font-bold text-4xl">
            When food ends up in bins, someone ends up without dinner
          </p>
        </div>
        <div className="flex flex-row items-center justify-center">
          <img
            src="src/assets/branding/main1.png"
            alt=""
            width={400}
            className="scale-x-[-1] image"
          />
        </div>
      </section>
      <section></section>
      <section></section>
      <section></section>
    </>
  );
}

export default Intro