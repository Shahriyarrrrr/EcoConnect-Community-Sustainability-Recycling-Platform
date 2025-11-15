const RecyclerController = {
  async myProfile(user_id){
    let p = await RecyclerService.findByUserId(user_id);
    if(!p){
      const u = await UserService.findById(user_id);
      p = await RecyclerService.createProfile(user_id, { name:u.name, city:u.city||'', contact:'', hours:'', services:'' });
    }
    return p;
  },

  async updateProfile(user_id, data){
    return RecyclerService.update(user_id, data);
  },

  async myRequests(user_id){
    const p = await this.myProfile(user_id);
    return RecyclerService.listRequests(p.id);
  },

  async accept(id){
    return RecyclerService.updateRequest(id,'accepted');
  },

  async reject(id){
    return RecyclerService.updateRequest(id,'rejected');
  },

  async complete(id){
    return RecyclerService.updateRequest(id,'completed');
  }
};
