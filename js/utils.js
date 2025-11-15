const Utils = {

  generateId(prefix = "") {
    return prefix + "_" + Math.random().toString(36).substring(2, 12);
  },

  formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleString();
  },

  showMessage(id, text, type = "info") {
    const el = document.getElementById(id);
    if (!el) return;

    el.innerHTML = `
      <div class="notification" style="border-color:${type === 'error' ? '#e76f51' : '#2a9d8f'};">
        ${text}
      </div>`;

    setTimeout(() => el.innerHTML = "", 3000);
  },

  saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  loadJSON(key, fallback = null) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  },

  confirmAction(text) {
    return window.confirm(text);
  },

  slugify(text) {
    return text.toLowerCase().replaceAll(" ", "-").replace(/[^a-z0-9\-]/g, "");
  }
};
