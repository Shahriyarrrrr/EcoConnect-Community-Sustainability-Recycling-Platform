const AdminService = {
  usersTable: 'ec_users',
  itemsTable: 'ec_items',
  recyclersTable: 'ec_recyclers',
  activityKey: 'ec_activity',

  async listUsers(){
    return Utils.loadJSON(this.usersTable, []);
  },

  async updateUser(id, updates){
    const users = Utils.loadJSON(this.usersTable, []);
    const idx = users.findIndex(u=>u.id===id);
    if(idx===-1) throw new Error('Not found');
    users[idx] = {...users[idx], ...updates, updated_at: new Date().toISOString()};
    Utils.saveJSON(this.usersTable, users);
    this.log(`User ${id} updated`);
    return users[idx];
  },

  async deleteUser(id){
    let users = Utils.loadJSON(this.usersTable, []);
    users = users.filter(u=>u.id!==id);
    Utils.saveJSON(this.usersTable, users);
    this.log(`User ${id} deleted`);
    return true;
  },

  async listItems(){
    return Utils.loadJSON(this.itemsTable, []);
  },

  async approveItem(id){
    const items = Utils.loadJSON(this.itemsTable, []);
    const idx = items.findIndex(i=>i.id===id);
    if(idx===-1) throw new Error('Not found');
    items[idx].status = 'available';
    Utils.saveJSON(this.itemsTable, items);
    this.log(`Item ${id} approved`);
    return true;
  },

  async removeItem(id){
    const items = Utils.loadJSON(this.itemsTable, []).map(i=> i.id===id ? {...i, status:'removed'} : i);
    Utils.saveJSON(this.itemsTable, items);
    this.log(`Item ${id} removed`);
    return true;
  },

  async listRecyclers(){
    return Utils.loadJSON(this.recyclersTable, []);
  },

  async verifyRecycler(id){
    const list = Utils.loadJSON(this.recyclersTable, []);
    const idx = list.findIndex(r=>r.id===id);
    if(idx===-1) throw new Error('Not found');
    list[idx].verified = true;
    Utils.saveJSON(this.recyclersTable, list);
    this.log(`Recycler ${id} verified`);
    return true;
  },

  async removeRecycler(id){
    let list = Utils.loadJSON(this.recyclersTable, []);
    list = list.filter(r=>r.id!==id);
    Utils.saveJSON(this.recyclersTable, list);
    this.log(`Recycler ${id} removed`);
    return true;
  },

  async stats(){
    const users = Utils.loadJSON(this.usersTable, []);
    const items = Utils.loadJSON(this.itemsTable, []);
    const activity = Utils.loadJSON(this.activityKey, []);
    return { users: users.length, items: items.length, recent: activity.slice(-6).reverse() };
  },

  async log(msg){
    const a = Utils.loadJSON(this.activityKey, []);
    a.push(`${new Date().toLocaleString()} — ${msg}`);
    Utils.saveJSON(this.activityKey, a);
  }
};
