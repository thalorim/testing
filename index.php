<?php
  // Basic PHP/HTML entry for a static-hostable site
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Arda Gulez | Full Stack Developer</title>
  <meta name="description" content="Portfolio of Arda Gulez - Full Stack Developer" />
  <meta name="keywords" content="Arda Gulez, Full Stack Developer, Portfolio, devRaikou, Web Development" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="icon" href="public/images/profile.jpg" />
  <!-- Tailwind CDN for utility classes -->
  <script>
    // Configure Tailwind before loading
    window.tailwind = {
      config: {
        darkMode: 'class'
      }
    };
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Font Awesome for icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkfNwpBfF7Z8S+JQ9IiVbGi4ZTSs3xw3VvPpYx1GZ4Z4rP9LQ8C+YzKgA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <!-- Site styles -->
  <link rel="stylesheet" href="assets/css/styles.css" />
  <script>
    // Early theme apply to avoid FOUC
    (function(){
      try {
        var saved = localStorage.getItem('theme');
        var root = document.documentElement;
        if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          root.classList.add('dark');
        } else if (saved === 'light') {
          root.classList.remove('dark');
        }
      } catch (e) {}
    })();
  </script>
</head>
<body class="antialiased">
  <?php include __DIR__ . '/includes/header.php'; ?>

  <main class="min-h-screen pt-24">
    <?php include __DIR__ . '/sections/hero.php'; ?>
    <?php include __DIR__ . '/sections/about.php'; ?>
    <?php include __DIR__ . '/sections/skills.php'; ?>
    <?php include __DIR__ . '/sections/projects.php'; ?>

    <section class="py-10 bg-gradient-to-b from-[var(--background)] to-[color-mix(in_oklab,var(--background),transparent_50%)] relative">
      <div class="container mx-auto px-4">
        <div class="max-w-md mx-auto" id="discord-status"></div>
      </div>
    </section>

    <?php include __DIR__ . '/sections/contact.php'; ?>
  </main>

  <?php include __DIR__ . '/includes/footer.php'; ?>

  <!-- App scripts -->
  <script defer src="assets/js/main.js"></script>
</body>
</html>
