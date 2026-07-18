const skillGroups = [
  { title: 'Programming Languages', items: ['C++', 'Python', 'JavaScript'] },
  { title: 'Frameworks & Libraries', items: ['React.js', 'Node.js', 'Django'] },
  { title: 'Engineering & CAD Software', items: ['AutoCAD', 'SolidWorks', 'NI LabVIEW', 'Altium Designer'] },
  { title: 'Developer Tools', items: ['Git', 'GitHub', 'VS Code'] }
];

const education = [
  {
    institution: 'Hong Kong Metropolitan University (HKMU)',
    degree: 'Bachelor of Engineering (Hons) in Electronic and Computer Engineering',
    details: 'Year 2 • GPA 2.8 / 4.0'
  },
  {
    institution: 'Don Bosco Matriculation Higher Secondary School',
    degree: 'Higher Secondary Certificate (Class 12)',
    details: 'India • Academic performance: 78%'
  }
];

const experience = [
  {
    organization: 'KTC Group',
    role: 'Administrative & Automation Assistant',
    duration: 'May 2026 – June 2026',
    responsibilities: [
      'Designed and implemented automation scripts to optimize workplace workflows.',
      'Streamlined operational and administrative processes using automated data tasks.'
    ]
  },
  {
    organization: 'Hong Kong Metropolitan University (HKMU)',
    role: 'Student Laboratory Helper',
    duration: 'April 2024 – Present',
    responsibilities: [
      'Assisted faculty and researchers on thermoelectric generator (TEG) systems and aircraft cooling pads.',
      'Managed lab equipment setups, component testing, and provided hands-on assistance to peers.'
    ]
  }
];

const leadership = [
  {
    organization: 'IEEE Student Branch',
    role: 'Treasurer',
    duration: '2024 – 2025',
    responsibilities: [
      'Managed financial budgeting and fund allocation for regional engineering events.',
      'Maintained transparent, structured financial records for the student chapter.'
    ]
  }
];

const projects = [
  {
    title: 'Modular Farming System',
    text: 'An engineered hardware-software integration solution leveraging automated tracking and hardware coordination.',
    link: '#projects'
  },
  {
    title: 'HK Calorie Tracker',
    text: 'A web application tailored for tracking daily nutritional metrics with localized food data.',
    link: '#projects'
  }
];

const typedText = document.getElementById('typed-text');
const phrases = ['practical engineering solutions', 'interactive web applications', 'innovative systems with purpose'];
let phraseIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    typedText.textContent = current.slice(0, ++letterIndex);
    if (letterIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typedText.textContent = current.slice(0, --letterIndex);
    if (letterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 50 : 90);
}

function renderSkills() {
  const container = document.getElementById('skills-grid');
  container.innerHTML = skillGroups
    .map(
      (group) => `
        <article class="skill-card">
          <h3>${group.title}</h3>
          <ul class="tag-list">
            ${group.items.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </article>
      `
    )
    .join('');
}

function renderEducation() {
  const container = document.getElementById('education-grid');
  container.innerHTML = education
    .map(
      (item) => `
        <article class="timeline-card">
          <h3>${item.institution}</h3>
          <div class="timeline-meta">
            <span>${item.degree}</span>
          </div>
          <p>${item.details}</p>
        </article>
      `
    )
    .join('');
}

function renderExperience() {
  const container = document.getElementById('experience-grid');
  container.innerHTML = experience
    .map(
      (item) => `
        <article class="timeline-card">
          <div class="timeline-meta">
            <span>${item.organization}</span>
            <span>${item.duration}</span>
          </div>
          <h3>${item.role}</h3>
          <ul>
            ${item.responsibilities.map((entry) => `<li>${entry}</li>`).join('')}
          </ul>
        </article>
      `
    )
    .join('');
}

function renderLeadership() {
  const container = document.getElementById('leadership-grid');
  container.innerHTML = leadership
    .map(
      (item) => `
        <article class="timeline-card">
          <div class="timeline-meta">
            <span>${item.organization}</span>
            <span>${item.duration}</span>
          </div>
          <h3>${item.role}</h3>
          <ul>
            ${item.responsibilities.map((entry) => `<li>${entry}</li>`).join('')}
          </ul>
        </article>
      `
    )
    .join('');
}

function renderProjects() {
  const container = document.getElementById('projects-grid');
  container.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card">
          <h3>${project.title}</h3>
          <p>${project.text}</p>
          <a href="${project.link}">View case study →</a>
        </article>
      `
    )
    .join('');
}

function createParticleField() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  const particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.6 + 0.6
  }));

  let mouse = { x: 0, y: 0, active: false };

  window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseout', () => {
    mouse.active = false;
  });

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          p.x -= dx * 0.0025;
          p.y -= dy * 0.0025;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 247, 255, 0.8)';
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(107, 124, 255, ${1 - dist / 110})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  resize();
  animate();
  window.addEventListener('resize', resize);
}

renderSkills();
renderEducation();
renderExperience();
renderLeadership();
renderProjects();
createParticleField();
typeLoop();
