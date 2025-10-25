<?php /* Skills Section */ ?>
<section id="skills" class="py-20 relative">
  <div class="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full filter blur-3xl z-0"></div>
  <div class="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-pink-500/10 to-indigo-500/10 rounded-tr-full filter blur-3xl z-0"></div>
  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 text-center">My <span class="gradient-text">Skills</span></h2>
      <p class="text-center mb-16 max-w-2xl mx-auto text-lg opacity-80">As a Full Stack Developer, I work with a variety of technologies to create beautiful, functional, and scalable web applications.</p>
      <div class="space-y-16">
        <?php
          $skillCategories = [
            [
              'title' => 'Frontend',
              'description' => 'Building responsive, interactive user interfaces',
              'skills' => [
                ['name' => 'JavaScript', 'icon' => 'fa-brands fa-js', 'color' => 'text-yellow-400'],
                ['name' => 'TypeScript', 'icon' => 'fa-solid fa-code', 'color' => 'text-blue-500'],
                ['name' => 'React', 'icon' => 'fa-brands fa-react', 'color' => 'text-cyan-400'],
                ['name' => 'Next.js', 'icon' => 'fa-solid fa-bolt', 'color' => 'text-white'],
                ['name' => 'Vue.js', 'icon' => 'fa-brands fa-vuejs', 'color' => 'text-green-500'],
                ['name' => 'HTML5', 'icon' => 'fa-brands fa-html5', 'color' => 'text-orange-500'],
                ['name' => 'CSS3', 'icon' => 'fa-brands fa-css3', 'color' => 'text-blue-400'],
                ['name' => 'Tailwind CSS', 'icon' => 'fa-solid fa-wind', 'color' => 'text-cyan-400'],
                ['name' => 'SASS', 'icon' => 'fa-brands fa-sass', 'color' => 'text-pink-500'],
                ['name' => 'Bootstrap', 'icon' => 'fa-brands fa-bootstrap', 'color' => 'text-purple-600'],
              ]
            ],
            [
              'title' => 'Backend',
              'description' => 'Creating powerful, scalable server applications',
              'skills' => [
                ['name' => 'Node.js', 'icon' => 'fa-brands fa-node', 'color' => 'text-green-500'],
                ['name' => 'Express', 'icon' => 'fa-solid fa-code-branch', 'color' => 'text-white'],
                ['name' => 'NestJS', 'icon' => 'fa-solid fa-feather-pointed', 'color' => 'text-red-500'],
                ['name' => 'GraphQL', 'icon' => 'fa-solid fa-diagram-project', 'color' => 'text-pink-600'],
                ['name' => 'REST API', 'icon' => 'fa-solid fa-network-wired', 'color' => 'text-gray-400'],
                ['name' => 'Prisma', 'icon' => 'fa-solid fa-database', 'color' => 'text-blue-300'],
                ['name' => 'MongoDB', 'icon' => 'fa-solid fa-leaf', 'color' => 'text-green-500'],
                ['name' => 'PostgreSQL', 'icon' => 'fa-solid fa-database', 'color' => 'text-blue-400'],
                ['name' => 'MySQL', 'icon' => 'fa-solid fa-database', 'color' => 'text-blue-500'],
                ['name' => 'Redis', 'icon' => 'fa-solid fa-gem', 'color' => 'text-red-500'],
                ['name' => 'WordPress', 'icon' => 'fa-brands fa-wordpress', 'color' => 'text-blue-600'],
              ]
            ],
            [
              'title' => 'DevOps & Tools',
              'description' => 'Optimizing development workflow and deployment',
              'skills' => [
                ['name' => 'Git', 'icon' => 'fa-brands fa-git-alt', 'color' => 'text-orange-600'],
                ['name' => 'Docker', 'icon' => 'fa-brands fa-docker', 'color' => 'text-blue-500'],
                ['name' => 'Firebase', 'icon' => 'fa-solid fa-fire', 'color' => 'text-yellow-500'],
                ['name' => 'NPM', 'icon' => 'fa-brands fa-npm', 'color' => 'text-red-500'],
                ['name' => 'Webpack', 'icon' => 'fa-brands fa-js', 'color' => 'text-blue-400'],
                ['name' => 'Vite', 'icon' => 'fa-solid fa-bolt', 'color' => 'text-purple-400'],
                ['name' => 'Jest', 'icon' => 'fa-solid fa-vial', 'color' => 'text-red-600'],
                ['name' => 'Figma', 'icon' => 'fa-brands fa-figma', 'color' => 'text-purple-400'],
              ]
            ]
          ];
        ?>
        <?php foreach ($skillCategories as $category): ?>
          <div class="bg-[color-mix(in_oklab,var(--background),transparent_60%)] dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-gray-800/50 p-8 rounded-2xl shadow-lg dark:shadow-black/20">
            <div class="mb-8">
              <h3 class="text-2xl font-semibold gradient-text mb-2"><?= htmlspecialchars($category['title']) ?></h3>
              <p class="opacity-80"><?= htmlspecialchars($category['description']) ?></p>
            </div>
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
              <?php foreach ($category['skills'] as $skill): ?>
                <div class="flex flex-col items-center justify-center text-center">
                  <div class="w-14 h-14 rounded-full gradient-border flex items-center justify-center mb-2 bg-[var(--background)] dark:bg-gray-950/90 backdrop-blur-sm">
                    <i class="<?= $skill['icon'] ?> text-2xl <?= $skill['color'] ?>"></i>
                  </div>
                  <span class="text-sm font-medium"><?= htmlspecialchars($skill['name']) ?></span>
                </div>
              <?php endforeach; ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>
