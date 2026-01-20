import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import staple from "../../assets/pixelart/staple.png";
import mail from "../../assets/pixelart/mail.png";
import savefile from "../../assets/pixelart/savefile.png";
import mouse from "../../assets/pixelart/mouse.png";
import notebook from "../../assets/pixelart/notebook.png";
import pencil from "../../assets/pixelart/pencil.png";

import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 50%",
        scrub: true,
      },
    });

    tl.fromTo(
      ".cta-text",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    const images = gsap.utils.toArray<HTMLImageElement>(".cta-img");

    images.forEach((img) => {
      const parent = img.parentElement!;
      const finalX =
        parent.offsetLeft +
        parent.offsetWidth / 2 -
        containerRef.current!.offsetWidth / 2;
      const finalY =
        parent.offsetTop +
        parent.offsetHeight / 2 -
        containerRef.current!.offsetHeight / 2;

      tl.fromTo(
        img,
        {
          x: -finalX,
          y: -finalY,
          opacity: 0,
          scale: 0.3,
          rotate: gsap.utils.random(-20, 20),
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: "power2.out",
        },
        "<"
      );
    });
  });

  mm.add("(max-width: 767px)", () => {
    gsap.from(".cta-text", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".cta-img", {
      opacity: 0,
      scale: 0.7,
      y: 20,
      rotate: gsap.utils.random(-10, 10),
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
        toggleActions: "play none none none",
      },
    });
  });

  return () => mm.revert();
});

  return (
    <section className="mt-section text-center relative" ref={containerRef}>
      <div className="mx-auto flex flex-col items-center justify-center relative">
        <div className="absolute w-20 left-0 -top-[6rem] md:left-[13rem] md:-top-24 lg:left-[17rem] lg:-top-13 -rotate-33 opacity-40">
          <img src={staple} alt="staple_pixel" className="block cta-img" />
        </div>
        <div className="absolute w-15 right-0 -top-[8rem] md:right-[10rem] md:-top-30 lg:right-[20rem] lg:-top-27 rotate-20 opacity-40">
          <img src={mail} alt="mail_pixel" className="block cta-img" />
        </div>
        <div className="absolute w-15 -right-14 md:right-0 top-0 -rotate-10 opacity-40">
          <img src={savefile} alt="savefile_pixel" className="block cta-img" />
        </div>
        <div className="absolute w-15 -right-[3rem] md:right-0 lg:right-[7rem] top-[50%] rotate-10 opacity-40">
          <img src={mouse} alt="mouse_pixel" className="block cta-img" />
        </div>
        <div className="absolute w-15 left-0 lg:left-[7rem] bottom-0 -rotate-15 opacity-40">
          <img src={notebook} alt="notebook_pixel" className="block cta-img" />
        </div>
        <div className="absolute w-7 -left-[2rem] md:left-0 -top-0 -rotate-15 opacity-40">
          <img src={pencil} alt="pencil_pixel" className="block cta-img" />
        </div>

        <div className="relative w-full max-w-[90%] md:max-w-[70%] lg:max-w-[60%] cta-text">
          <h1 className="text-3xl font-semibold">
            More exciting information coming soon!
          </h1>
          <p className="mt-8 text-lg">
            We're thrilled about our rebrand to caseHacks, the hackathon that's
            redefining the traditional case-competition format...
          </p>
          <p className="mt-8 text-lg">
            Stay tuned and follow our socials, more exciting details,
            opportunities, and surprises are on the way...
          </p>
          <Button
            text="Join Our Discord"
            className="mt-8 py-2 px-4"
            onClick={(e) => {
              window.location.href = "https://discord.gg/YMSWFSp6aG";
              e?.preventDefault();
            }}
          />
        </div>
      </div>
    </section>
  );
}
