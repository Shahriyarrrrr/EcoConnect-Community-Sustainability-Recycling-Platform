const LeaderboardController = {
  async top(n){
    const list = await LeaderboardService.getSorted();
    const users = Utils.loadJSON('ec_users', []);
    return list.slice(0,n).map((e, idx) => {
      const u = users.find(x=>x.id === e.user_id) || { name: 'Unknown' };
      return { rank: idx+1, user_id: e.user_id, name: u.name, points: e.points || 0 };
    });
  },

  async addPoints(user_id, points){
    await LeaderboardService.add(user_id, points);
  },

  async recalculate(){
    const users = Utils.loadJSON('ec_users', []);
    const items = Utils.loadJSON('ec_items', []);
    const txs = Utils.loadJSON('ec_transactions', []);
    await LeaderboardService.clear();
    users.forEach(u => LeaderboardService.set(u.id, 0));
    items.forEach(i => {
      if(i.user_id) LeaderboardService.add(i.user_id, 5);
    });
    txs.forEach(t => {
      if(t.collected_by) LeaderboardService.add(t.collected_by, 20);
      if(t.recycler_id && t.status === 'completed') LeaderboardService.add(t.recycler_id, 15);
    });
  },

  async recalcAndReturnTop(n){
    await this.recalculate();
    return this.top(n);
  }
};
