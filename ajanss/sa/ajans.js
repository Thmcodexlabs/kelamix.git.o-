const hamburgerInput = document.getElementById("hamburgerInput");
const menuOverlay = document.getElementById("menuOverlay");
const menuItems = menuOverlay.querySelectorAll("a"); // Menüdeki linkler

// Hamburger aç/kapa animasyonu
hamburgerInput.addEventListener("change", () => {
  if (hamburgerInput.checked) {
    menuOverlay.classList.add("active");
    gsap.fromTo(menuItems, { opacity: 0, x: -50 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" });
  } else {
    gsap.to(menuItems, { opacity: 0, x: -50, duration: 0.2 });
    menuOverlay.classList.remove("active");
  }
});







// Navbar scroll efekti
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});





// GSAP ScrollTrigger - Hero Pin
gsap.registerPlugin(ScrollTrigger);
gsap.timeline({
  scrollTrigger: {
    trigger: ".wrapper-hero",
    start: "top top",
    end: "+=150%",
    pin: true,
    scrub: true,
  }
})
  .to(".image-container img", { scale: 2, transformOrigin: "center center", ease: "power1.inOut" })
  .to(".section.hero", { scale: 1.4, transformOrigin: "center center", ease: "power1.inOut" }, "<");





  // AOS Init
AOS.init({ once: true, offset: 200 });









// Menüyi kapatmak için overlaye tıklama
menuOverlay.addEventListener("click", (e) => {
  if (e.target === menuOverlay) {
    hamburgerInput.checked = false;
    menuOverlay.classList.remove("active");
    gsap.to(menuItems, { opacity: 0, x: -50, duration: 0.2 });
  }
});

// Menü linklerine tıklayınca menüyü kapatma
menuItems.forEach(link => {
  link.addEventListener("click", () => {
    hamburgerInput.checked = false;
    menuOverlay.classList.remove("active");
    gsap.to(menuItems, { opacity: 0, x: -50, duration: 0.2 });
  });
});




gsap.to(".floating-text h1", {
  x: "-100%", // sağdan sola kayacak
  duration: 25,
  ease: "linear",
  repeat: -1
});







// Kartları seç
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function () {
    // Sadece mobil ve tablette çalışsın
    if (window.innerWidth <= 1024) {
      this.classList.toggle('active');
    }
  });
});





document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      // Küçük nokta doğrudan imlecin tam yerinde
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';

      // Daha büyük daire biraz gecikmeli ve offsetli hareket ediyor
      setTimeout(() => {
        cursorFollower.style.left = (e.clientX - 10) + 'px';
        cursorFollower.style.top = (e.clientY - 10) + 'px';
      }, 100);
    });
  }
});






(() => {
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.registerPlugin(ScrollTrigger);

  /* ===== Fond particules (dé-zoom lié au master) ===== */
  const cv = document.getElementById('space3d');
  const cx = cv.getContext('2d');
  let W = innerWidth, H = innerHeight, DPR = Math.min(2, devicePixelRatio || 1);
  let P = [], N = 540, mx = 0, my = 0, camZ = 0, camTarget = 0, masterProgress = 0;

  function size() {
    W = innerWidth;
    H = innerHeight;
    cv.width = W * DPR;
    cv.height = H * DPR;
    cv.style.width = W + 'px';
    cv.style.height = H + 'px';
    cx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  addEventListener('resize', size);
  size();

  const rnd = (a, b) => a + Math.random() * (b - a);

  (function init() {
    for (let i = 0; i < N; i++) P.push({
      x: rnd(-1, 1) * W * 0.85,
      y: rnd(-1, 1) * H * 0.85,
      z: rnd(250, 1900),
      r: rnd(0.6, 1.6),
      h: 210 + Math.random() * 60,
      a: rnd(0.05, 0.12)
    });
  })();

  addEventListener('pointermove', e => {
    mx = e.clientX / W - 0.5;
    my = e.clientY / H - 0.5;
  }, { passive: true });

  function draw() {
    cx.clearRect(0, 0, W, H);
    camZ += (camTarget - camZ) * 0.07;
    for (const p of P) {
      let z = p.z - camZ;
      while (z < 60) { p.z += 1600; z = p.z - camZ; }
      while (z > 1900) { p.z -= 1600; z = p.z - camZ; }
      const f = 320, s = f / z;
      const sx = (p.x + mx * 120) * s + W / 2,
        sy = (p.y + my * 120) * s + H / 2,
        r = p.r * Math.max(0.2, s * 4);
      const g = cx.createRadialGradient(sx, sy, 0, sx, sy, r * 7);
      const alpha = 0.07 + p.a * (0.6 + 0.4 * (1 - masterProgress));
      g.addColorStop(0, `hsla(${p.h},90%,72%,${alpha})`);
      g.addColorStop(1, `hsla(${p.h},90%,72%,0)`);
      cx.fillStyle = g;
      cx.beginPath();
      cx.arc(sx, sy, r, 0, Math.PI * 2);
      cx.fill();
      p.a += (Math.random() - 0.5) * 0.004;
      p.a = Math.min(0.16, Math.max(0.02, p.a));
    }
    if (!prefersReduced) requestAnimationFrame(draw);
  }
  if (!prefersReduced) draw();

  /* ===== Kinetic text ===== */
const phrases = [
  "CREATIVE GRAPHIC DESIGN SOLUTIONS",
  "MODERN WEB DESIGN AND DEVELOPMENT",
  "COMBINE DESIGN WITH CODING",
  "FOCUS ON USER EXPERIENCE",
  "RESPONSIVE DESIGN FOR EVERY DEVICE",
  "NEXT-GENERATION FRONTEND TECHNOLOGIES",
  "CUSTOM DESIGNS FOR YOUR BRAND",
  "FAST, SECURE, AND ENGAGING WEBSITES"
];

  const accents = [];
  const host = document.getElementById('kinetic');

  function makePhrase(t) {
    const ph = document.createElement('div');
    ph.className = 'phrase';
    const line = document.createElement('div');
    line.className = 'line';
    ph.appendChild(line);
    t.split(/\s+/).forEach((w, i, arr) => {
      const sp = document.createElement('span');
      const clean = w.replace(/[^A-Za-z0-9&-]/g, '');
      sp.className = 'word' + (accents.some(a => a.toLowerCase() === clean.toLowerCase()) ? ' accent' : '');
      sp.textContent = w;
      line.appendChild(sp);
      if (i < arr.length - 1) line.appendChild(document.createTextNode(' '));
    });
    host.appendChild(ph);
    return ph;
  }
  const nodes = phrases.map(makePhrase);

  /* ===== Services (carousel centré) ===== */
  const services = [];
  const carousel = document.getElementById('carousel');
  const cards = services.map(label => {
    const el = document.createElement('article');
    el.className = 'svc-card';
    el.innerHTML = `<h3 class="svc-title">${label}</h3>`;
    carousel.appendChild(el);
    return el;
  });

  /* ===== Final ===== */
  const final = document.getElementById('final');
  const lineA = final.querySelector('.lineA');
  const lineB = final.querySelector('.lineB');
  lineA.innerHTML = lineA.textContent.split('').map(ch => `<span class="L">${ch}</span>`).join('');
  lineB.innerHTML = lineB.textContent.split('').map(ch => `<span class="L">${ch}</span>`).join('');
  const LA = lineA.querySelectorAll('.L'), LB = lineB.querySelectorAll('.L');

  /* ===== Progress & gradients (scroll) ===== */
  const globalBar = document.getElementById('globalBar');

  /* ===== Master timeline (pinned) ===== */
  const SEG = 1.0;
  const master = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: host.parentElement,
      start: 'top top',
      end: () => '+=' + (phrases.length * 760 + services.length * 700 + 1400), /* buffer pour le final */
      scrub: 0.6, pin: true,
      onUpdate: self => {
        masterProgress = self.progress;
        camTarget = masterProgress * 1400;             // dé-zoom particules
        const gp = (masterProgress * 100);               // 0-100 (nombre)
        document.documentElement.style.setProperty('--gp', gp.toFixed(2));
        document.documentElement.style.setProperty('--ga', (90 + gp * 0.6) + 'deg'); // angle qui évolue
        globalBar.style.width = gp.toFixed(2) + '%';
      }
    }
  });

  // Phrases (blur court, sans flicker)
  nodes.forEach(ph => {
    const words = ph.querySelectorAll('.word');
    master.to(ph, { opacity: 1, y: 0, duration: SEG * 0.34, force3D: true }, '>');
    master.fromTo(words, { y: 26, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', stagger: { each: 0.05, from: 'left' }, duration: SEG * 0.56, force3D: true }, '<');
    master.to({}, { duration: SEG * 0.32 });
    master.to(words, { y: -18, opacity: 0, filter: 'blur(4px)', stagger: { each: 0.04, from: 'right' }, duration: SEG * 0.40, ease: 'power2.in', force3D: true }, '>-0.04');
    master.to(ph, { opacity: 0, duration: SEG * 0.18 }, '<');

    // teintes évolutives (subtiles)
    master.to(':root', {
      '--c1': gsap.utils.wrap(['#78a6ff', '#8fd2ff', '#78a6ff']),
      '--c2': gsap.utils.wrap(['#b07aff', '#8fa1ff', '#b07aff']),
      '--c3': gsap.utils.wrap(['#ff6e9a', '#ff9fb6', '#ff6e9a']),
      duration: SEG * 0.6, ease: 'power1.inOut'
    }, '<');
  });

  // Carousel
  master.to(carousel, { opacity: 1, duration: 0.32 }, '>');
  const IN = 0.40, HOLD = 0.34, OUT = 0.40;
  cards.forEach(card => {
    master.fromTo(card, { opacity: 0, x: 140, rotateY: -10, filter: 'blur(6px)' },
      { opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)', duration: IN, force3D: true }, '>');
    master.to({}, { duration: HOLD });
    master.to(card, { opacity: 0, x: -140, rotateY: 10, filter: 'blur(4px)', duration: OUT, ease: 'power2.in', force3D: true }, '>');
  });
  master.to(carousel, { opacity: 0, duration: 0.28 }, '>');
  
  // FINAL — au centre, après services
  master.to(final, { opacity: 1, scale: 1, duration: 0.52, ease: 'power3.out' }, '>');
  master.fromTo(LA, { opacity: 0, y: 28, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', stagger: { each: 0.022, from: 'center' }, duration: 0.62, force3D: true }, '<');
  master.fromTo(LB, { opacity: 0, y: 36, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', stagger: { each: 0.022, from: 'center' }, duration: 0.72, force3D: true }, '<0.10');
  // Le final reste (pas de fade-out).

  /* Reduced motion */
  if (prefersReduced) {
    ScrollTrigger.killAll();
    document.querySelectorAll('.phrase,.svc-card,.final').forEach(el => {
      el.style.opacity = 1; el.style.transform = 'none'; el.style.filter = 'none';
    });
    globalBar.style.width = '100%';
  }
})();








(function () {
  const container = document.getElementById('custom-timeline-section');
  const highlightLine = container.querySelector('path.highlight-line');
  const pathLength = highlightLine.getTotalLength();

  highlightLine.style.strokeDasharray = pathLength;
  highlightLine.style.strokeDashoffset = pathLength;

  function updateHighlight() {
    // Container'ın viewport içindeki görünümü ve scroll durumunu alalım
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Container ne kadar görünür?
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const totalHeight = rect.height;

    // Scroll ilerlemesini 0-1 arası normalize et
    let scrollPercent = 0;
    if (visibleHeight > 0) {
      scrollPercent = (windowHeight - rect.top) / (totalHeight + windowHeight);
      if (scrollPercent > 1) scrollPercent = 1;
      if (scrollPercent < 0) scrollPercent = 0;
    }

    highlightLine.style.strokeDashoffset = pathLength * (1 - scrollPercent);
  }

  window.addEventListener('scroll', updateHighlight);
  window.addEventListener('resize', updateHighlight);
  updateHighlight();

  // Intersection Observer ile yazıları aktif etme
  const articles = container.querySelectorAll('article');
  const activeStates = new Map();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      const ratio = entry.intersectionRatio;

      if (ratio >= 0.7) {
        if (activeStates.get(el) !== true) {
          activeStates.set(el, true);
          setTimeout(() => el.style.opacity = '1', 50);
          setTimeout(() => el.style.transform = 'translateY(0) scale(1)', 0);
          setTimeout(() => el.style.color = '#a3c1ad', 50);
          setTimeout(() => el.style.fontWeight = '600', 50);
        }
      } else if (ratio < 0.5) {
        if (activeStates.get(el) !== false) {
          activeStates.set(el, false);
          setTimeout(() => {
            const currentRatio = observer.takeRecords().find(e => e.target === el)?.intersectionRatio || 0;
            if (currentRatio < 0.5) {
              el.style.opacity = '0';
              el.style.transform = 'translateY(20px)';
              el.style.color = '#ddd';
              el.style.fontWeight = 'normal';
            } else {
              activeStates.set(el, true);
            }
          }, 250);
        }
      }
    });
  }, { root: null, rootMargin: '0px', threshold: [0.1, 1] });

  articles.forEach(article => observer.observe(article));
})();








// GSAP Animasyonları
gsap.from("#kelamixLogo", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.3,
  ease: "power2.out"
});

gsap.from(".contact-section h2", {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.5,
  ease: "power2.out"
});

gsap.from(".contact-section p, .contact-section .slogan", {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.7,
  stagger: 0.2,
  ease: "power2.out"
});

gsap.from(".form-group", {
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  delay: 1,
  ease: "power3.out"
});







const textPath = document.getElementById("curvedText");
    const spacing = 2200; 
    let offset = 0;
    let speed = 2;
    let direction = "left";
    let dragging = false;
    let lastX = 0;
    let velocity = 0;

    // Tekrar eden metin ekle
    const baseText = textPath.textContent + " ";
    let repeated = "";
    while (repeated.length < 350) repeated += baseText;
    textPath.textContent = repeated;

    function animate() {
      if (!dragging) {
        const delta = direction === "right" ? speed : -speed;
        offset += delta;

        if (offset <= -spacing) offset += spacing;
        if (offset > 0) offset -= spacing;

        textPath.setAttribute("startOffset", offset + "px");
      }
      requestAnimationFrame(animate);
    }
    animate();

    // Drag
    const container = document.querySelector(".curved-loop-jacket");
    container.addEventListener("pointerdown", (e) => {
      dragging = true;
      lastX = e.clientX;
      velocity = 0;
      container.setPointerCapture(e.pointerId);
      container.style.cursor = "grabbing";
    });

    container.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      velocity = dx;

      offset += dx;
      if (offset <= -spacing) offset += spacing;
      if (offset > 0) offset -= spacing;

      textPath.setAttribute("startOffset", offset + "px");
    });

    container.addEventListener("pointerup", () => {
      dragging = false;
      direction = velocity > 0 ? "right" : "left";
      container.style.cursor = "grab";
    });

    container.addEventListener("pointerleave", () => {
      dragging = false;
      container.style.cursor = "grab";
    });








    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

// Sadece shuffle-text classını hedefle
document.querySelectorAll(".shuffle-text").forEach((element) => {
  const finalText = element.textContent;
  let iterations = 0;

  const interval = setInterval(() => {
    element.textContent = finalText
      .split("")
      .map((letter, index) => {
        if (index < iterations) {
          return finalText[index]; // doğru harfi göster
        }
        return letters[Math.floor(Math.random() * letters.length)]; // rastgele harf
      })
      .join("");

    if (iterations >= finalText.length) {
      clearInterval(interval);
    }

    iterations += 1 / 2; // hız (düşürürsen yavaşlar, yükseltirsen hızlanır)
  }, 100);
});







gsap.registerPlugin(ScrollTrigger);

// Tüm hedef başlıklar
const headings = document.querySelectorAll('.extra-content .h1, .about-us h1');

headings.forEach(h1 => {
  const text = h1.textContent;
  h1.textContent = ''; // Temizle
  text.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.classList.add('animated-char');
    h1.appendChild(span);
  });

  gsap.to(h1.querySelectorAll('.animated-char'), {
    scrollTrigger: {
      trigger: h1,
      start: 'top 10%',
      toggleActions: 'play none none none'
    },
    opacity: 1,
    y: 0,
    stagger: 0.05,
    duration: 0.6,
    ease: 'power3.out'
  });
});









const track = document.getElementById('programsTrack');
const wrapper = document.getElementById('programsWrapper');

// Logoların containerı dolduracak kadar çoğalt
const programs = Array.from(track.children);
let totalWidth = track.scrollWidth;
while (totalWidth < wrapper.offsetWidth * 93) {
  programs.forEach(p => {
    const clone = p.cloneNode(true);
    track.appendChild(clone);
  });
  totalWidth = track.scrollWidth;
}

// Sonsuz kayan animasyon
let position = 0;
function animateScroll() {
  position -= 1; // kayma hızı
  if (position <= -track.scrollWidth / 2) {
    position = 0;
  }
  track.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animateScroll);
}

animateScroll();









 document.addEventListener('DOMContentLoaded', function () {
      const cards = document.querySelectorAll('.card');
      const listItems = document.querySelectorAll('.card ul li');
      const programsTrack = document.getElementById('programsTrack');
      const programs = document.querySelectorAll('.program');
      const skills = document.querySelectorAll('.skill');
      const headings = document.querySelectorAll('h2');

      gsap.registerPlugin(ScrollTrigger);

      // Başlık animasyonu
      gsap.fromTo(headings, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: headings[0], start: "top 90%" } });

      // Kart animasyonu
      gsap.utils.toArray(cards).forEach((card, i) => {
        gsap.fromTo(card, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.05, scrollTrigger: { trigger: card, start: "top 90%" } });
      });

      // Liste maddeleri animasyonu
      gsap.utils.toArray(listItems).forEach((li, i) => {
        gsap.to(li, { y: 0, opacity: 1, duration: 0.6, delay: i * 0.1, ease: "power3.out", scrollTrigger: { trigger: li, start: "top 95%" } });
      });

      // Programlar fade-in
      gsap.utils.toArray(programs).forEach((p, i) => {
        gsap.fromTo(p, { y: 20, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.1)", delay: i * 0.06, scrollTrigger: { trigger: p, start: "top 95%" } });
      });

      // Programları sonsuz sola kaydırma
      const totalWidth = programsTrack.scrollWidth;
      gsap.to(programsTrack, {
        x: `-=${totalWidth / 2}`,
        duration: 40,
        ease: "linear",
        repeat: -1
      });

      // Yetenek animasyonu
      gsap.utils.toArray(skills).forEach(skill => {
        const fill = skill.querySelector('.skill-fill');
        const percent = skill.dataset.percent || '70%';
        gsap.fromTo(skill, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: skill, start: "top 92%", onEnter: () => { gsap.to(fill, { width: percent, duration: 1.4, ease: "power2.out" }); } } });
      });
    });







     // Accordion
  const headers = document.querySelectorAll(".accordion-header");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      header.classList.toggle("active");
      if(content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        document.querySelectorAll(".accordion-content").forEach(c => c.style.maxHeight = null);
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });









    // Başa dön
  const backToTop = document.querySelector(".back-to-top");
  backToTop.addEventListener("click", () => {
    window.scrollTo({top:0, behavior:"smooth"});
  });







    document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault(); // sayfa yenilenmesin

  const form = e.target;
  const formData = new FormData(form);
  const messageBox = document.getElementById("formMessage");

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      messageBox.textContent = "✅ Mesajınız gönderildi!";
      messageBox.className = "success";
      form.reset();
    } else {
      messageBox.textContent = "❌ Mesaj gönderilemedi, tekrar deneyin.";
      messageBox.className = "error";
    }
  } catch (error) {
    messageBox.textContent = "❌ Bağlantı hatası, lütfen tekrar deneyin.";
    messageBox.className = "error";
  }
});





document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", (e) => {
    // Eğer direkt butona veya linke tıklanmışsa tekrar tetikleme
    if (e.target.tagName.toLowerCase() === "a" || e.target.closest("a")) return;

    const link = card.querySelector("a");
    if (link) {
      link.click(); // buton/link tıklanmış gibi çalışır
    }
  });
});









document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".hizmet-card");
  let resizeTimer;

  function closePanel(card) {
    const panel = card.querySelector(".card-panel");
    const btn = card.querySelector(".toggle-btn");
    card.classList.remove("active");
    panel.style.maxHeight = "0px";
    panel.style.opacity = "0";
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function openPanel(card) {
    const panel = card.querySelector(".card-panel");
    const btn = card.querySelector(".toggle-btn");
    card.classList.add("active");
    panel.style.maxHeight = panel.scrollHeight + "px";
    panel.style.opacity = "1";
    if (btn) btn.setAttribute("aria-expanded", "true");
  }

  function setMode() {
    const isMobile = window.innerWidth <= 991;

    cards.forEach((card) => {
      const header = card.querySelector("h3");
      const btn = card.querySelector(".toggle-btn");

      header.onclick = null;
      if (btn) btn.onclick = null;

      if (isMobile) {
        closePanel(card);

        const handler = (e) => {
          e.stopPropagation();
          cards.forEach((c) => {
            if (c !== card) closePanel(c);
          });

          if (card.classList.contains("active")) {
            closePanel(card);
          } else {
            openPanel(card);
          }
        };

        header.onclick = handler;
        if (btn) btn.onclick = handler;
      } else {
        card.classList.add("active");
        const panel = card.querySelector(".card-panel");
        const btn = card.querySelector(".toggle-btn");
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.opacity = "1";
        if (btn) btn.setAttribute("aria-expanded", "true");
      }
    });
  }

  window.addEventListener("load", setMode);

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setMode, 150);
  });
});
