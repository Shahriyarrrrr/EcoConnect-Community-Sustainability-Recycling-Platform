const Storage = {

  mode: CONFIG.STORAGE_MODE,

  async get(table) {
    if (this.mode === "local") {
      return Utils.loadJSON(table, []);
    }
    // future: fetch(API)
  },

  async set(table, data) {
    if (this.mode === "local") {
      Utils.saveJSON(table, data);
      return true;
    }
  },

  async insert(table, entry) {
    if (this.mode === "local") {
      const list = Utils.loadJSON(table, []);
      list.push(entry);
      Utils.saveJSON(table, list);
      return entry;
    }
  },

  async update(table, id, updates) {
    if (this.mode === "local") {
      const list = Utils.loadJSON(table, []);
      const idx = list.findIndex(item => item.id === id);
      if (idx === -1) return false;
      list[idx] = { ...list[idx], ...updates };
      Utils.saveJSON(table, list);
      return true;
    }
  },

  async delete(table, id) {
    if (this.mode === "local") {
      let list = Utils.loadJSON(table, []);
      list = list.filter(item => item.id !== id);
      Utils.saveJSON(table, list);
      return true;
    }
  },

  async findById(table, id) {
    const list = await this.get(table);
    return list.find(i => i.id === id) || null;
  }
};
