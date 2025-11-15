const RecyclersController = {
  async searchByCity(city){
    const list = await RecyclersService.list();
    return list.filter(r => r.city.toLowerCase() === city.toLowerCase());
  },

  async searchNearby(lat,lng,radius){
    const list = await RecyclersService.list();
    function dist(a,b,c,d){
      const R=6371;
      const dLat=(c-a)*Math.PI/180;
      const dLng=(d-b)*Math.PI/180;
      const x=Math.sin(dLat/2)**2 + Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(dLng/2)**2;
      return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
    }
    return list.map(r=>{
      const d = dist(lat, lng, r.latitude, r.longitude);
      return {...r, distance: Math.round(d*10)/10};
    }).filter(r=>r.distance <= radius).sort((a,b)=>a.distance-b.distance);
  }
};
