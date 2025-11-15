const LeaderboardService = {
  key: 'ec_leaderboard',

  async init(){
    const lb = Utils.loadJSON(this.key, null);
    if(!lb){
      Utils.saveJSON(this.key, {});
    }
  },

  async list(){
    await this.init();
    return Utils.loadJSON(this.key, {});
  },

  async set(user_id, points){
    const lb = Utils.loadJSON(this.key, {});
    lb[user_id] = lb[user_id] || { user_id, points: 0, last_updated: null };
    lb[user_id].points = points;
    lb[user_id].last_updated = new Date().toISOString();
    Utils.saveJSON(this.key, lb);
  },

  async add(user_id, points){
    const lb = Utils.loadJSON(this.key, {});
    lb[user_id] = lb[user_id] || { user_id, points: 0, last_updated: null };
    lb[user_id].points = (lb[user_id].points || 0) + points;
    lb[user_id].last_updated = new Date().toISOString();
    Utils.saveJSON(this.key, lb);
  },

  async getSorted(){
    const raw = Utils.loadJSON(this.key, {});
    const arr = Object.values(raw || {});
    arr.sort((a,b)=> (b.points||0) - (a.points||0));
    return arr;
  },

  async clear(){
    Utils.saveJSON(this.key, {});
  }
};
