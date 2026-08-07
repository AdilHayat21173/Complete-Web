// new cards create karne hai, data local storage mein save karna hai
// localstorage se hi cards ko show karna hai
// buttons ko handle karna hai
// filters

const STORAGE_KEY = 'callAppContacts';
const catColor = { Emergency:'black', Important:'orange', Urgent:'purple', 'No Rush':'teal' };

let contacts = loadContacts();
let activeFilter = null;
let currentIndex = 0;

function loadContacts(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}
function saveContacts(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

function visibleList(){
  if(!activeFilter) return contacts;
  return contacts.filter(c => c.category === activeFilter);
}

function initials(name){
  return (name || '?').trim().split(/\s+/).map(w=>w[0]).slice(0,2).join('').toUpperCase();
}

function render(){
  const list = visibleList();
  const wrap = document.getElementById('card');
  const label = document.getElementById('idxLabel');

  if(currentIndex >= list.length) currentIndex = Math.max(0, list.length - 1);

  document.querySelectorAll('.dot').forEach(d=>{
    d.classList.toggle('active', activeFilter === d.dataset.cat);
  });

  if(list.length === 0){
    wrap.innerHTML = `<div class="empty"><div style="font-size:15px;font-weight:600;color:#888;">No calls yet</div><span>Tap + to log one</span></div>`;
    label.textContent = '';
    return;
  }

  const c = list[currentIndex];
  const avatarStyle = c.image
    ? `style="background-image:url('${c.image.replace(/'/g,"")}')"`
    : '';

  wrap.innerHTML = `
    <div class="avatar" ${avatarStyle}>${c.image ? '' : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;">${initials(c.name)}</div>`}</div>
    <h2>${escapeHtml(c.name || 'Unnamed')}</h2>
    <div class="row"><span>Home town</span><span>${escapeHtml(c.town || '—')}</span></div>
    <div class="row"><span>Purpose</span><span>${escapeHtml(c.purpose || '—')}</span></div>
    <div class="row"><span>Bookings</span><span>${c.bookings} time${c.bookings === 1 ? '' : 's'}</span></div>
    <div class="actions">
      <button class="btn-call" id="callBtn">&#9742; Call</button>
      <button class="btn-msg" id="msgBtn">Message</button>
    </div>
  `;

  document.getElementById('callBtn').onclick = () => {
    c.bookings += 1;
    saveContacts();
    render();
  };
  document.getElementById('msgBtn').onclick = () => {
    alert(`Message sent to ${c.name || 'contact'}.`);
  };

  label.textContent = `${currentIndex + 1} / ${list.length}`;
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

document.getElementById('upBtn').onclick = () => {
  const list = visibleList();
  if(list.length === 0) return;
  currentIndex = (currentIndex - 1 + list.length) % list.length;
  render();
};
document.getElementById('downBtn').onclick = () => {
  const list = visibleList();
  if(list.length === 0) return;
  currentIndex = (currentIndex + 1) % list.length;
  render();
};

document.querySelectorAll('.dot').forEach(dot=>{
  dot.onclick = () => {
    const cat = dot.dataset.cat;
    activeFilter = (activeFilter === cat) ? null : cat;
    currentIndex = 0;
    render();
  };
});

const overlay = document.getElementById('overlay');
document.getElementById('addBtn').onclick = () => {
  document.getElementById('fImage').value = '';
  document.getElementById('fName').value = '';
  document.getElementById('fTown').value = '';
  document.getElementById('fPurpose').value = '';
  document.querySelectorAll('input[name="cat"]').forEach(r => r.checked = false);
  document.querySelectorAll('.cat').forEach(l => l.classList.remove('sel-black','sel-orange','sel-purple','sel-teal'));
  overlay.classList.add('open');
};
document.getElementById('closeBtn').onclick = () => overlay.classList.remove('open');
overlay.onclick = (e) => { if(e.target === overlay) overlay.classList.remove('open'); };

document.querySelectorAll('.cat').forEach(label => {
  label.addEventListener('click', () => {
    setTimeout(() => {
      document.querySelectorAll('.cat').forEach(l => l.classList.remove('sel-black','sel-orange','sel-purple','sel-teal'));
      const checked = document.querySelector('input[name="cat"]:checked');
      if(checked){
        const sel = checked.closest('.cat');
        sel.classList.add('sel-' + sel.dataset.color);
      }
    }, 0);
  });
});

document.getElementById('createBtn').onclick = () => {
  const name = document.getElementById('fName').value.trim();
  if(!name){
    alert('Please enter a full name.');
    return;
  }
  const checked = document.querySelector('input[name="cat"]:checked');
  const category = checked ? checked.value : 'No Rush';

  contacts.push({
    id: Date.now(),
    image: document.getElementById('fImage').value.trim(),
    name: name,
    town: document.getElementById('fTown').value.trim(),
    purpose: document.getElementById('fPurpose').value.trim(),
    category: category,
    bookings: 1
  });
  saveContacts();
  overlay.classList.remove('open');
  activeFilter = null;
  currentIndex = contacts.length - 1;
  render();
};

render();
