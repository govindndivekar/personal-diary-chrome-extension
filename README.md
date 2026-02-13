# My Diary

A **100% private, local-first** personal diary Chrome extension that saves every entry as a real `.md` (Markdown) file on your computer.

No accounts. No servers. No tracking. Just you and your thoughts — stored in plain files you can open in Obsidian, Typora, VS Code, or any text editor.

---

## ✨ Features

- Saves entries as daily Markdown files (`2026-02-14.md`)
- Full tab interface (click the icon → opens a clean writing tab)
- Remembers your diary folder forever
- Works completely offline
- Files are plain text — you own them
- Built with the modern File System Access API

---

## 🚀 How to Install

1. Download or clone this folder.
2. Open Chrome and go to `chrome://extensions/`
3. Turn on **Developer mode** (top right)
4. Click **"Load unpacked"** and select this folder
5. Pin the diary icon to your toolbar

> **Tip:** For a nice icon, add any 128×128 PNG named `icon.png` to the folder and reload the extension.

---

## 📖 How to Use

1. Click the diary icon in the toolbar → a new tab opens.
2. First time only: Click **"Choose Diary Folder"** and pick (or create) a folder (e.g., `Documents/My Diary`).
3. Pick a date → write your entry → click **Save Entry**.
4. Your entry is saved as a real `.md` file in the folder you chose.
5. To read past entries: select the date and click **Load**.

You can now open the entire folder in Obsidian, Logseq, or any Markdown app for a beautiful journal experience.

---

## 🛠️ How It Works

- Uses Chrome's **File System Access API** to read/write real files on your disk.
- Folder handle is securely stored in IndexedDB so you don't have to pick it every time.
- All data stays on your machine — nothing is sent anywhere.

**Privacy guarantee:** This extension has zero network permissions and never phones home.

---

## 📁 Project Structure
My-Diary-Extension/
├── manifest.json
├── background.js      ← Opens the diary tab when you click the icon
├── diary.html         ← The full writing interface
├── diary.js           ← All the diary logic
├── README.md          ← You're reading this
└── icon.png           ← (optional) 128×128 icon


---

## 🔮 Future Ideas (feel free to add!)

- Live Markdown preview
- Dark mode
- Calendar sidebar with all entries
- Search across diary files
- Auto-save
- One-click export to ZIP

Want any of these? Just open an issue or let me know — happy to add them!

---

## License

MIT — do whatever you want with it. Made with ❤️ for personal use.

icon - https://www.flaticon.com/free-icons/128 - 128 icons created by Shuvo.Das - Flaticon

---


**Made for people who want a simple, beautiful, truly private diary.**
