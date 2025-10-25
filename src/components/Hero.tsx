'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden animated-gradient-dark px-4 py-24">
      <div className="relative max-w-lg w-full">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur opacity-40" />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative card card-dark rounded-3xl p-8 md:p-10 text-center"
        >
          <div className="mx-auto w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden ring-2 ring-white/10 shadow-lg mb-6">
            <Image
              src="/images/profile.jpg"
              alt="Profile photo"
              width={256}
              height={256}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" id="home">
            <span className="gradient-text">Arda Gulez</span>
          </h1>
          <p className="text-base md:text-lg text-gray-300">
            Full Stack Developer crafting modern, user-friendly web apps.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;