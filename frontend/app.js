const baseUrl = 'http://localhost:5000/api';
let currentView = 'home';

const app = document.getElementById('app');
const templates = {
  marcas: document.getElementById('marcas-template'),
  modelos: document.getElementById('modelos-template'),
  home: document.getElementById('home-template'),
  marcaForm: document.getElementById('marca-form-template'),
  modeloForm: document.getElementById('modelo-form-template'),
};

const render = (view) => {
  currentView = view;
  app.innerHTML = '';
  const clone = document.importNode(templates[view].content, true);
  app.appendChild(clone);

  if (view === 'marcas') {
    loadMarcas();
    document.getElementById('new-marca').addEventListener('click', () => renderForm('marca'));
    const backBtn = document.getElementById('back-marcas');
    if (backBtn) backBtn.addEventListener('click', () => render('home'));
  }

  if (view === 'modelos') {
    loadModelos();
    document.getElementById('new-modelo').addEventListener('click', () => renderForm('modelo'));
    const backBtn = document.getElementById('back-modelos');
    if (backBtn) backBtn.addEventListener('click', () => render('home'));
  }

  if (view === 'home') {
    const btnMarcas = document.getElementById('enter-marcas');
    const btnModelos = document.getElementById('enter-modelos');
    if (btnMarcas) btnMarcas.addEventListener('click', () => render('marcas'));
    if (btnModelos) btnModelos.addEventListener('click', () => render('modelos'));
  }
};

const fetchApi = async (path, { method = 'GET', body } = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Erro na API');
  }
  return response.status === 204 ? null : response.json();
};

const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

const loadMarcas = async () => {
  try {
    const marcas = await fetchApi('/marcas');
    const list = document.getElementById('marcas-list');
    list.innerHTML = marcas.map(marca => `
      <tr>
        <td>${marca.nome}</td>
        <td>${marca.logo ? ('<img src="' + marca.logo + '" width="40" height="40" alt="' + marca.nome + ' logo" />') : '-'}</td>
        <td class="actions-cell">
          <button class="action-btn edit-btn" data-id="${marca._id}" data-action="edit-marca">Editar</button>
          <button class="action-btn delete-btn" data-id="${marca._id}" data-action="delete-marca">Excluir</button>
        </td>
      </tr>
    `).join('');
    
    list.querySelectorAll('[data-action="edit-marca"]').forEach(btn => btn.addEventListener('click', () => renderForm('marca', btn.dataset.id)));
    list.querySelectorAll('[data-action="delete-marca"]').forEach(btn => btn.addEventListener('click', () => deleteMarca(btn.dataset.id)));
  } catch (err) {
    app.innerHTML += `<p>${err.message}</p>`;
  }
};

const loadModelos = async () => {
  try {
    const modelos = await fetchApi('/modelos');
    const list = document.getElementById('modelos-list');
    list.innerHTML = modelos.map(modelo => `
      <tr>
        <td>${modelo.nome}</td>
        <td>${modelo.marca?.nome || 'Sem marca'}</td>
        <td>${modelo.anoFabricacao}</td>
        <td>${modelo.anoModelo}</td>
        <td>${modelo.carroceria}</td>
        <td>${modelo.kilometragem}</td>
        <td>${modelo.combustivel}</td>
        <td>${modelo.cor}</td>
        <td>${modelo.cambio}</td>
        <td class="actions-cell">
          <button class="action-btn edit-btn" data-id="${modelo._id}" data-action="edit-modelo">Editar</button>
          <button class="action-btn delete-btn" data-id="${modelo._id}" data-action="delete-modelo">Excluir</button>
        </td>
      </tr>
    `).join('');
    
    list.querySelectorAll('[data-action="edit-modelo"]').forEach(btn => btn.addEventListener('click', () => renderForm('modelo', btn.dataset.id)));
    list.querySelectorAll('[data-action="delete-modelo"]').forEach(btn => btn.addEventListener('click', () => deleteModelo(btn.dataset.id)));
  } catch (err) {
    app.innerHTML += `<p>${err.message}</p>`;
  }
};

const renderForm = async (type, id = null) => {
  app.innerHTML = '';
  const template = type === 'marca' ? templates.marcaForm : templates.modeloForm;
  const clone = document.importNode(template.content, true);
  app.appendChild(clone);

  if (type === 'marca') {
    const form = document.getElementById('marca-form');
    const fileInput = document.getElementById('logo-file');
    const hiddenLogo = form.querySelector('input[name="logo"]');
    const img = document.getElementById('logo-img');
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        const base64 = await fileToBase64(file);
        hiddenLogo.value = base64;
        img.src = base64;
        img.style.display = '';
      }
    });
    form.addEventListener('submit', (e) => handleMarcaSubmit(e, id));
    if (id) {
      const marca = await fetchApi(`/marcas/${id}`);
      form.nome.value = marca.nome;
      hiddenLogo.value = marca.logo || '';
      if (marca.logo) {
        img.src = marca.logo;
        img.style.display = '';
      }
      document.getElementById('marca-form-title').textContent = 'Editar Marca';
    }
  } else {
    const form = document.getElementById('modelo-form');
    const select = form.marca;
    const marcas = await fetchApi('/marcas');
    select.innerHTML = marcas.map(m => `<option value="${m._id}">${m.nome}</option>`).join('');
    form.addEventListener('submit', (e) => handleModeloSubmit(e, id));
    if (id) {
      const modelo = await fetchApi(`/modelos/${id}`);
      form.nome.value = modelo.nome;
      form.anoFabricacao.value = modelo.anoFabricacao;
      form.anoModelo.value = modelo.anoModelo;
      form.carroceria.value = modelo.carroceria;
      form.kilometragem.value = modelo.kilometragem;
      form.combustivel.value = modelo.combustivel;
      form.cor.value = modelo.cor;
      form.cambio.value = modelo.cambio;
      form.marca.value = modelo.marca?._id || '';
      document.getElementById('modelo-form-title').textContent = 'Editar Modelo';
    }
  }

  // Add cancel button listeners
  const cancelBtn = type === 'marca' ? document.getElementById('marca-cancel') : document.getElementById('modelo-cancel');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      render(type === 'marca' ? 'marcas' : 'modelos');
    });
  }
};

const handleMarcaSubmit = async (event, id) => {
  event.preventDefault();
  const form = event.target;
  const body = {
    nome: form.nome.value,
    logo: form.logo.value,
  };
  const messageBox = document.getElementById('marca-message');

  try {
    if (id) {
      await fetchApi(`/marcas/${id}`, { method: 'PUT', body });
    } else {
      await fetchApi('/marcas', { method: 'POST', body });
    }
    messageBox.textContent = 'Marca salva com sucesso.';
    render('marcas');
  } catch (err) {
    messageBox.textContent = err.message;
  }
};

const handleModeloSubmit = async (event, id) => {
  event.preventDefault();
  const form = event.target;
  const body = {
    nome: form.nome.value,
    anoFabricacao: Number(form.anoFabricacao.value),
    anoModelo: Number(form.anoModelo.value),
    carroceria: form.carroceria.value,
    kilometragem: Number(form.kilometragem.value),
    combustivel: form.combustivel.value,
    cor: form.cor.value,
    cambio: form.cambio.value,
    marca: form.marca.value,
  };
  const messageBox = document.getElementById('modelo-message');

  try {
    if (id) {
      await fetchApi(`/modelos/${id}`, { method: 'PUT', body });
    } else {
      await fetchApi('/modelos', { method: 'POST', body });
    }
    messageBox.textContent = 'Modelo salvo com sucesso.';
    render('modelos');
  } catch (err) {
    messageBox.textContent = err.message;
  }
};

const deleteMarca = async (id) => {
  if (!confirm('Deseja realmente excluir esta marca?')) return;
  try {
    await fetchApi(`/marcas/${id}`, { method: 'DELETE' });
    render('marcas');
  } catch (err) {
    alert(err.message);
  }
};

const deleteModelo = async (id) => {
  if (!confirm('Deseja realmente excluir este modelo?')) return;
  try {
    await fetchApi(`/modelos/${id}`, { method: 'DELETE' });
    render('modelos');
  } catch (err) {
    alert(err.message);
  }
};

const init = () => {
  document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      render(link.dataset.view);
    });
  });
  render(currentView);
};

window.addEventListener('DOMContentLoaded', init);
