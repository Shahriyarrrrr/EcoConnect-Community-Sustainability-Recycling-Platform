const UserService = {
  table: 'ec_users',

  async seedAdmin(){
    let users = Utils.loadJSON(this.table, []);
    if (!users || users.length === 0) {
      users = [{
        id: 1,
        name: 'Admin',
        email: 'admin@ecoconnect.local',
        password: 'Admin@123',
        role: 'admin',
        city: 'Dhaka',
        avatar: ''
      }];
      Utils.saveJSON(this.table, users);
    }
  },

  async list(){
    return Utils.loadJSON(this.table, []);
  },

  async findByEmail(email){
    const users = Utils.loadJSON(this.table, []);
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async findById(id){
    const users = Utils.loadJSON(this.table, []);
    return users.find(u => u.id === id) || null;
  },

  async create(payload){
    const users = Utils.loadJSON(this.table, []);
    const exists = users.find(u => u.email.toLowerCase() === payload.email.toLowerCase());
    if (exists) throw new Error('Email already registered');
    const id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
    const user = {
      id,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role || 'resident',
      city: payload.city || '',
      latitude: payload.lat || null,
      longitude: payload.lng || null,
      avatar: payload.avatar || '',
      created_at: new Date().toISOString()
    };
    users.push(user);
    Utils.saveJSON(this.table, users);
    return user;
  },

  async authenticate(email, password){
    const users = Utils.loadJSON(this.table, []);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    return user;
  },

  async update(id, updates){
    const users = Utils.loadJSON(this.table, []);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('User not found');
    users[idx] = { ...users[idx], ...updates, updated_at: new Date().toISOString() };
    Utils.saveJSON(this.table, users);
    return users[idx];
  },

  async remove(id){
    let users = Utils.loadJSON(this.table, []);
    users = users.filter(u => u.id !== id);
    Utils.saveJSON(this.table, users);
    return true;
  }
};
