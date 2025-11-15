const AdminController = {
  async listUsers(){ return AdminService.listUsers(); },
  async promoteUser(id){
    const u = (await AdminService.listUsers()).find(x=>x.id===id);
    if(!u) throw new Error('User not found');
    await AdminService.updateUser(id, { role: 'recycler' });
  },
  async demoteUser(id){
    const u = (await AdminService.listUsers()).find(x=>x.id===id);
    if(!u) throw new Error('User not found');
    await AdminService.updateUser(id, { role: 'resident' });
  },
  async deleteUser(id){ return AdminService.deleteUser(id); },

  async listItems(){ return AdminService.listItems().then(a=>a.filter(i=>i.status!=='removed')); },
  async approveItem(id){ return AdminService.approveItem(id); },
  async removeItem(id){ return AdminService.removeItem(id); },

  async listRecyclers(){ return AdminService.listRecyclers(); },
  async verifyRecycler(id){ return AdminService.verifyRecycler(id); },
  async removeRecycler(id){ return AdminService.removeRecycler(id); },

  async getStats(){ return AdminService.stats(); }
};
