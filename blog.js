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
  'what-makes-daf-tech-ready-for-real-world': {
    category: 'Grantmaking & Fintech',
    date: 'September 24, 2026',
    readTime: '5 min read',
    author: 'Mike Christie',
    role: 'Fractional Chief Technology Officer',
    title: 'What Makes DAF Technology Ready for the Real World?',
    content: `
      <p class="lead-text">A polished interface can show what software does. The architecture underneath it determines how well it will continue to do it as complexity grows.</p>
      
      <p>When organizations evaluate donor-advised fund technology, the conversation often begins with functionality.</p>
      
      <p>Can donors recommend grants? Can advisors access the information they need? Can administrators manage transactions? Can the platform connect with other systems?</p>
      
      <p>Those are important questions. But from a technology perspective, there is another layer worth examining: <strong>how has the technology been designed to behave in the real world?</strong></p>

      <h3>A DAF doesn't operate in isolation</h3>
      <p>Modern charitable giving programs can involve donors, advisors, administrators, charities, banking relationships, investment accounts and external technology platforms.</p>
      
      <p>Each participant may need access to different information and functionality. Each integration introduces another point of interaction. And a seemingly simple transaction can touch several parts of the ecosystem before it is complete.</p>
      
      <p>That means good DAF technology needs more than functionality. <strong>It needs an architecture capable of supporting complexity.</strong></p>

      <p>Permissions are a good example. It isn't simply a question of whether someone can log in. The right person needs access to the right information and actions — without gaining access to things they shouldn't.</p>
      
      <p>The same applies to integrations. Connecting two systems is one thing. Designing for what happens when information is incomplete, an external service is unavailable or something doesn't behave as expected is another.</p>

      <h3>What happens when something goes wrong?</h3>
      <p>In production environments, not every transaction follows the expected path.</p>
      
      <p>That's when characteristics like traceability and audit history become particularly important.</p>
      
      <p>If something doesn't look right, an operations or technology team needs to be able to investigate:</p>
      <ul>
        <li>What happened?</li>
        <li>Who initiated it?</li>
        <li>What information was available at the time?</li>
        <li>Which systems were involved?</li>
        <li>Was something subsequently changed?</li>
      </ul>

      <div class="article-callout">
        <h4>Key Takeaway</h4>
        <p>A system that performs an action is useful. A system that also helps you understand how and why that action occurred is considerably more powerful.</p>
      </div>

      <h3>Scalability isn't only about volume</h3>
      <p>Scalability is often discussed in terms of more users and more transactions.</p>
      
      <p><strong>But complexity scales too.</strong></p>
      
      <p>As a charitable giving program grows, it may introduce new users, advisor relationships, investment structures, approval processes, integrations and reporting requirements.</p>
      
      <p>Technology needs to evolve alongside those needs without requiring the organization to continually build workarounds around it.</p>
      
      <p>This is one of the reasons FlightPath's history matters from a technology perspective.</p>
      
      <p>FlightPath grew out of technology built to support GiveWise Foundation Canada. The platform has therefore had to interact with real users, workflows, transactions and exceptions.</p>
      
      <p>Production environments expose assumptions that aren't always obvious during product design. Those experiences influence how technology gets built and refined.</p>

      <h3>Look beneath the interface</h3>
      <p>User experience should absolutely be part of any DAF technology evaluation.</p>
      
      <p>But organizations should also ask what sits underneath it:</p>
      <ul>
        <li>How are permissions handled?</li>
        <li>How does the platform interact with external systems?</li>
        <li>Can transactions and changes be traced?</li>
        <li>What happens when something fails?</li>
        <li>How easily can the technology accommodate new workflows as the organization evolves?</li>
      </ul>

      <p>Those questions may not produce the most exciting product demo. But they help reveal whether the technology has been designed not simply to work today, but to continue working as the organization around it becomes more complex.</p>

      <p class="article-closing-statement">
        Enterprise technology isn't defined only by how much a platform can do. It's defined by how reliably it can keep doing it as complexity grows.
      </p>
    `
  },
  'building-daf-software-is-easy': {
    category: 'DAF Infrastructure',
    date: 'September 16, 2026',
    readTime: '7 min read',
    author: 'Tammy Kyte',
    role: 'Co-Founder & President',
    title: 'Building DAF Software Is Easy. Operating a DAF Is Hard.',
    content: `
      <p class="lead-text">A polished donor experience matters. But the real test of donor-advised fund technology begins after the donor clicks “Submit.”</p>
      
      <p>The donor-advised fund technology landscape is evolving quickly. New platforms are entering the market. Financial institutions and foundations are exploring how technology can support their own DAF programs. Existing providers are modernizing their systems. And donors, advisors and administrators increasingly expect intuitive digital experiences.</p>
      
      <p>That is a positive development for the sector. But it also raises an important question for organizations evaluating DAF technology: <strong>How do you distinguish between software that looks ready to operate a DAF and software that has actually been shaped by operating one?</strong></p>
      
      <p>There is a meaningful difference.</p>

      <h3>The donor portal is only the visible layer</h3>
      <p>When evaluating DAF technology, it is natural to start with what you can see. Can a donor log in easily? Is the interface intuitive? Can they view their balance, make a grant recommendation or review their giving history? Can an advisor see the information they need?</p>
      
      <p>Those things matter. But they represent only the visible layer of a much larger operating system.</p>
      
      <p>Behind a seemingly simple action — <em>Recommend a $10,000 grant to this charity</em> — there can be a chain of operational questions and processes:</p>
      <ul>
        <li>Is the fund authorized to make the recommendation?</li>
        <li>Are sufficient funds available?</li>
        <li>Are those funds currently held in cash or invested?</li>
        <li>Has the charity been properly reviewed?</li>
        <li>Are there restrictions or designations associated with the grant?</li>
        <li>Who needs to approve it?</li>
        <li>How will the payment move?</li>
        <li>What information needs to accompany it?</li>
        <li>How will it be reconciled?</li>
        <li>What happens if something does not go according to plan?</li>
      </ul>

      <p>And once the transaction is complete, what needs to be recorded for reporting, audit history and future reference?</p>
      
      <div class="article-callout">
        <h4>Key Takeaway</h4>
        <p>The complexity of DAF technology is not simply making the Submit button work. It is making everything that happens after Submit work.</p>
      </div>

      <h3>Operating a DAF teaches you what a requirements document cannot</h3>
      <p>FlightPath grew out of GiveWise Foundation Canada, a registered Canadian charity that operates a donor-advised giving platform.</p>
      
      <p>GiveWise was not created as a software demonstration environment. It is a real operating foundation serving real donors and moving real charitable dollars.</p>
      
      <p>As GiveWise grew, so did the operational requirements behind it. Donations had to be received and recorded. Tax receipts had to be issued. Grants had to be processed. Charities had to be onboarded. Investment accounts and advisor relationships had to be managed. Banking and reconciliation had to work. Permissions, reporting and audit trails had to be reliable.</p>
      
      <p>Then came all the situations that do not fit neatly into the standard workflow. An unusual contribution. A grant exception. A donor who wants to remain anonymous. A recurring or scheduled grant. A designation that needs to follow the money correctly. An investment account that introduces another step into a transaction. Two systems whose numbers do not agree.</p>
      
      <p>These are difficult things to fully anticipate from a whiteboard. <strong>You learn them by operating.</strong></p>
      
      <p>Some of FlightPath’s most valuable capabilities were not dreamed up in a product meeting. They were discovered at reconciliation time, during a grant exception, while onboarding a charity, processing an unusual contribution, working with an investment advisor, or figuring out why two systems did not agree.</p>
      
      <p>That experience became part of the architecture of FlightPath.</p>

      <h3>GiveWise became the proving ground</h3>
      <p>FlightPath exists because GiveWise needed technology capable of supporting the realities of running a modern DAF.</p>
      
      <p>That distinction matters. Rather than beginning with a list of features that a DAF platform should have, the technology evolved alongside the actual work of administering donor-advised funds.</p>
      
      <p>A workflow could be tested not only against a product specification, but against the people who had to use it every day:</p>
      <ul>
        <li>Does this reduce administrative work?</li>
        <li>Does the accounting reconcile?</li>
        <li>Can the right person see the right information without seeing information they should not?</li>
        <li>What happens when a transaction falls outside the normal workflow?</li>
        <li>Can the operations team understand what happened six months later?</li>
        <li>Can the system support growth without requiring more spreadsheets, workarounds and institutional knowledge to hold everything together?</li>
      </ul>

      <p>Over time, those questions shape software differently. The result is not simply a collection of features. It is accumulated operational knowledge embedded into workflows.</p>

      <h3>What really happens after “Submit”?</h3>
      <p>For financial institutions, foundations, wealth firms and other organizations evaluating DAF technology, one of the most useful questions may also be one of the simplest: <strong>Do not just ask, “Can you show us the donor portal?” Ask, “What happens after the donor clicks Submit?”</strong></p>

      <p>Take a grant recommendation. The donor experience might involve choosing a charity, entering an amount and clicking a button. Underneath that action, a DAF platform may need to coordinate:</p>
      <ul>
        <li>Validation and permissions</li>
        <li>Fund availability and cash or investment positions</li>
        <li>Charity due diligence and grant eligibility</li>
        <li>Approval and administrative workflows</li>
        <li>Banking and disbursement</li>
        <li>Reconciliation and accounting</li>
        <li>Reporting and audit history</li>
        <li>Designations, anonymity and special instructions</li>
        <li>Integrations with external systems</li>
        <li>Exception handling when the transaction does not follow the expected path</li>
      </ul>

      <p>The exact workflow will differ between DAF programs and institutions. That is precisely the point. The question is not simply whether a platform can process the ideal transaction. It is whether its underlying infrastructure can support the operational realities around that transaction.</p>

      <h3>Feature lists only tell part of the story</h3>
      <p>Procurement processes understandably rely on feature comparisons.</p>
      <p><em>Does the platform support securities? Yes. Recurring grants? Yes. Advisor access? Yes. Charity onboarding? Yes. Custom reporting? Yes.</em></p>

      <p>Those comparisons are useful, but a checkmark cannot tell you how deeply a capability has been considered. There is a difference between a feature existing and a workflow having been exercised repeatedly in production.</p>

      <p>A more revealing conversation starts when you move beyond “Do you support this?” and ask “How does this work when…?”</p>
      <ul>
        <li>What happens when information is incomplete?</li>
        <li>What happens when someone changes their mind?</li>
        <li>What happens when an external system returns something unexpected?</li>
        <li>What happens when an administrator needs to correct a transaction without losing the original history?</li>
        <li>What happens when the exception becomes common enough that it needs to become a workflow?</li>
      </ul>

      <p>Those questions begin to reveal the operational maturity underneath the interface.</p>

      <h3>What should DAF sponsors ask technology providers?</h3>
      <p>Organizations evaluating DAF technology should certainly look at donor experience, functionality, integrations, implementation, security and scalability. But they should also investigate the operating experience behind the product.</p>

      <p>Ask how the platform's workflows were developed. Ask which processes have been used in production. Ask how exceptions are handled. Ask how reconciliation works. Ask how transaction histories are preserved. Ask how investment accounts, banking and grants interact. Ask how administrators investigate something that does not look right.</p>

      <p>And perhaps most importantly: <strong>Ask what the technology provider has learned from actually running these workflows.</strong> The answers can tell you considerably more than a feature checklist.</p>

      <h3>Built from the inside out</h3>
      <p>The growing interest in DAF technology is good for philanthropy. More organizations thinking seriously about donor experience, operational efficiency and better charitable infrastructure can ultimately create better tools for donors and the institutions that serve them.</p>

      <p>FlightPath brings a particular perspective to that work. It was built from inside a working donor-advised fund.</p>

      <p>GiveWise gave us a place to encounter the messy realities, exceptions and operational details that are difficult to see from outside. It allowed workflows to be tested against actual use rather than hypothetical use. And it continues to provide a real-world environment in which we can learn.</p>

      <p>That does not mean every DAF operates exactly like GiveWise. They do not. It means FlightPath was built with an understanding that real DAF operations rarely behave exactly like the happy path on a product demo.</p>

      <p>And that may be one of the most important things to look for in DAF technology.</p>

      <p><strong>Because the donor portal is what people see. The infrastructure underneath it is what makes the DAF work.</strong></p>
    `
  }
};

function initArticleModal() {
  const modal = document.getElementById('article-modal');
  const modalBody = document.getElementById('article-modal-body');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !modalBody) return;

  const openModal = (articleId) => {
    const data = ARTICLES_DATABASE[articleId] || ARTICLES_DATABASE['building-daf-software-is-easy'];
    
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
