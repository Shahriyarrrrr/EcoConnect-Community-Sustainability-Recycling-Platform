const RecyclersService = {
  table: 'ec_recyclers',

  async seed(){
    const r = Utils.loadJSON(this.table, null);
    if(!r){
      const sample = [{
        id:1,
        name:'GreenCollect Ltd',
        contact:'01710000000',
        email:'info@greencollect.local',
        city:'Dhaka',
        latitude:23.8103,
        longitude:90.4125
      }];
      Utils.saveJSON(this.table, sample);
    }
  },

  async list(){
    await this.seed();
    return Utils.loadJSON(this.table, []);
  }
};
