// =============================================
// popup.js - FINAL FIXED VERSION (with permission restore)
// =============================================

let dirHandle = null;
let db = null;

// IndexedDB setup
async function getDB() {
  if (db) return db;
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('diaryDB', 1);
    request.onupgradeneeded = (e) => e.target.result.createObjectStore('handles');
    request.onsuccess = (e) => { db = e.target.result; resolve(db); };
    request.onerror = (e) => reject(e.target.error);
  });
}

// Get + restore permission for saved folder
async function getStoredDir() {
  const database = await getDB();
  return new Promise((resolve) => {
    const tx = database.transaction('handles', 'readonly');
    const req = tx.objectStore('handles').get('diaryDir');
    req.onsuccess = () => resolve(req.result);
  });
}

async function storeDir(handle) {
  const database = await getDB();
  return new Promise((resolve) => {
    const tx = database.transaction('handles', 'readwrite');
    tx.objectStore('handles').put(handle, 'diaryDir');
    tx.oncomplete = resolve;
  });
}

// Request persistent permission (this is the key fix)
async function ensurePermission(handle) {
  if (!handle) return false;
  const perm = await handle.queryPermission({ mode: 'readwrite' });
  if (perm === 'granted') return true;

  const newPerm = await handle.requestPermission({ mode: 'readwrite' });
  return newPerm === 'granted';
}

// =============================================
// Init & UI
// =============================================
async function init() {
  try {
    dirHandle = await getStoredDir();
    if (dirHandle && await ensurePermission(dirHandle)) {
      document.getElementById('selectFolder').style.display = 'none';
      document.getElementById('main').style.display = 'block';
      showStatus('✅ Folder restored with permission!', 'green');
    }
  } catch (e) {
    console.error(e);
  }
}

document.getElementById('selectFolder').addEventListener('click', async () => {
  try {
    dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
    await storeDir(dirHandle);
    document.getElementById('selectFolder').style.display = 'none';
    document.getElementById('main').style.display = 'block';
    showStatus('🎉 Folder ready!', 'green');
  } catch (e) {
    showStatus('Selection cancelled', 'orange');
  }
});

// =============================================
// Save & Load (with permission check)
// =============================================
async function withPermission(action) {
  if (!dirHandle || !(await ensurePermission(dirHandle))) {
    showStatus('Permission needed — please re-select folder', 'red');
    document.getElementById('selectFolder').style.display = 'block';
    document.getElementById('main').style.display = 'none';
    return false;
  }
  return true;
}

document.getElementById('save').addEventListener('click', async () => {
  if (!(await withPermission())) return;
  const date = document.getElementById('date').value;
  const content = document.getElementById('content').value.trim();
  if (!content) return showStatus('Write something first!', 'orange');

  try {
    const fileHandle = await dirHandle.getFileHandle(`${date}.md`, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
    showStatus(`✅ Saved ${date}.md`, 'green');
  } catch (e) {
    showStatus('Save failed: ' + e.message, 'red');
  }
});

document.getElementById('load').addEventListener('click', async () => {
  if (!(await withPermission())) return;
  const date = document.getElementById('date').value;

  try {
    const fileHandle = await dirHandle.getFileHandle(`${date}.md`);
    const file = await fileHandle.getFile();
    document.getElementById('content').value = await file.text();
    showStatus(`📂 Loaded ${date}.md`, 'blue');
  } catch (e) {
    document.getElementById('content').value = '';
    showStatus('New entry', 'orange');
  }
});

function showStatus(msg, color = 'black') {
  const el = document.getElementById('status');
  el.textContent = msg;
  el.style.color = color;
}

// Default date
document.getElementById('date').value = new Date().toISOString().slice(0, 10);

init();