document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. Header & Sticky Footer CTA Scroll Handling
  // ==========================================================================
  const header = document.getElementById('site-header');
  const stickyCta = document.getElementById('sticky-cta-footer');
  const firstView = document.getElementById('first-view');
  
  const handleScroll = () => {
    const scrollPos = window.scrollY;
    
    // Header transition
    if (scrollPos > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Sticky CTA showing after First View (fv-cta-button scroll out)
    if (firstView) {
      const fvHeight = firstView.offsetHeight;
      if (scrollPos > fvHeight - 150) {
        stickyCta.classList.add('show');
      } else {
        stickyCta.classList.remove('show');
      }
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
  
  // ==========================================================================
  // 2. Tab Interaction (Lifestyle Scenes Section)
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Deactivate all tabs and panels
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      
      // Activate clicked tab
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      
      // Activate corresponding panel
      const targetPanelId = button.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
  
  // ==========================================================================
  // 3. FAQ Accordion Interaction
  // ==========================================================================
  const faqButtons = document.querySelectorAll('.faq-question-btn');
  
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const targetAnswerId = button.getAttribute('aria-controls');
      const targetAnswer = document.getElementById(targetAnswerId);
      
      // Close other FAQs if desired (uncomment if you want single-open behavior)
      /*
      faqButtons.forEach(otherBtn => {
        if (otherBtn !== button) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherAnsId = otherBtn.getAttribute('aria-controls');
          const otherAns = document.getElementById(otherAnsId);
          if (otherAns) {
            otherAns.classList.remove('show');
            otherAns.setAttribute('hidden', '');
          }
        }
      });
      */
      
      // Toggle current FAQ
      button.setAttribute('aria-expanded', !expanded);
      if (targetAnswer) {
        if (expanded) {
          targetAnswer.classList.remove('show');
          // Delay setting hidden to allow smooth height animation transition to finish
          setTimeout(() => {
            if (!button.getAttribute('aria-expanded') === 'true') {
              targetAnswer.setAttribute('hidden', '');
            }
          }, 400);
        } else {
          targetAnswer.removeAttribute('hidden');
          // RequestAnimationFrame to ensure 'hidden' removal is processed before adding class (helps animation)
          requestAnimationFrame(() => {
            targetAnswer.classList.add('show');
          });
        }
      }
    });
  });
  
  // ==========================================================================
  // 4. Scroll Animation (Intersection Observer)
  // ==========================================================================
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const observerOptions = {
    root: null, // use the viewport
    rootMargin: '0px',
    threshold: 0.15 // trigger when 15% of the element is visible
  };
  
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appeared');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animateElements.forEach(element => {
    scrollObserver.observe(element);
  });
  
});
