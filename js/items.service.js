const ItemsService = {
  table: 'ec_items',

  async list(){
    return Utils.loadJSON(this.table, []);
  },

  async create(payload){
    const items = Utils.loadJSON(this.table, []);
    const id = items.length ? Math.max(...items.map(i=>i.id)) + 1 : 1;
    const entry = { id, ...payload, status:'available', created_at:new Date().toISOString() };
    items.push(entry);
    Utils.saveJSON(this.table, items);
    return entry;
  },

  async filter(filters){
    const list = await this.list();
    return list.filter(i=>{
      if(filters.category && i.category !== filters.category) return false;
      if(filters.city && i.city && i.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      return true;
    }).sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));
  },

  async latest(n){
    const all = await this.list();
    return all.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at)).slice(0,n);
  }
};
