<?php /* Hero Section */ ?>
<section id="home" class="min-h-screen flex flex-col justify-center relative overflow-hidden">
  <canvas id="bg-canvas" class="absolute inset-0 w-full h-full -z-10"></canvas>
  <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--background)] -z-10"></div>
  <div class="container mx-auto px-4 z-10">
    <div class="flex flex-col md:flex-row items-center justify-between gap-8">
      <div class="md:w-1/2 order-2 md:order-1">
        <div class="relative w-full max-w-md mx-auto">
          <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
          <div class="relative aspect-square overflow-hidden rounded-full bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900">
            <img src="public/images/profile.jpg" alt="Profile" class="object-cover w-full h-full" />
          </div>
        </div>
      </div>
      <div class="md:w-1/2 text-center md:text-left order-1 md:order-2">
        <h1 class="text-4xl md:text-7xl font-bold mb-4"><span class="gradient-text">Arda Gulez</span></h1>
        <h2 class="text-xl md:text-3xl mb-8 inline-block relative">
          <span>Full Stack Developer</span>
          <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
        </h2>
        <p class="text-lg md:text-xl max-w-2xl md:mx-0 mx-auto mb-10 opacity-80">Building beautiful, responsive, and user-friendly web applications with modern technologies.</p>
        <div class="flex justify-center md:justify-start space-x-5 mb-12">
          <a href="https://github.com/devraikou" target="_blank" rel="noopener" class="p-3 flex items-center justify-center rounded-full gradient-border hover:scale-110 transition-transform duration-300" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
          <a href="https://linkedin.com/in/ardagulez" target="_blank" rel="noopener" class="p-3 flex items-center justify-center rounded-full gradient-border hover:scale-110 transition-transform duration-300" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
          <a href="https://twitter.com/devraikou" target="_blank" rel="noopener" class="p-3 flex items-center justify-center rounded-full gradient-border hover:scale-110 transition-transform duration-300" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="https://instagram.com/ard4gulez" target="_blank" rel="noopener" class="p-3 flex items-center justify-center rounded-full gradient-border hover:scale-110 transition-transform duration-300" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        </div>
        <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a href="#projects" class="gradient-border px-8 py-3 rounded-full inline-block hover:scale-105 transition-transform duration-300">View My Work</a>
          <a href="#contact" class="px-8 py-3 rounded-full inline-block border border-gray-300 dark:border-gray-700 hover:border-transparent hover:scale-105 transition-all duration-300">Contact Me</a>
        </div>
      </div>
    </div>
  </div>
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
    <div class="flex flex-col items-center">
      <span class="text-sm mb-2">Scroll Down</span>
      <div class="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 flex justify-center pt-1">
        <div class="w-1.5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full animate-pulse" style="height:8px"></div>
      </div>
    </div>
  </div>
</section>
