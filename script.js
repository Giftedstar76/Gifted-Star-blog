// Section switching
function showSection(id) {
  document.querySelectorAll('main section').forEach(sec => sec.classList.remove('show'));
  document.getElementById(id).classList.add('show');
}

// ========== GALLERY ==========
const galleryForm = document.getElementById('gallery-form');
const galleryList = document.getElementById('gallery-list');

function loadGallery() {
  galleryList.innerHTML = '';
  const items = JSON.parse(localStorage.getItem('gallery') || '[]');
  items.forEach(({type, url}, idx) => {
    let el;
    if (type === 'image') {
      el = document.createElement('img');
      el.src = url;
      el.alt = 'Memory';
    } else {
      el = document.createElement('video');
      el.src = url;
      el.controls = true;
    }
    el.title = url;
    el.style.marginRight = '5px';
    el.onclick = () => { if (confirm('Delete this media?')) removeGallery(idx); };
    galleryList.appendChild(el);
  });
}
function addGallery(e) {
  e.preventDefault();
  const url = document.getElementById('media-url').value.trim();
  const type = document.getElementById('media-type').value;
  if (!url) return;
  const items = JSON.parse(localStorage.getItem('gallery') || '[]');
  items.unshift({type, url});
  localStorage.setItem('gallery', JSON.stringify(items));
  galleryForm.reset();
  loadGallery();
}
function removeGallery(idx) {
  const items = JSON.parse(localStorage.getItem('gallery') || '[]');
  items.splice(idx, 1);
  localStorage.setItem('gallery', JSON.stringify(items));
  loadGallery();
}
galleryForm.onsubmit = addGallery;
loadGallery();

// ========== DIARY ==========
const diaryForm = document.getElementById('diary-form');
const diaryList = document.getElementById('diary-list');

function loadDiary() {
  diaryList.innerHTML = '';
  const entries = JSON.parse(localStorage.getItem('diary') || '[]');
  entries.forEach(({title, text, date}, idx) => {
    const div = document.createElement('div');
    div.className = 'diary-entry';
    div.innerHTML = `<h3>${title}</h3>
      <div class="diary-date">${date}</div>
      <div>${text.replace(/\n/g, '<br>')}</div>
      <button onclick="removeDiary(${idx})" title="Delete entry">🗑️</button>
    `;
    diaryList.appendChild(div);
  });
}
function addDiary(e) {
  e.preventDefault();
  const title = document.getElementById('diary-title').value.trim();
  const text = document.getElementById('diary-entry').value.trim();
  if (!title || !text) return;
  const entries = JSON.parse(localStorage.getItem('diary') || '[]');
  const date = new Date().toLocaleString();
  entries.unshift({title, text, date});
  localStorage.setItem('diary', JSON.stringify(entries));
  diaryForm.reset();
  loadDiary();
}
function removeDiary(idx) {
  if (!confirm('Delete this diary entry?')) return;
  const entries = JSON.parse(localStorage.getItem('diary') || '[]');
  entries.splice(idx, 1);
  localStorage.setItem('diary', JSON.stringify(entries));
  loadDiary();
}
diaryForm.onsubmit = addDiary;
loadDiary();
window.removeDiary = removeDiary;

// ========== BUCKET LIST ==========
const bucketForm = document.getElementById('bucket-form');
const bucketList = document.getElementById('bucket-list');

function loadBucket() {
  bucketList.innerHTML = '';
  const items = JSON.parse(localStorage.getItem('bucket') || '[]');
  items.forEach(({text, done}, idx) => {
    const li = document.createElement('li');
    li.className = done ? 'completed' : '';
    li.textContent = text;
    li.onclick = () => toggleBucket(idx);
    // Delete button
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '🗑️';
    delBtn.title = 'Delete goal';
    delBtn.onclick = (e) => { e.stopPropagation(); removeBucket(idx); };
    li.appendChild(delBtn);
    bucketList.appendChild(li);
  });
}
function addBucket(e) {
  e.preventDefault();
  const text = document.getElementById('bucket-item').value.trim();
  if (!text) return;
  const items = JSON.parse(localStorage.getItem('bucket') || '[]');
  items.unshift({text, done: false});
  localStorage.setItem('bucket', JSON.stringify(items));
  bucketForm.reset();
  loadBucket();
}
function toggleBucket(idx) {
  const items = JSON.parse(localStorage.getItem('bucket') || '[]');
  items[idx].done = !items[idx].done;
  localStorage.setItem('bucket', JSON.stringify(items));
  loadBucket();
}
function removeBucket(idx) {
  if (!confirm('Remove this item from your bucket list?')) return;
  const items = JSON.parse(localStorage.getItem('bucket') || '[]');
  items.splice(idx, 1);
  localStorage.setItem('bucket', JSON.stringify(items));
  loadBucket();
}
bucketForm.onsubmit = addBucket;
loadBucket();