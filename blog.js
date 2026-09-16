/**
 * FlightPath Blog Interactivity & Reader Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initBlogFilter();
  initBlogSearch();
  initArticleModal();
});

/* ==========================================
   Blog Category Filter Pills
   ========================================== */
function initBlogFilter() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.blog-card');
  const noResults = document.getElementById('no-results');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const selectedCategory = pill.getAttribute('data-category');
      let visibleCount = 0;

      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });
}

/* ==========================================
   Live Search Bar
   ========================================== */
function initBlogSearch() {
  const searchInput = document.getElementById('blog-search-input');
  const cards = document.querySelectorAll('.blog-card');
  const noResults = document.getElementById('no-results');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    let visibleCount = 0;

    cards.forEach(card => {
      const title = card.querySelector('.insight-title').textContent.toLowerCase();
      const desc = card.querySelector('.insight-desc').textContent.toLowerCase();
      const category = card.getAttribute('data-category').toLowerCase();

      if (title.includes(query) || desc.includes(query) || category.includes(query)) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
}

/* ==========================================
   Article Full Reader Modal
   ========================================== */
const ARTICLES_DATABASE = {
  'daf-wealth-management': {
    category: 'DAF Infrastructure',
    date: 'September 14, 2026',
    readTime: '5 min read',
    author: 'Tammy Kyte',
    role: 'Co-Founder & President',
    title: 'Modernizing Donor-Advised Funds for Wealth Management',
    content: `
      <p class="lead-text">Donor-Advised Funds (DAFs) represent the fastest-growing charitable vehicle in North America. For wealth management firms, integrating seamless DAF infrastructure is no longer just a value-add—it is an essential client retention strategy.</p>
      
      <h3>The Changing Expectations of High-Net-Worth Donors</h3>
      <p>Modern donors expect the same frictionless, digital experience from their philanthropic accounts that they receive from their online brokerage and banking portals. Legacy manual processing—involving paper forms, delayed approvals, and opaque wire transfers—is falling out of favor.</p>
      
      <h3>Key Pillars of Modern DAF Infrastructure</h3>
      <ul>
        <li><strong>API-First Architecture:</strong> Embed fund creation and grant recommendation directly within existing wealth portals.</li>
        <li><strong>Real-Time Donee Verification:</strong> Automatically cross-reference charity registration status against CRA and IRS databases.</li>
        <li><strong>Unified Ledger Sync:</strong> Maintain automated accounting sync across donor statements and advisor portals.</li>
      </ul>
      
      <div class="article-callout">
        <h4>Key Takeaway</h4>
        <p>By automating back-office compliance and payment delivery, wealth managers can spend less time managing paperwork and more time delivering strategic philanthropic guidance to their clients.</p>
      </div>
      
      <h3>How FlightPath Solves DAF Operational Load</h3>
      <p>FlightPath provides the underlying software and managed service layer that powers DAF programs without requiring financial institutions to build complex compliance machinery from scratch.</p>
    `
  },
  'realtime-disbursements': {
    category: 'Grantmaking & Fintech',
    date: 'August 28, 2026',
    readTime: '4 min read',
    author: 'Dan Kyte',
    role: 'Co-Founder',
    title: 'Streamlining Real-Time Charitable Disbursements',
    content: `
      <p class="lead-text">Traditional grant disbursements often take weeks or months to reach recipient charities due to manual verification, paper check processing, and fragmented banking channels.</p>
      
      <h3>Eliminating Paper Checks in Institutional Giving</h3>
      <p>Paper checks remain susceptible to loss, fraud, and delays. Modern financial technology enables secure electronic fund transfers (EFT) directly into verified charity bank accounts.</p>
      
      <h3>Automated Exception Handling</h3>
      <p>When an electronic transfer encounters an issue—such as outdated account details—FlightPath's managed service team resolves the exception automatically, keeping institutional operations running smoothly.</p>
    `
  },
  'scalable-foundation-tech': {
    category: 'Charitable Operations',
    date: 'July 19, 2026',
    readTime: '6 min read',
    author: 'Mike Christie',
    role: 'Product Lead',
    title: 'Building Scalable Infrastructure for Foundation Giving',
    content: `
      <p class="lead-text">As foundations expand their grant portfolios, manual administrative tasks scale non-linearly. Software infrastructure must scale efficiently to accommodate high transaction volumes.</p>
      
      <h3>Architectural Best Practices</h3>
      <p>Decoupling donor-facing user interfaces from core payment processing engines allows foundations to scale their digital offerings without breaking backend compliance engines.</p>
    `
  },
  'charity-verification-rails': {
    category: 'Compliance & Security',
    date: 'June 12, 2026',
    readTime: '5 min read',
    author: 'Cristie Moews',
    role: 'Operations & Compliance Lead',
    title: 'Automated Verification & CRA Compliance in Canadian Philanthropy',
    content: `
      <p class="lead-text">Ensuring that funds are disbursed strictly to qualified donees is a legal requirement for Canadian foundations and DAF providers.</p>
      
      <h3>Automated Registry Syncing</h3>
      <p>FlightPath continuously monitors CRA active charity databases, flagging revoked registrations or status changes instantly before any funds are released.</p>
    `
  },
  'future-of-giving-apis': {
    category: 'Grantmaking & Fintech',
    date: 'May 04, 2026',
    readTime: '4 min read',
    author: 'Shawn Neumann',
    role: 'Strategic Advisor',
    title: 'The API Economy in Modern Charitable Giving',
    content: `
      <p class="lead-text">API-first architecture allows wealth management tools, family office dashboards, and donor portals to communicate effortlessly with underlying disbursement systems.</p>
    `
  },
  'family-office-philanthropy': {
    category: 'DAF Infrastructure',
    date: 'April 22, 2026',
    readTime: '5 min read',
    author: 'Tammy Kyte',
    role: 'Co-Founder & President',
    title: 'Empowering Next-Gen Generational Wealth Through DAFs',
    content: `
      <p class="lead-text">Family offices are increasingly utilizing donor-advised funds as a structured platform to engage next-generation family members in philanthropic governance and grant decisions.</p>
    `
  }
};

function initArticleModal() {
  const modal = document.getElementById('article-modal');
  const modalBody = document.getElementById('article-modal-body');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !modalBody) return;

  const openModal = (articleId) => {
    const data = ARTICLES_DATABASE[articleId] || ARTICLES_DATABASE['daf-wealth-management'];
    
    modalBody.innerHTML = `
      <div class="article-modal-header">
        <span class="insight-badge">${data.category}</span>
        <span class="insight-date">${data.date} • ${data.readTime}</span>
      </div>
      <h1 class="article-modal-title">${data.title}</h1>
      <div class="article-author-info">
        <div class="author-avatar-placeholder"><i class="fas fa-user-circle"></i></div>
        <div>
          <div class="author-name">${data.author}</div>
          <div class="author-role">${data.role}</div>
        </div>
      </div>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 1.8rem 0;">
      <div class="article-modal-content">
        ${data.content}
      </div>
      <div class="article-modal-footer">
        <a href="index.html#contact" class="btn btn-primary">Speak With Our Team <i class="fas fa-arrow-right"></i></a>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-article');
    if (trigger) {
      e.preventDefault();
      const articleId = trigger.getAttribute('data-article-id');
      openModal(articleId);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}
