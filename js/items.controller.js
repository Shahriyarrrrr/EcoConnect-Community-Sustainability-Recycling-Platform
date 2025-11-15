const ItemsController = {
  async list(filters){
    return ItemsService.filter(filters);
  },
  async create(payload){
    return ItemsService.create(payload);
  },
  async latest(n){
    return ItemsService.latest(n);
  }
};
