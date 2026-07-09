/* ==========================================================================
   PORTFOLIO JS CORE LOGIC
   Features: Theme Management, Bilingual Routing, Navigation Animations,
             Dynamic Project & Blog Modals, Contact Form Validator.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. STATE & CORE SELECTORS
  // ------------------------------------------------------------------------
  const htmlElement = document.documentElement;
  const bodyElement = document.body;
  const themeToggleBtn = document.getElementById('theme-toggle');
  const langToggleBtn = document.getElementById('lang-toggle');
  const headerElement = document.getElementById('header');
  const scrollProgressBar = document.getElementById('scroll-progress');
  
  // Mobile navigation drawer selectors
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Modal selectors
  const modalContainer = document.getElementById('modal-container');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalContentTarget = document.getElementById('modal-content-target');

  // ------------------------------------------------------------------------
  // 2. THEME MANAGER (DARK / LIGHT MODE)
  // ------------------------------------------------------------------------
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      bodyElement.classList.remove('dark-theme');
      bodyElement.classList.add('light-theme');
    } else {
      bodyElement.classList.add('dark-theme');
      bodyElement.classList.remove('light-theme');
    }
  };

  const toggleTheme = () => {
    if (bodyElement.classList.contains('dark-theme')) {
      bodyElement.classList.remove('dark-theme');
      bodyElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      bodyElement.classList.add('dark-theme');
      bodyElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  };

  themeToggleBtn.addEventListener('click', toggleTheme);
  initTheme();

  // ------------------------------------------------------------------------
  // 3. BILINGUAL LANGUAGE ROUTER (AR / EN)
  // ------------------------------------------------------------------------
  const initLanguage = () => {
    const savedLang = localStorage.getItem('language') || 'ar';
    setLanguage(savedLang);
  };

  const setLanguage = (lang) => {
    if (lang === 'en') {
      htmlElement.setAttribute('lang', 'en');
      htmlElement.setAttribute('dir', 'ltr');
      document.title = "Mohammed Maroof Barkat | Portfolio";
    } else {
      htmlElement.setAttribute('lang', 'ar');
      htmlElement.setAttribute('dir', 'rtl');
      document.title = "محمد معروف بركات | معرض الأعمال";
    }
    localStorage.setItem('language', lang);
  };

  const toggleLanguage = () => {
    const currentLang = htmlElement.getAttribute('lang') || 'ar';
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    
    // Add page transition fade out
    bodyElement.style.opacity = 0.4;
    bodyElement.style.transition = 'opacity 0.15s ease';
    
    setTimeout(() => {
      setLanguage(nextLang);
      bodyElement.style.opacity = 1;
    }, 150);
  };

  langToggleBtn.addEventListener('click', toggleLanguage);
  initLanguage();

  // ------------------------------------------------------------------------
  // 4. MOBILE NAVBAR DRAWERS
  // ------------------------------------------------------------------------
  const toggleMobileMenu = () => {
    mobileToggleBtn.classList.toggle('open');
    navMenu.classList.toggle('open');
  };

  const closeMobileMenu = () => {
    mobileToggleBtn.classList.remove('open');
    navMenu.classList.remove('open');
  };

  mobileToggleBtn.addEventListener('click', toggleMobileMenu);
  
  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close mobile menu on resize to desktop view width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  // ------------------------------------------------------------------------
  // 5. SCROLL EFFECTS & ACTIVE LINK HIGHLIGHTS
  // ------------------------------------------------------------------------
  const handleScrollEffects = () => {
    const scrollPos = window.scrollY;
    const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Scroll progress bar indicator width
    if (winHeight > 0) {
      const scrolledFraction = (scrollPos / winHeight) * 100;
      scrollProgressBar.style.width = `${scrolledFraction}%`;
    }

    // Sticky header layout shift class
    if (scrollPos > 50) {
      headerElement.classList.add('scrolled');
    } else {
      headerElement.classList.remove('scrolled');
    }

    // Nav-link active highlight logic
    const scrollOffset = 150; // offset to trigger active state earlier
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - scrollOffset;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScrollEffects);

  // ------------------------------------------------------------------------
  // 6. PROJECTS SEARCH & FILTER UTILITY
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active tag from buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        // Fade out cards first
        card.style.opacity = 0;
        card.style.transform = 'scale(0.8)';
        card.style.transition = 'all 0.3s ease';

        setTimeout(() => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'flex';
            // Trigger browser paint
            setTimeout(() => {
              card.style.opacity = 1;
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 200);
      });
    });
  });

  // ------------------------------------------------------------------------
  // 7. BILINGUAL MODAL DATABASE (DYNAMIC INJECTION)
  // ------------------------------------------------------------------------
  const projectDetailsDb = {
    "1": {
      ar: {
        title: "منصة أثر للتبرعات الإنسانية",
        category: "تطوير الويب",
        desc: "منصة أثر الخيرية هي حل تقني يهدف إلى تسهيل التبرعات الإنسانية وتوفير وسيلة آمنة للمتبرعين للوصول إلى الحالات الإنسانية المحتاجة في اليمن . يتميز التطبيق بلوحة تحكم للمؤسسات لعرض المساعدات، ونظام تتبع للمشاريع المنجزة، ونظام إشعارات ذكي للمستخدمين مع تقارير مالية دورية.",
        tech: ["HTML5", "CSS3 / Grid", "JavaScript (ES6)", "Laravel", "MySQL Database"],
  
      },
      en: {
        title: "Athar Charitable Donation Platform",
        category: "Web Development",
        desc: "Athar Platform is an integrated technical solution designed to facilitate humanitarian donations and provide a secure method for donors to support relief cases in Yemen and beyond. The application features an administrative dashboard for organizations to publish relief requests, project trackers for transparency, and financial reports.",
        tech: ["HTML5", "CSS3 / Grid", "JavaScript (ES6)", "Laravel", "MySQL Database"],
  
      }
    },
    "2": {
      ar: {
        title: "نظام حاسوبي لإدارة المطاعم",
        category: "إدارة الأنظمة وقواعد البيانات",
        desc: "نظام بسيط يساعد على إدارة المطعم من خلال تتبع الطلبات والمبيعات والعمليات اليومية.",
        tech: ["C#", "SQL Server", "Relational Database Design"],
  
      },
      en: {
        title: "Restaurant Management System",
        category: "Systems & Databases",
        desc: "A simple system for managing a restaurant by tracking orders, sales, and daily operations.",
        tech: ["C# .NET", "SQL Server", "Relational Database Design" ],
  
      }
    },
    "3": {
      ar: {
        title: "تطبيق تحليل الشخصية",
        category: "خوارزميات وجافاسكريبت",
        desc: "تطبيق بسيط لتحليل الشخصية باستخدام أسئلة واضحة ومباشرة.",
        tech: ["HTML5", "CSS3", "JavaScript (ES6)"],
  
      },
      en: {
        title: "Personality Analysis Application",
        category: "Algorithms & JS",
        desc: "A simple personality analysis app using clear and direct questions.",
        tech: ["HTML5", "CSS3", "JavaScript (ES6)"],
  
      }
    },
    "4": {
      ar: {
        title: "تطبيق إدارة المصروف اليومي",
        category: "تطوير الويب",
        desc: "تطبيق بسيط لمتابعة المصروف اليومي وتنظيم الإنفاق بسهولة.",
        tech: ["React.js","HTML5", "CSS Grid / Flexbox","localStorage "],
  
      },
      en: {
        title: "Daily Expense Management App",
        category: "Web Development",
        desc: "A simple app for tracking daily expenses and organizing spending with ease.",
        tech: ["React.js","HTML5", "CSS Grid / Flexbox","localStorage "],
  
      }
    },
    "5": {
      ar: {
        title: "منصة إدارة المهام اليومية (TaskFlow)",
        category: "تطوير الويب",
        desc: "منصة بسيطة لتنظيم المهام وإدارة الأعمال اليومية بشكل منظم.",
        tech: ["React.js", "HTML5 Drag & Drop", "CSS Modules", "Local Database Integration"],
  
      },
      en: {
        title: "To-Do & Task Management Platform",
        category: "Web Development",
        desc: "A simple platform for organizing tasks and managing daily work in an orderly way.",
        tech: ["React.js", "HTML5 Drag & Drop", "CSS Modules", "Local Database Integration"],
  
      }
    },
  };

  const blogDetailsDb = {
    "1": {
      ar: {
        title: "التقنية ليست أجهزة... بل رسالة",
        badge: "تقنية",
        desc: `عندما يسمع الناس كلمة <strong>التقنية</strong> يتبادر إلى أذهانهم الحواسيب والهواتف والشبكات، لكن التقنية في حقيقتها رسالة قبل أن تكون مهنة. فهي وسيلة لخدمة الناس، وتسهيل حياتهم، وحل مشكلاتهم اليومية.<br><br>

مختص تقنية المعلومات لا يقتصر دوره على إصلاح الأجهزة أو تثبيت البرامج، بل يساعد المؤسسات والأفراد على العمل بكفاءة وأمان. فكل نظام يتم تطويره، وكل شبكة يتم تأمينها، وكل مشكلة يتم حلها، هي أثر إيجابي ينعكس على حياة الآخرين.<br><br>

إن النجاح في هذا المجال لا يعتمد فقط على الشهادات، وإنما على حب التعلم المستمر، والقدرة على التفكير المنطقي، والصبر عند مواجهة المشكلات. فالتقنية تتغير باستمرار، ومن يتوقف عن التعلم يتوقف عن التطور.<br><br>

اجعل هدفك أن تستخدم معرفتك لبناء حلول نافعة، وأن تترك أثرًا طيبًا في كل مشروع تعمل عليه. فالعلم الحقيقي هو الذي ينفع الناس، والتقنية تصبح أكثر قيمة عندما تقترن بالأخلاق والإتقان.`,
        tech: ["Technology as a Mission", "IT Ethics", "Continuous Learning", "Human-centered Tech"]
      },
      en: {
        title: "Technology Is More Than Devices... It's a Mission",
        badge: "Technology",
        desc: `Technology is often associated with computers, servers, and networks, but its true value lies in serving people. Every application, website, or support ticket solved contributes to improving someone's daily life.<br><br>

An IT professional does far more than repair devices. They protect data, improve productivity, secure infrastructures, and help organizations achieve their goals through technology.<br><br>

Success in technology depends on continuous learning, analytical thinking, and patience. The industry evolves every day, and professionals who embrace lifelong learning remain valuable throughout their careers.<br><br>

Technology becomes meaningful when it is combined with integrity, responsibility, and a genuine desire to create solutions that positively impact society.`,
        tech: ["Technology as a Mission", "IT Ethics", "Continuous Learning", "Impactful Solutions"]
      }
    },

    "2": {
      ar: {
        title: "بين لوحة المفاتيح والمصحف",
        badge: "إيماني",
        desc: `قد يظن البعض أن النجاح في التقنية يعتمد فقط على المهارات والخبرة، لكن الإنسان يحتاج إلى غذاء للعقل والروح معًا. فكما يحتاج المطور إلى تحديث معرفته، يحتاج قلبه أيضًا إلى ما يجدد إيمانه.<br><br>

يمكن للمسلم أن يجمع بين الإبداع في عمله والمحافظة على عبادته، فيبدأ يومه بقراءة القرآن، ويحافظ على الصلاة، ويخلص في أداء مسؤولياته. هذا التوازن يمنحه راحة نفسية وثباتًا في مواجهة ضغوط الحياة والعمل.<br><br>

الإسلام يحث على إتقان العمل، وكل ساعة يقضيها الإنسان في تعلم علم نافع أو خدمة الناس بإخلاص هي عبادة يؤجر عليها إذا صحت النية.<br><br>

ليكن نجاحك المهني وسيلة للتقرب إلى الله، وليس سببًا للانشغال عنه، فالعلم والإيمان إذا اجتمعا صنعَا إنسانًا مؤثرًا ومتوازنًا.`,
        tech: ["Faith & Career Balance", "Ethical Excellence", "Spiritual Productivity", "Purposeful Work"]
      },
      en: {
        title: "Between the Keyboard and the Quran",
        badge: "Faith",
        desc: `Professional success requires more than technical expertise. While the mind grows through learning, the heart grows through faith, purpose, and spiritual balance.<br><br>

A successful Muslim professional strives for excellence at work while maintaining daily prayers, reading the Quran, and acting with honesty and integrity. This balance provides inner peace and resilience during life's challenges.<br><br>

Islam encourages excellence in every task. Every project completed sincerely and every problem solved to benefit others can become an act of worship when accompanied by the right intention.<br><br>

The greatest achievement is not only becoming a skilled engineer or developer, but also becoming a person whose knowledge is guided by faith and whose work benefits humanity.`,
        tech: ["Faith & Career Balance", "Ethical Excellence", "Spiritual Productivity", "Meaningful Impact"]
      }
    },

    "3": {
      ar: {
        title: "بناء الذات رحلة لا تنتهي",
        badge: "تطوير الذات",
        desc: `بناء الذات ليس قرارًا يُتخذ في يوم واحد، بل رحلة مستمرة من التعلم والتطوير والعمل على تحسين النفس. فالنجاح الحقيقي هو نتيجة لعادات صغيرة تتكرر كل يوم.<br><br>

لا تنتظر الظروف المثالية حتى تبدأ، فكل خطوة صغيرة تقربك من أهدافك. اقرأ كتابًا، تعلم مهارة جديدة، مارس الرياضة، أو خصص وقتًا للتأمل ومراجعة إنجازاتك اليومية.<br><br>

قد تواجه الفشل أو الإحباط، لكنهما جزء طبيعي من رحلة النجاح. المهم أن تتعلم من أخطائك، وتنهض في كل مرة أقوى وأكثر خبرة.<br><br>

استثمر في نفسك، لأن أعظم مشروع ستعمل عليه طوال حياتك هو أنت. وكل يوم تصبح فيه أفضل من الأمس هو نجاح يستحق الاحتفال.`,
        tech: ["Self Growth", "Daily Habits", "Resilience", "Lifelong Learning"]
      },
      en: {
        title: "Self-Development Is a Lifelong Journey",
        badge: "Self Growth",
        desc: `Personal growth is not achieved overnight. It is the result of consistent habits, continuous learning, and the willingness to improve a little every single day.<br><br>

Do not wait for perfect circumstances before taking action. Read books, learn new skills, exercise regularly, and reflect on your daily progress. Small improvements eventually produce extraordinary results.<br><br>

Failure is not the opposite of success—it is part of the journey. Every setback teaches valuable lessons and prepares you for greater achievements ahead.<br><br>

The most important investment you will ever make is the investment in yourself. Becoming a better person each day is the foundation of lasting success in every area of life.`,
        tech: ["Self Growth", "Daily Habits", "Resilience", "Lifelong Learning"]
      }
    }
  };

  // Open Modal function
  const openModal = (type, id) => {
    const currentLang = htmlElement.getAttribute('lang') || 'ar';
    let data;

    if (type === 'project') {
      data = projectDetailsDb[id] ? projectDetailsDb[id][currentLang] : null;
    } else if (type === 'blog') {
      data = blogDetailsDb[id] ? blogDetailsDb[id][currentLang] : null;
    }

    if (!data) return;

    let contentHtml = '';

    if (type === 'project') {
      const techTagsHtml = data.tech.map(t => `<span class="modal-tech-tag">${t}</span>`).join('');
      
      contentHtml = `
        <img src="assets/project${id}.svg" alt="${data.title}" class="modal-img">
        <span class="modal-badge">${data.category}</span>
        <h3 class="modal-title">${data.title}</h3>
        <p class="modal-desc">${data.desc}</p>
        
        <h4 class="modal-meta-title">
          ${currentLang === 'ar' ? 'التقنيات المستخدمة:' : 'Technologies Used:'}
        </h4>
        <div class="modal-tech-list">${techTagsHtml}</div>  
      `;
    } else if (type === 'blog') {
      const techTagsHtml = (data.tech || []).map(t => `<span class="modal-tech-tag">${t}</span>`).join('');
      
      contentHtml = `
        <span class="modal-badge">${data.badge}</span>
        <h3 class="modal-title">${data.title}</h3>
        <p class="modal-desc">${data.desc}</p>
        
        <h4 class="modal-meta-title">
          ${currentLang === 'ar' ? 'الكلمات المفتاحية:' : 'Category Tags:'}
        </h4>
        <div class="modal-tech-list">${techTagsHtml}</div>
      `;
    }

    modalContentTarget.innerHTML = contentHtml;
    modalContainer.classList.add('active');
    bodyElement.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeModal = () => {
    modalContainer.classList.remove('active');
    bodyElement.style.overflow = 'auto'; // Restore background scroll
    setTimeout(() => {
      modalContentTarget.innerHTML = '';
    }, 300);
  };

  // Project details trigger click handler
  const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
  viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal('project', projectId);
    });
  });

  // Blog read more click handler
  const blogReadMoreBtns = document.querySelectorAll('.blog-read-more-btn');
  blogReadMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const blogId = btn.getAttribute('data-post');
      openModal('blog', blogId);
    });
  });

  // Close triggers
  modalCloseBtn.addEventListener('click', closeModal);
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      closeModal();
    }
  });

  // Close modal on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
      closeModal();
    }
  });

  // ------------------------------------------------------------------------
  // 8. CONTACT FORM CLIENT-SIDE VALIDATION & AJAX RESPONSE
  // ------------------------------------------------------------------------
  const validateForm = () => {
    let isValid = true;

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');

    // Reset styles
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(g => g.classList.remove('invalid'));

    // Validate Name
    if (nameInput.value.trim() === '') {
      nameInput.parentElement.classList.add('invalid');
      isValid = false;
    }

    // Validate Email (Regular Expression validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.parentElement.classList.add('invalid');
      isValid = false;
    }

    // Validate Message
    if (messageInput.value.trim() === '') {
      messageInput.parentElement.classList.add('invalid');
      isValid = false;
    }

    return isValid;
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Show loading spinner
    submitBtn.classList.add('loading');

    // Simulate server side AJAX submit latency
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      successOverlay.classList.add('active');
      contactForm.reset();
    }, 1800);
  });

  // Close Success Message Dialog
  successCloseBtn.addEventListener('click', () => {
    successOverlay.classList.remove('active');
  });

  // ------------------------------------------------------------------------
  // 9. PREMIUM CV DOWNLOAD TRIGGER (SIMULATION)
  // ------------------------------------------------------------------------
  const downloadCvBtn = document.getElementById('download-cv-btn');
  downloadCvBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const currentLang = htmlElement.getAttribute('lang') || 'ar';
    const msg = currentLang === 'ar'
      ? 'جاري تجهيز السيرة الذاتية للمهندس محمد معروف بصيغة PDF وتحميلها فوراً...'
      : 'Preparing Eng. Mohammed Maroof\'s PDF Resume for immediate download...';

    const originalText = downloadCvBtn.innerHTML;
    downloadCvBtn.style.pointerEvents = 'none';
    downloadCvBtn.innerHTML = `
      <span class="btn-icon"><i class="fa-solid fa-circle-notch fa-spin"></i></span>
      <span>${currentLang === 'ar' ? 'جاري التحميل...' : 'Downloading...'}</span>
    `;

    alert(msg);

    setTimeout(() => {
      downloadCvBtn.style.pointerEvents = 'auto';
      downloadCvBtn.innerHTML = originalText;

      const pdfUrl = downloadCvBtn.getAttribute('href');
      if (pdfUrl) {
        const tempLink = document.createElement('a');
        tempLink.href = pdfUrl;
        tempLink.download = downloadCvBtn.getAttribute('download') || 'Mohammed-Maroof-CV.pdf';
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
      } else {
        window.open('assets/cv.pdf', '_blank');
      }
    }, 1500);
  });


});
