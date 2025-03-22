// ===== IDEA CATEGORY FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const ideaCards = document.querySelectorAll('.idea-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-category');

    ideaCards.forEach(card => {
      const match = card.getAttribute('data-category') === category || category === 'all';
      card.style.display = match ? 'block' : 'none';
    });
  });
});

// ===== DARK MODE TOGGLE =====
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('mode', 'dark');
  } else {
    localStorage.setItem('mode', 'light');
  }
});

// Load saved mode on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('mode');
  if (savedMode === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Load dynamically added ideas (if any) from localStorage
  const ideasGrid = document.querySelector('.ideas-grid');
  const storedIdeas = JSON.parse(localStorage.getItem('userIdeas')) || [];

  storedIdeas.forEach((idea, index) => {
    const ideaCard = document.createElement('div');
    ideaCard.classList.add('idea-card');
    ideaCard.setAttribute('data-category', idea.field.toLowerCase());
    ideaCard.innerHTML = `
      <h3>${idea.title}</h3>
      <p>${idea.description}</p>
      <small><strong>Submitted by:</strong> ${idea.name} (${idea.education}, ${idea.institute})</small>
    `;
    ideasGrid.appendChild(ideaCard);
  });
});

// ===== BACK TO TOP BUTTON =====
const topBtn = document.getElementById("topBtn");

window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};

topBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ===== USER IDEA SUBMISSION (MODAL FORM) =====
const userIdeaForm = document.getElementById('userIdeaForm');

if (userIdeaForm) {
  userIdeaForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const ideaData = {
      name: document.getElementById('fullName').value,
      email: document.getElementById('userEmail').value,
      education: document.getElementById('education').value,
      field: document.getElementById('field').value,
      institute: document.getElementById('institute').value,
      title: document.getElementById('ideaTitle').value,
      description: document.getElementById('ideaDesc').value,
      date: new Date().toLocaleString()
    };

    let allIdeas = JSON.parse(localStorage.getItem('userIdeas')) || [];
    allIdeas.push(ideaData);
    localStorage.setItem('userIdeas', JSON.stringify(allIdeas));

    alert("✅ Idea submitted successfully!");
    userIdeaForm.reset();
    document.getElementById('ideaModal').style.display = 'none';

    // Optional: Add idea instantly to grid
    const ideasGrid = document.querySelector('.ideas-grid');
    const ideaCard = document.createElement('div');
    ideaCard.classList.add('idea-card');
    ideaCard.setAttribute('data-category', ideaData.field.toLowerCase());
    ideaCard.innerHTML = `
      <h3>${ideaData.title}</h3>
      <p>${ideaData.description}</p>
      <small><strong>Submitted by:</strong> ${ideaData.name} (${ideaData.education}, ${ideaData.institute})</small>
    `;
    ideasGrid.appendChild(ideaCard);
  });
}
