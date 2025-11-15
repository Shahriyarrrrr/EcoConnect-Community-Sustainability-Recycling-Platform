const AuthController = (function(){
  const sessionKey = 'ec_session';
  UserService.seedAdmin();

  async function register(payload){
    const user = await UserService.create(payload);
    const leaderboard = Utils.loadJSON('ec_leaderboard', {});
    leaderboard[user.id] = { user_id: user.id, points: 0, last_updated: new Date().toISOString() };
    Utils.saveJSON('ec_leaderboard', leaderboard);
    return user;
  }

  async function login({ email, password }){
    const user = await UserService.authenticate(email, password);
    const session = { user_id: user.id, name: user.name, email: user.email, role: user.role };
    Utils.saveJSON(sessionKey, session);
    return session;
  }

  function logout(){
    localStorage.removeItem(sessionKey);
  }

  function current(){
    return Utils.loadJSON(sessionKey, null);
  }

  async function updateProfile({ name, city, avatar }){
    const s = current();
    if (!s) throw new Error('Not authenticated');
    const user = await UserService.findById(s.user_id);
    const updates = {};
    if (name) updates.name = name;
    if (city !== undefined) updates.city = city;
    if (avatar !== null) updates.avatar = avatar || user.avatar;
    const updated = await UserService.update(user.id, updates);
    Utils.saveJSON(sessionKey, { user_id: updated.id, name: updated.name, email: updated.email, role: updated.role });
    return updated;
  }

  async function changePassword({ currentPass, newPass }){
    const s = current();
    if (!s) throw new Error('Not authenticated');
    const user = await UserService.findById(s.user_id);
    if (user.password !== currentPass) throw new Error('Current password incorrect');
    if (newPass.length < 8 || !(/\d/.test(newPass) && /[a-zA-Z]/.test(newPass))) throw new Error('Password policy violation');
    await UserService.update(user.id, { password: newPass });
    return true;
  }

  async function deleteAccount(){
    const s = current();
    if (!s) throw new Error('Not authenticated');
    await UserService.remove(s.user_id);
    logout();
    return true;
  }

  return { register, login, logout, current, updateProfile, changePassword, deleteAccount };
})();
