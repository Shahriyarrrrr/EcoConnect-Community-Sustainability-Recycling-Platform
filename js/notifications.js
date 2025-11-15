const Notifications = {
  key: 'ec_notifications',

  push(text, user_id = 0){
    const list = Utils.loadJSON(this.key, []);
    const entry = { id: Utils.generateId('ntf'), text, user_id, created_at: new Date().toISOString(), read: false };
    list.push(entry);
    Utils.saveJSON(this.key, list);
  },

  listFor(user_id){
    const list = Utils.loadJSON(this.key, []);
    return list.filter(n => n.user_id === user_id || n.user_id === 0).sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));
  },

  markRead(id){
    const list = Utils.loadJSON(this.key, []);
    const idx = list.findIndex(n => n.id === id);
    if(idx === -1) return;
    list[idx].read = true;
    Utils.saveJSON(this.key, list);
  },

  renderBell(containerId, user_id){
    const container = document.getElementById(containerId);
    if(!container) return;
    const list = this.listFor(user_id);
    const unread = list.filter(x=>!x.read).length;
    container.innerHTML = `<a href="#" id="notiBell" style="font-weight:700">Notifications ${unread?`(${unread})`:''}</a>`;
    const el = document.getElementById('notiBell');
    el.addEventListener('click', function(e){
      e.preventDefault();
      const out = list.map(n=>`<div style="padding:8px;border-bottom:1px solid #eef2f6"><div>${n.text}</div><div class="small">${new Date(n.created_at).toLocaleString()}</div></div>`).join('') || '<div class="small">No notifications</div>';
      alert('Notifications:\\n\\n' + list.map(x=>`${x.text} — ${new Date(x.created_at).toLocaleString()}`).join('\\n'));
    });
  }
};
