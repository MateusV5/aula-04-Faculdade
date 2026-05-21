document.addEventListener('DOMContentLoaded', () => {

  // ─── DB helpers ────────────────────────────────────────────
  const DB = {
    init() {
      if (!localStorage.getItem('users')) localStorage.setItem('users', '[]');
      if (!localStorage.getItem('todos'))  localStorage.setItem('todos',  '[]');
    },
    getUsers()  { return JSON.parse(localStorage.getItem('users')); },
    getTodos()  { return JSON.parse(localStorage.getItem('todos')); },
    saveUsers(u){ localStorage.setItem('users', JSON.stringify(u)); },
    saveTodos(t){ localStorage.setItem('todos',  JSON.stringify(t)); },
    getCurrentUser() { return JSON.parse(localStorage.getItem('currentUser')); },
    setCurrentUser(u){ localStorage.setItem('currentUser', JSON.stringify(u)); },
    clearCurrentUser(){ localStorage.removeItem('currentUser'); },
  };

  DB.init();

  // ─── DOM refs ──────────────────────────────────────────────
  const authScreen        = document.getElementById('auth-screen');
  const appScreen         = document.getElementById('app-screen');
  const loginContainer    = document.getElementById('login-container');
  const registerContainer = document.getElementById('register-container');
  const loginForm         = document.getElementById('login-form');
  const registerForm      = document.getElementById('register-form');
  const showRegisterBtn   = document.getElementById('show-register');
  const showLoginBtn      = document.getElementById('show-login');
  const logoutBtn         = document.getElementById('logout-btn');
  const userGreeting      = document.getElementById('user-greeting');
  const taskSummary       = document.getElementById('task-summary');
  const todoForm          = document.getElementById('todo-form');
  const todoList          = document.getElementById('todo-list');

  // ─── Screen control ────────────────────────────────────────
  const showScreen = (name) => {
    authScreen.classList.remove('active');
    appScreen.classList.remove('active');
    authScreen.style.display = 'none';
    appScreen.style.display  = 'none';

    if (name === 'auth') {
      authScreen.style.display = 'flex';
      authScreen.classList.add('active');
    } else {
      appScreen.style.display = 'flex';
      appScreen.classList.add('active');
    }
  };

  const toggleAuth = (mode) => {
    clearAllErrors();
    loginForm.reset();
    registerForm.reset();
    if (mode === 'register') {
      loginContainer.classList.add('hidden');
      registerContainer.classList.remove('hidden');
    } else {
      registerContainer.classList.add('hidden');
      loginContainer.classList.remove('hidden');
    }
  };

  showRegisterBtn.addEventListener('click', e => { e.preventDefault(); toggleAuth('register'); });
  showLoginBtn.addEventListener('click',    e => { e.preventDefault(); toggleAuth('login'); });

  // ─── Error helpers ─────────────────────────────────────────
  const setError = (id, msg) => {
    const el = document.getElementById(`${id}-error`);
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
  };
  const clearError = (id) => {
    const el = document.getElementById(`${id}-error`);
    if (el) el.classList.add('hidden');
  };
  const setGeneralError = (prefix, msg) => {
    const el = document.getElementById(`${prefix}-general-error`);
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
  };
  const clearGeneralError = (prefix) => {
    const el = document.getElementById(`${prefix}-general-error`);
    if (el) el.classList.add('hidden');
  };
  const clearAllErrors = () => {
    document.querySelectorAll('[id$="-error"]').forEach(el => el.classList.add('hidden'));
  };

  // ─── Register ──────────────────────────────────────────────
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    clearError('register-name');
    clearError('register-email');
    clearError('register-password');
    clearGeneralError('register');

    const name     = document.getElementById('register-name').value.trim();
    const email    = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    let ok = true;

    if (!name)            { setError('register-name', 'Nome obrigatório.'); ok = false; }
    if (!email)           { setError('register-email', 'E-mail obrigatório.'); ok = false; }
    if (!password)        { setError('register-password', 'Senha obrigatória.'); ok = false; }
    else if (password.length < 6) { setError('register-password', 'Mínimo 6 caracteres.'); ok = false; }
    if (!ok) return;

    const users = DB.getUsers();
    if (users.find(u => u.email === email)) {
      setGeneralError('register', 'Este e-mail já está em uso.');
      return;
    }

    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    DB.saveUsers(users);
    DB.setCurrentUser(newUser);
    loadApp();
  });

  // ─── Login ─────────────────────────────────────────────────
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    clearError('login-email');
    clearError('login-password');
    clearGeneralError('login');

    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    let ok = true;

    if (!email)    { setError('login-email', 'E-mail obrigatório.'); ok = false; }
    if (!password) { setError('login-password', 'Senha obrigatória.'); ok = false; }
    if (!ok) return;

    const user = DB.getUsers().find(u => u.email === email);
    if (!user)              { setGeneralError('login', 'E-mail não cadastrado.'); return; }
    if (user.password !== password) { setGeneralError('login', 'Senha incorreta.'); return; }

    DB.setCurrentUser(user);
    loadApp();
  });

  // ─── Logout ────────────────────────────────────────────────
  logoutBtn.addEventListener('click', () => {
    DB.clearCurrentUser();
    toggleAuth('login');
    showScreen('auth');
  });

  // ─── Badge label/class map ─────────────────────────────────
  const BADGE = {
    work:     { label: 'Trabalho', cls: 'badge-work' },
    personal: { label: 'Pessoal',  cls: 'badge-personal' },
    study:    { label: 'Estudos',  cls: 'badge-study' },
  };

  // ─── Render todos ──────────────────────────────────────────
  const renderTodos = () => {
    const user  = DB.getCurrentUser();
    const todos = DB.getTodos().filter(t => t.userId === user.email);

    // pending first, done at the end
    const sorted = [
      ...todos.filter(t => !t.done),
      ...todos.filter(t =>  t.done),
    ];

    if (sorted.length === 0) {
      todoList.innerHTML = `
        <div class="glass rounded-2xl p-8 text-center text-slate-500">
          <p class="text-4xl mb-3">📋</p>
          <p class="font-medium">Nenhuma tarefa cadastrada ainda.</p>
          <p class="text-sm mt-1">Use o formulário acima para começar.</p>
        </div>`;
      return;
    }

    todoList.innerHTML = sorted.map(todo => {
      const badge = BADGE[todo.type] || BADGE.work;
      const doneClass = todo.done ? 'done' : '';
      const desc = todo.description
        ? `<p class="text-slate-400 text-sm mt-2 leading-relaxed">${escHtml(todo.description)}</p>`
        : '';
      const btnLabel = todo.done
        ? `<span class="text-emerald-400 text-xs font-medium flex items-center gap-1">✔ Concluída</span>`
        : `<button class="btn-complete btn text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 text-emerald-300 transition-all" data-id="${todo.id}">Concluir</button>`;

      return `
        <div class="task-card glass rounded-2xl p-5 shadow-lg ${doneClass}" data-id="${todo.id}">
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="task-title font-semibold text-slate-100 truncate">${escHtml(todo.title)}</span>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium ${badge.cls}">${badge.label}</span>
              </div>
              ${desc}
            </div>
            <div class="shrink-0">${btnLabel}</div>
          </div>
        </div>`;
    }).join('');

    // Attach complete handlers
    todoList.querySelectorAll('.btn-complete').forEach(btn => {
      btn.addEventListener('click', () => completeTodo(btn.dataset.id));
    });

    // Update summary
    const total   = todos.length;
    const pending = todos.filter(t => !t.done).length;
    taskSummary.textContent = `${pending} pendente${pending !== 1 ? 's' : ''} de ${total} tarefa${total !== 1 ? 's' : ''}`;
  };

  const escHtml = str => str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

  // ─── Add todo ──────────────────────────────────────────────
  todoForm.addEventListener('submit', e => {
    e.preventDefault();
    clearError('todo-title');

    const title       = document.getElementById('todo-title').value.trim();
    const type        = document.getElementById('todo-type').value;
    const description = document.getElementById('todo-description').value.trim();

    if (!title) { setError('todo-title', 'O título é obrigatório.'); return; }

    const user  = DB.getCurrentUser();
    const todos = DB.getTodos();

    todos.push({
      id:          Date.now().toString(),
      userId:      user.email,
      title,
      type,
      description,
      done:        false,
    });

    DB.saveTodos(todos);
    todoForm.reset();
    renderTodos();
  });

  // ─── Complete todo ─────────────────────────────────────────
  const completeTodo = (id) => {
    const todos = DB.getTodos().map(t => t.id === id ? { ...t, done: true } : t);
    DB.saveTodos(todos);
    renderTodos();
  };

  // ─── Load app ──────────────────────────────────────────────
  const loadApp = () => {
    const user = DB.getCurrentUser();
    userGreeting.textContent = user.name;
    showScreen('app');
    renderTodos();
  };

  // ─── Bootstrap ─────────────────────────────────────────────
  const user = DB.getCurrentUser();
  if (user) {
    loadApp();
  } else {
    toggleAuth('login');
    showScreen('auth');
  }
});
