<?php /* Header / Navigation */ ?>
<header id="site-header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
  <div class="absolute inset-0 header-backdrop transition-all duration-500"></div>
  <div class="container mx-auto px-4 relative">
    <div class="h-20 flex items-center justify-between">
      <a href="#" class="flex items-center group relative">
        <span class="absolute -inset-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur transition-all duration-300"></span>
        <h1 class="relative text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">devRaikou</h1>
      </a>

      <nav class="hidden md:flex items-center">
        <div class="mr-4 p-1.5 bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/5 shadow-lg">
          <div class="flex items-center space-x-1" id="desktop-nav">
            <button data-section="about" class="nav-btn relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">About</button>
            <button data-section="skills" class="nav-btn relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">Skills</button>
            <button data-section="projects" class="nav-btn relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">Projects</button>
            <button data-section="contact" class="nav-btn relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">Contact</button>
          </div>
        </div>
        <button id="theme-toggle" class="relative p-2.5 rounded-xl bg-white/5 dark:bg-black/30 backdrop-blur-sm border border-white/10 dark:border-white/5 shadow-lg transition-all duration-300" aria-label="Toggle theme">
          <span class="fa-solid fa-moon text-indigo-300 text-lg hidden dark:inline"></span>
          <span class="fa-solid fa-sun text-amber-500 text-lg inline dark:hidden"></span>
          <span class="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </nav>

      <button id="mobile-menu-open" class="md:hidden relative p-2.5 rounded-xl bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5 shadow-lg" aria-label="Open mobile menu">
        <i class="fa-solid fa-bars text-xl"></i>
        <span class="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
      </button>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div id="mobile-menu" class="fixed inset-0 z-50 md:hidden hidden">
    <div class="absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-lg"></div>
    <div class="relative flex flex-col h-full">
      <div class="flex justify-between items-center p-4">
        <h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">devRaikou</h1>
        <button id="mobile-menu-close" class="p-2.5 rounded-xl bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-white/10 dark:border-white/5 shadow-lg" aria-label="Close mobile menu">
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>
      <nav class="flex flex-col items-center justify-center flex-1 p-8">
        <div class="w-full max-w-md bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 dark:border-white/5 shadow-lg p-4 space-y-3">
          <button data-section="about" class="mobile-nav-btn relative w-full py-3 px-6 rounded-xl text-lg font-medium transition-all duration-300">About</button>
          <button data-section="skills" class="mobile-nav-btn relative w-full py-3 px-6 rounded-xl text-lg font-medium transition-all duration-300">Skills</button>
          <button data-section="projects" class="mobile-nav-btn relative w-full py-3 px-6 rounded-xl text-lg font-medium transition-all duration-300">Projects</button>
          <button data-section="contact" class="mobile-nav-btn relative w-full py-3 px-6 rounded-xl text-lg font-medium transition-all duration-300">Contact</button>
        </div>
        <div class="mt-8">
          <button id="theme-toggle-mobile" class="relative p-2.5 rounded-xl bg-white/5 dark:bg-black/30 backdrop-blur-sm border border-white/10 dark:border-white/5 shadow-lg transition-all duration-300" aria-label="Toggle theme">
            <span class="fa-solid fa-moon text-indigo-300 text-lg hidden dark:inline"></span>
            <span class="fa-solid fa-sun text-amber-500 text-lg inline dark:hidden"></span>
            <span class="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </nav>
    </div>
  </div>
</header>
