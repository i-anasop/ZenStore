// Demo auth backed by localStorage. Not real auth — for demonstration only.
(function () {
  const ZEN = (window.ZEN = window.ZEN || {});

  // Hash for demo purposes (not cryptographically secure).
  const hash = (s) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
    return String(h);
  };

  ZEN.getUsers = () => ZEN.ls.get('users', []);
  ZEN.getUser = () => ZEN.ls.get('user', null);

  ZEN.signup = ({ name, email, password }) => {
    if (!name || !email || !password) return { ok: false, error: 'Please fill in all fields.' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Please enter a valid email.' };
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };
    const users = ZEN.getUsers();
    if (users.find(u => u.email === email.toLowerCase())) return { ok: false, error: 'An account with that email already exists.' };
    const user = { name: name.trim(), email: email.toLowerCase(), passHash: hash(password), createdAt: Date.now() };
    users.push(user);
    ZEN.ls.set('users', users);
    ZEN.ls.set('user', { name: user.name, email: user.email });
    return { ok: true };
  };

  ZEN.login = ({ email, password }) => {
    if (!email || !password) return { ok: false, error: 'Please enter email and password.' };
    const user = ZEN.getUsers().find(u => u.email === email.toLowerCase());
    if (!user || user.passHash !== hash(password)) return { ok: false, error: 'Invalid email or password.' };
    ZEN.ls.set('user', { name: user.name, email: user.email });
    return { ok: true };
  };

  ZEN.logout = () => { ZEN.ls.del('user'); };

  ZEN.requireAuth = (redirectTo) => {
    if (!ZEN.getUser()) {
      const next = redirectTo || (location.pathname + location.search);
      location.href = ZEN.url('account/login/?next=' + encodeURIComponent(next));
      return false;
    }
    return true;
  };
})();
