/**
 * FlightPath Interactive Script
 * Handles custom animations, interactive tabs, scroll observers, and HubSpot Form submission.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initStatCounters();
  initArchitectureTabs();
  initWorkflowObserver();
  initHubSpotForm();
  initEmailLink();
});

/* ==========================================
   Header Scroll State
   ========================================== */
function initHeaderScroll() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================
   Mobile Navigation Menu
   ========================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      toggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
}

/* ==========================================
   Active Navigation Link on Scroll (ScrollSpy)
   ========================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================
   Numerical Stats Counter Animation
   ========================================== */
function initStatCounters() {
  const statsSection = document.getElementById('stats');
  const counters = document.querySelectorAll('.stat-number[data-target]');
  
  if (!statsSection || counters.length === 0) return;

  let animated = false;

  const countUp = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds animation
    const stepTime = Math.max(Math.floor(duration / 100), 15);
    let current = 0;
    const increment = Math.ceil(target / (duration / stepTime));

    const formatNum = (val) => {
      if (val >= 1000000) {
        return '$' + (val / 1000000).toFixed(0) + 'M+';
      } else if (val >= 1000) {
        return (val / 1000).toFixed(1).replace('.0', '') + 'K+';
      }
      return val + '+';
    };

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        // Force exact format from raw HTML value or formatting
        if (target === 146000000) {
          counter.textContent = '$146M';
        } else if (target === 2500) {
          counter.textContent = '2,500';
        } else if (target === 21000) {
          counter.textContent = '21,000+';
        } else {
          counter.textContent = formatNum(target);
        }
      } else {
        if (target === 146000000) {
          counter.textContent = '$' + (current / 1000000).toFixed(0) + 'M';
        } else if (target === 2500 || target === 21000) {
          counter.textContent = current.toLocaleString();
        } else {
          counter.textContent = current;
        }
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        counters.forEach(counter => countUp(counter));
        animated = true;
      }
    });
  }, { threshold: 0.2 });

  observer.observe(statsSection);
}

/* ==========================================
   System Architecture Interactive Tabs
   ========================================== */
function initArchitectureTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');
  const nodes = document.querySelectorAll('.layer-node');

  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      // Update active button state
      tabs.forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');

      // Update active text pane
      contents.forEach(content => {
        content.classList.remove('active');
        if (content.getAttribute('id') === `layer-${targetTab}`) {
          content.classList.add('active');
        }
      });

      // Update diagram nodes highlight
      nodes.forEach(node => {
        node.classList.remove('active-node');
        node.style.opacity = '0.4';
        node.style.transform = 'scale(0.95)';
        if (node.getAttribute('data-node') === targetTab) {
          node.classList.add('active-node');
          node.style.opacity = '1';
          node.style.transform = 'scale(1.05)';
        }
      });
    });
  });

  // Trigger click on first tab to initialize nodes state
  tabs[0].click();
}

/* ==========================================
   Workflow Progress Bar Scroll Animation
   ========================================== */
function initWorkflowObserver() {
  const workflowSection = document.getElementById('workflow');
  const progressBar = document.querySelector('.flow-progress-bar');
  const steps = document.querySelectorAll('.flow-step');

  if (!workflowSection || !progressBar) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBar.style.width = '100%';
        
        // Progressively highlight each step
        steps.forEach((step, idx) => {
          setTimeout(() => {
            step.classList.add('active');
          }, idx * 400); // 400ms offset per step
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(workflowSection);
}

/* ==========================================
   HubSpot Custom Form Handler
   ========================================== */
function initHubSpotForm() {
  const form = document.getElementById('lead-form');
  const statusEl = document.getElementById('form-status');
  
  if (!form || !statusEl) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset status element
    statusEl.style.display = 'none';
    statusEl.className = 'form-status';
    statusEl.innerHTML = '';

    // Get input values
    const firstName = form.querySelector('#first-name').value.trim();
    const lastName = form.querySelector('#last-name').value.trim();
    const company = form.querySelector('#company').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();
    const submitBtn = form.querySelector('.form-submit-btn');

    // Validation
    if (!firstName || !company || !email) {
      showFormStatus('error', '<i class="fas fa-exclamation-circle"></i> Please fill in all required fields.');
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormStatus('error', '<i class="fas fa-exclamation-circle"></i> Please enter a valid email address.');
      return;
    }

    // Disable button & show loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    const portalId = '23279711'; // Replace with your HubSpot HubID (e.g., 1234567)
    const formGuid = '3fa4dea9-142f-464c-8371-751a205e33cb'; // Replace with your HubSpot Form GUID
    
    const isConfigured = portalId !== 'YOUR_HUBSPOT_PORTAL_ID' && formGuid !== 'YOUR_HUBSPOT_FORM_GUID';

    // Prepare HubSpot API payload
    const payload = {
      fields: [
        { name: 'email', value: email },
        { name: 'firstname', value: firstName },
        { name: 'lastname', value: lastName || '' },
        { name: 'company', value: company },
        { name: 'message', value: message || '' }
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title
      }
    };

    if (isConfigured) {
      try {
        const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          showFormStatus('success', '<i class="fas fa-check-circle"></i> Thank you! Your request has been sent successfully. We will be in touch shortly.');
          form.reset();
        } else {
          const errorData = await response.json();
          console.error('HubSpot Submission Error:', errorData);
          showFormStatus('error', '<i class="fas fa-times-circle"></i> There was an error submitting the form. Please try again.');
        }
      } catch (err) {
        console.error('Network/Submission Error:', err);
        showFormStatus('error', '<i class="fas fa-wifi"></i> Connection failed. Please check your internet connection and try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    } else {
      // Demo fallback mode when placeholders are active
      console.group('%c[FlightPath HubSpot Form - Demo Mode]', 'color: #29abe2; font-weight: bold;');
      console.log('Form submission simulated successfully!');
      console.log('To link this form to your live HubSpot portal, replace the placeholder IDs in app.js around line 260 with your Portal ID and Form GUID.');
      console.log('Submitted Data:', { firstName, lastName, company, email, message });
      console.groupEnd();

      setTimeout(() => {
        showFormStatus('success', '<i class="fas fa-check-circle"></i> Thank you! Your request has been sent successfully. We will be in touch shortly.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        form.reset();
      }, 1200);
    }
  });

  function showFormStatus(type, htmlContent) {
    statusEl.innerHTML = htmlContent;
    statusEl.classList.add(type);
    statusEl.style.display = 'flex';
  }
}

/* ==========================================
   Email Link Clipboard Fallback Handler
   ========================================== */
function initEmailLink() {
  const emailLink = document.querySelector('.contact-method');
  if (!emailLink) return;

  const emailTextEl = emailLink.querySelector('.method-content p');
  if (!emailTextEl) return;

  const originalEmail = emailTextEl.textContent.trim();

  emailLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(originalEmail);
      
      // Provide visual feedback
      emailTextEl.innerHTML = '<span style="color: var(--color-accent-green); font-weight: 600;"><i class="fas fa-check"></i> Copied to clipboard!</span>';
      
      setTimeout(() => {
        emailTextEl.textContent = originalEmail;
      }, 2500);
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
    }
  });
}
