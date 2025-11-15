const RecyclerService = {
  table: 'ec_recyclers',
  txTable: 'ec_transactions',
  itemsTable: 'ec_items',

  async list(){
    return Utils.loadJSON(this.table, []);
  },

  async findByUserId(user_id){
    const list = Utils.loadJSON(this.table, []);
    return list.find(r=>r.user_id===user_id) || null;
  },

  async createProfile(user_id, payload){
    const list = Utils.loadJSON(this.table, []);
    const id = list.length ? Math.max(...list.map(x=>x.id))+1 : 1;
    const entry = { id, user_id, verified:false, ...payload };
    list.push(entry);
    Utils.saveJSON(this.table, list);
    return entry;
  },

  async update(user_id, updates){
    const list = Utils.loadJSON(this.table, []);
    const idx = list.findIndex(r=>r.user_id===user_id);
    if(idx===-1) throw new Error('Not found');
    list[idx] = {...list[idx], ...updates};
    Utils.saveJSON(this.table, list);
    return list[idx];
  },

  async addRequest(recycler_id, item_id){
    const txs = Utils.loadJSON(this.txTable, []);
    const id = txs.length ? Math.max(...txs.map(x=>x.id))+1 : 1;
    const entry = { id, recycler_id, item_id, status:'requested', created_at:new Date().toISOString() };
    txs.push(entry);
    Utils.saveJSON(this.txTable, txs);
    return entry;
  },

  async listRequests(recycler_id){
    const txs = Utils.loadJSON(this.txTable, []);
    const items = Utils.loadJSON(this.itemsTable, []);
    return txs.filter(t=>t.recycler_id===recycler_id).map(t=>({
      ...t,
      item: items.find(i=>i.id===t.item_id)
    }));
  },

  async updateRequest(id, status){
    const txs = Utils.loadJSON(this.txTable, []);
    const idx = txs.findIndex(t=>t.id===id);
    if(idx===-1) throw new Error('Not found');
    txs[idx].status = status;
    Utils.saveJSON(this.txTable, txs);
    return txs[idx];
  }
};
