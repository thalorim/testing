(function(){
  const root = document.documentElement;

  function setTheme(newTheme){
    try{
      if(newTheme === 'system'){
        localStorage.removeItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', systemDark);
      } else {
        localStorage.setItem('theme', newTheme);
        root.classList.toggle('dark', newTheme === 'dark');
      }
    } catch(e){}
  }

  // Theme toggles
  function bindThemeToggles(){
    const saved = localStorage.getItem('theme');
    if(saved){ setTheme(saved); }
    const buttons = [
      document.getElementById('theme-toggle'),
      document.getElementById('theme-toggle-mobile')
    ].filter(Boolean);
    buttons.forEach(btn => btn.addEventListener('click', () => {
      const currentlyDark = root.classList.contains('dark');
      setTheme(currentlyDark ? 'light' : 'dark');
    }));

    // Listen to system theme when in system mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if(!localStorage.getItem('theme')){
        setTheme('system');
      }
    });
  }

  function smoothScrollToId(id){
    const headerHeight = 80;
    const el = document.getElementById(id);
    if(!el) return;
    const box = el.getBoundingClientRect();
    const offset = box.top + window.scrollY - headerHeight;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }

  function bindNavigation(){
    const header = document.getElementById('site-header');
    const desktopNav = document.getElementById('desktop-nav');
    const mobileMenu = document.getElementById('mobile-menu');
    const btnOpen = document.getElementById('mobile-menu-open');
    const btnClose = document.getElementById('mobile-menu-close');

    function setActive(section){
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-section') === section));
    }

    btnOpen && btnOpen.addEventListener('click', () => mobileMenu && (mobileMenu.classList.remove('hidden')));
    btnClose && btnClose.addEventListener('click', () => mobileMenu && (mobileMenu.classList.add('hidden')));

    desktopNav && desktopNav.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const section = btn.getAttribute('data-section');
        if(section){ smoothScrollToId(section); setActive(section); }
      });
    });

    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const section = btn.getAttribute('data-section');
        if(section){ smoothScrollToId(section); setActive(section); }
        mobileMenu && mobileMenu.classList.add('hidden');
      });
    });

    function onScroll(){
      const sections = Array.from(document.querySelectorAll('section[id]'));
      let current = '';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if(window.scrollY >= (section.offsetTop - 300) && window.scrollY < (section.offsetTop + section.offsetHeight - 300)){
          current = section.id;
        }
      });
      if(current){ setActive(current); }
      if(window.scrollY > 10){ header && header.classList.add('shrink'); } else { header && header.classList.remove('shrink'); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Custom Cursor
  function initCursor(){
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(ring); document.body.appendChild(dot);

    let hovering = false;
    function updateHover(e){
      const t = e.target;
      const interactive = t && (t.closest('a,button,[role="button"],.interactive'));
      hovering = !!interactive;
      ring.classList.toggle('hovering', hovering);
      dot.classList.toggle('hovering', hovering);
    }

    window.addEventListener('mousemove', (e) => {
      ring.style.left = e.clientX + 'px';
      ring.style.top = e.clientY + 'px';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      document.body.appendChild(trail);
      setTimeout(() => trail.remove(), 500);
    }, { passive: true });

    window.addEventListener('mouseover', updateHover, { passive: true });
    window.addEventListener('mouseout', () => { hovering = false; ring.classList.remove('hovering'); dot.classList.remove('hovering'); }, { passive: true });
  }

  // Hero background canvas animation
  function initHeroCanvas(){
    const canvas = document.getElementById('bg-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(!ctx) return;

    let width = window.innerWidth; let height = window.innerHeight;
    const particles = [];
    let particleCount = width > 768 ? 50 : 30;
    const colors = ['rgba(99, 102, 241, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(217, 70, 239, 0.3)'];

    function resize(){
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = width; canvas.height = height;
      particles.length = 0; createParticles();
    }
    function createParticles(){
      for(let i=0;i<particleCount;i++){
        particles.push({ x: Math.random()*width, y: Math.random()*height, r: Math.random()*7+3, c: colors[Math.floor(Math.random()*colors.length)], sx: Math.random()*0.5 - 0.25, sy: Math.random()*0.5 - 0.25 });
      }
    }
    function draw(){
      ctx.clearRect(0,0,width,height);
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fillStyle = p.c; ctx.fill();
        p.x += p.sx; p.y += p.sy; if(p.x<0||p.x>width) p.sx *= -1; if(p.y<0||p.y>height) p.sy *= -1;
      });
    }
    function connect(){
      for(let i=0;i<particles.length;i++){
        for(let j=i;j<particles.length;j++){
          const dx = particles[i].x - particles[j].x; const dy = particles[i].y - particles[j].y; const d = Math.sqrt(dx*dx + dy*dy);
          if(d < 120){ ctx.beginPath(); ctx.strokeStyle = `rgba(148, 163, 184, ${(120 - d)/1200})`; ctx.lineWidth = .5; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); }
        }
      }
    }
    function animate(){ draw(); connect(); requestAnimationFrame(animate); }

    resize(); createParticles(); animate();
    window.addEventListener('resize', resize);
  }

  // Fetch GitHub projects
  async function loadProjects(){
    const grid = document.getElementById('projects-grid');
    if(!grid) return;
    const fallback = [
      { id:1, name:'raikou.me', description:'My personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.', html_url:'https://github.com/devraikou/raikou.me', homepage:'https://raikou.me', stargazers_count:0, forks_count:0, language:'TypeScript', topics:['nextjs','typescript','tailwindcss','portfolio'] },
      { id:2, name:'Sample Project', description:'A modern web application built with React and TypeScript.', html_url:'https://github.com/devraikou', homepage:'', stargazers_count:0, forks_count:0, language:'TypeScript', topics:['react','typescript','web'] },
    ];
    try{
      const res = await fetch('https://api.github.com/users/devraikou/repos?sort=pushed&direction=desc');
      if(!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const repos = data.filter(r => !r.fork && r.description).slice(0,6);
      renderRepos(repos.length ? repos : fallback);
    }catch(e){
      renderRepos(fallback);
    }

    function langColor(language){
      const map = { JavaScript:'bg-yellow-400', TypeScript:'bg-blue-500', HTML:'bg-orange-500', CSS:'bg-blue-400', Python:'bg-green-500', Java:'bg-red-500', 'C#':'bg-purple-500', PHP:'bg-indigo-500', Go:'bg-cyan-500', Rust:'bg-orange-600', Ruby:'bg-red-600', Dart:'bg-cyan-400', Swift:'bg-orange-500', Kotlin:'bg-purple-400' };
      return map[language] || 'bg-gray-500';
    }

    function renderRepos(repos){
      grid.querySelectorAll('.placeholder').forEach(n => n.remove());
      const frag = document.createDocumentFragment();
      repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'card group hover:shadow-lg transition-all duration-500';
        card.innerHTML = `
          <h3 class="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">${repo.name}</h3>
          <p class="text-sm opacity-80 mb-4">${repo.description || ''}</p>
          ${repo.topics && repo.topics.length ? `<div class="flex flex-wrap gap-2 mb-4">${repo.topics.slice(0,3).map(t=>`<span class="text-xs px-2 py-1 rounded-full gradient-border">${t}</span>`).join('')}${repo.topics.length>3?`<span class="text-xs px-2 py-1 opacity-70">+${repo.topics.length-3}</span>`:''}</div>`: ''}
          <div class="flex justify-between items-center mb-4">
            ${repo.language ? `<span class="flex items-center text-sm"><span class="inline-block w-3 h-3 rounded-full mr-1 ${langColor(repo.language)}"></span>${repo.language}</span>` : '<span></span>'}
            <div class="flex items-center space-x-3">
              <span class="flex items-center text-sm"><i class="fa-regular fa-star mr-1"></i> ${repo.stargazers_count || 0}</span>
              <span class="flex items-center text-sm"><i class="fa-solid fa-code-branch mr-1"></i> ${repo.forks_count || 0}</span>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <a href="${repo.html_url}" target="_blank" rel="noopener" class="flex items-center space-x-1 hover:gradient-text transition-all duration-300"><i class="fa-brands fa-github"></i><span>Code</span></a>
            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener" class="flex items-center space-x-1 hover:gradient-text transition-all duration-300"><i class="fa-solid fa-up-right-from-square"></i><span>Demo</span></a>` : '<span></span>'}
          </div>`;
        frag.appendChild(card);
      });
      grid.appendChild(frag);
    }
  }

  // Discord status
  async function loadDiscord(){
    const container = document.getElementById('discord-status');
    if(!container) return;
    container.innerHTML = `<div class="relative w-full max-w-md p-4 rounded-xl bg-gray-100/80 dark:bg-white/10 backdrop-blur-md border border-gray-200/50 dark:border-white/10 shadow-lg"><div class="flex items-center justify-center h-24"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300 dark:border-white/20"></div></div></div>`;

    try{
      const res = await fetch('https://api.lanyard.rest/v1/users/263957712507895808');
      const data = await res.json();
      if(!data.success) throw new Error('lanyard error');
      const d = data.data;
      const flags = d.discord_user.public_flags ?? (1<<22 | 1<<7);
      const premium = d.discord_user.premium_type ?? 2;
      const isGif = (d.discord_user.avatar || '').startsWith('a_');
      const avatarUrl = d.discord_user.avatar
        ? `https://cdn.discordapp.com/avatars/${d.discord_user.id}/${d.discord_user.avatar}.${isGif ? 'gif':'webp'}?size=256`
        : `https://cdn.discordapp.com/embed/avatars/${parseInt(d.discord_user.discriminator) % 5}.png`;

      function statusColor(s){ return s==='online'?'bg-green-500 dark:bg-green-400': s==='idle'?'bg-yellow-500 dark:bg-yellow-400': s==='dnd'?'bg-red-500 dark:bg-red-400':'bg-gray-500 dark:bg-gray-400'; }
      function statusText(s){ return s==='online'?'Online': s==='idle'?'Idle': s==='dnd'?'Do Not Disturb':'Offline'; }

      function badges(flags, premium){
        const list = [];
        if(flags & (1<<22)) list.push({name:'Active Developer', icon:'fa-solid fa-rocket', color:'text-green-400', bg:'bg-green-500/20'});
        if(flags & (1<<7)) list.push({name:'HypeSquad Brilliance', icon:'fa-solid fa-sparkles', color:'text-pink-400', bg:'bg-pink-500/20'});
        if(premium === 2 || premium === 1) list.push({name:'Discord Nitro', icon:'fa-regular fa-gem', color:'text-purple-400', bg:'bg-purple-500/20'});
        return `<div class="flex gap-1.5 items-center">${list.map(b=>`<div class="w-5 h-5 rounded-md ${b.bg} flex items-center justify-center group relative" title="${b.name}"><i class="${b.icon} w-3 h-3 ${b.color}"></i></div>`).join('')}</div>`;
      }

      function renderActivities(activities){
        const filtered = (activities||[]).filter(a=>[0,2,3].includes(a.type));
        if(!filtered.length) return '';
        return `<div class="bg-gray-200/50 dark:bg-black/20 rounded-lg p-3 space-y-3">${filtered.map(a=>{
          const isSpotify = (a.name||'').toLowerCase()==='spotify';
          const album = isSpotify && a.assets?.large_image ? `https://i.scdn.co/image/${a.assets.large_image.substring(8)}` : null;
          const typeText = isSpotify ? 'Listening to Spotify' : (a.type===0?'Playing':a.type===1?'Streaming':a.type===2?'Listening to':a.type===3?'Watching':'');
          return `<div class="space-y-2"><div class="flex items-start gap-3">${album?`<div class="relative flex-shrink-0 w-12 h-12 rounded-md overflow-hidden shadow-sm"><img src="${album}" alt="Album Art" class="object-cover w-12 h-12" /></div>`:''}<div class="flex-1 min-w-0"><div class="flex items-center gap-2 text-gray-700 dark:text-white/80"><i class="${isSpotify?'fa-brands fa-spotify text-[#1DB954]':'fa-solid fa-gamepad'} w-4 h-4"></i><span class="text-sm">${typeText}</span></div><div class="text-gray-900 dark:text-white font-medium truncate">${a.name||''}</div>${a.details?`<div class="text-sm text-gray-600 dark:text-white/60 truncate">${a.details}</div>`:''}${a.state?`<div class="text-sm text-gray-600 dark:text-white/60 truncate">${a.state}</div>`:''}</div></div></div>`;}).join('')}</div>`;
        }

      container.innerHTML = `
        <div class="relative w-full max-w-md p-4 rounded-xl bg-gray-100/80 dark:bg-white/10 backdrop-blur-md border border-gray-200/50 dark:border-white/10 shadow-lg">
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="relative">
                <img src="${avatarUrl}" alt="Discord Avatar" width="64" height="64" class="rounded-full ring-2 ring-gray-200/50 dark:ring-white/10" />
                <div class="absolute bottom-0 right-0 w-4 h-4 rounded-full ${statusColor(d.discord_status)} ring-2 ring-white dark:ring-black/50"></div>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-semibold text-lg text-gray-900 dark:text-white">${d.discord_user.username}</span>
                  ${badges(flags, premium)}
                </div>
                <div class="text-gray-600 dark:text-white/60 text-sm mt-1">${statusText(d.discord_status)}</div>
              </div>
            </div>
            ${renderActivities(d.activities)}
            <div class="pt-2">
              <a href="https://discord.com/users/${d.discord_user.id}" target="_blank" rel="noopener" class="flex items-center justify-center gap-2 w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-600 transition-colors rounded-lg text-white font-medium shadow-sm"><i class="fa-brands fa-discord"></i> Add Friend</a>
            </div>
          </div>
        </div>`;
    }catch(e){
      container.innerHTML = '';
    }
  }

  function init(){
    bindThemeToggles();
    bindNavigation();
    initCursor();
    initHeroCanvas();
    loadProjects();
    loadDiscord();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
