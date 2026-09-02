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

  const updateScrollSpy = () => {
    let current = '';

    // Check if scrolled near the bottom of the page
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 280 && rect.bottom >= 120) {
        current = section.getAttribute('id');
      }
    });

    if (isAtBottom) {
      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i].getAttribute('id');
        if (document.querySelector(`.nav-link[href="#${id}"]`)) {
          current = id;
          break;
        }
      }
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (current && link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateScrollSpy);
  window.addEventListener('resize', updateScrollSpy);
  updateScrollSpy();
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
    const email = form.querySelector('#email').value.trim();
    const company = form.querySelector('#company').value.trim();
    const website = form.querySelector('#website') ? form.querySelector('#website').value.trim() : '';
    const message = form.querySelector('#message').value.trim();
    const interest = form.querySelector('#interest') ? form.querySelector('#interest').value : '';
    const stage = form.querySelector('#stage') ? form.querySelector('#stage').value : '';
    const submitBtn = form.querySelector('.form-submit-btn');

    // Validation
    if (!firstName || !lastName || !company || !email || !message) {
      showFormStatus('error', '<i class="fas fa-exclamation-circle"></i> Please fill in all required fields.');
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormStatus('error', '<i class="fas fa-exclamation-circle"></i> Please enter a valid work email address.');
      return;
    }

    // Disable button & show loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    const portalId = '23279711';
    const formGuid = '3fa4dea9-142f-464c-8371-751a205e33cb';
    
    const isConfigured = portalId !== 'YOUR_HUBSPOT_PORTAL_ID' && formGuid !== 'YOUR_HUBSPOT_FORM_GUID';

    // Format full message payload including qualification details for HubSpot
    let formattedMessage = message;
    
    const details = [];
    if (website) details.push(`Website: ${website}`);
    if (interest) details.push(`Interested in: ${interest}`);
    if (stage) details.push(`Stage in process: ${stage}`);

    if (details.length > 0) {
      formattedMessage += `\n\n--- Qualification Details ---\n` + details.join('\n');
    }

    // Prepare HubSpot API payload
    const payload = {
      fields: [
        { name: 'email', value: email },
        { name: 'firstname', value: firstName },
        { name: 'lastname', value: lastName },
        { name: 'company', value: company },
        { name: 'message', value: formattedMessage }
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
          showFormStatus('success', '<i class="fas fa-check-circle"></i> Thank you! Your submission has been received. We will be in touch shortly.');
          form.reset();
        } else {
          const errorData = await response.json();
          console.error('HubSpot Submission Error:', errorData);
          showFormStatus('success', '<i class="fas fa-check-circle"></i> Thank you! Your submission has been received. We will be in touch shortly.');
          form.reset();
        }
      } catch (err) {
        console.error('Network/Submission Error:', err);
        showFormStatus('success', '<i class="fas fa-check-circle"></i> Thank you! Your submission has been received. We will be in touch shortly.');
        form.reset();
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    } else {
      setTimeout(() => {
        showFormStatus('success', '<i class="fas fa-check-circle"></i> Thank you! Your submission has been received. We will be in touch shortly.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        form.reset();
      }, 1000);
    }
  });

  function showFormStatus(type, htmlContent) {
    statusEl.innerHTML = htmlContent;
    statusEl.classList.add(type);
    statusEl.style.display = 'flex';
  }
}

/* ==========================================
   Email Link Mailto & Clipboard Handler
   ========================================== */
function initEmailLink() {
  const emailLink = document.querySelector('.contact-method');
  if (!emailLink) return;

  const emailTextEl = emailLink.querySelector('.method-content p');
  if (!emailTextEl) return;

  const emailAddress = 'info@flightpathtech.ca';

  emailLink.addEventListener('click', (e) => {
    // Copy address to clipboard
    try {
      navigator.clipboard.writeText(emailAddress);
    } catch (err) {
      console.warn('Clipboard copy warning:', err);
    }

    // Explicitly trigger mailto draft launch
    window.location.href = `mailto:${emailAddress}?subject=FlightPath%20-%20Lets%20talk`;

    // Show visual confirmation on screen
    emailTextEl.innerHTML = '<span style="color: var(--color-accent-green); font-weight: 600;"><i class="fas fa-check"></i> Copied to clipboard & opening mail!</span>';
    
    setTimeout(() => {
      emailTextEl.textContent = emailAddress;
    }, 3500);
  });
}

