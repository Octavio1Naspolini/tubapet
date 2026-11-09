//controller - cadastro de animal
const form = document.getElementById('form-animal');
const mensagem = document.getElementById('mensagem');
const select = document.getElementById('idcliente');

function carregarClientes() {
  const clientes = Clientes.listar()
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  select.innerHTML = '';
  if (clientes.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'Nenhum cliente cadastrado';
    select.appendChild(opt);
    select.disabled = true;
    form.querySelector('button').disabled = true;
    mensagem.textContent = 'Cadastre um cliente antes de cadastrar um animal.';
    mensagem.className = 'erro';
    return;
  }
  clientes.forEach((c) => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.nome;
    select.appendChild(opt);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const especie = document.getElementById('especie').value.trim();
  const raca = document.getElementById('raca').value.trim();
  const idadeTxt = document.getElementById('idade').value.trim();
  const idcliente = Number(select.value);
  const idade = Number(idadeTxt);
  if (!nome || !especie || !raca || idadeTxt === '' || !idcliente) {
    mensagem.textContent = 'Preencha todos os campos.';
    mensagem.className = 'erro';
    return;
  }
  if (!Number.isInteger(idade) || idade < 0) {
    mensagem.textContent = 'A idade deve ser um número inteiro (em anos).';
    mensagem.className = 'erro';
    return;
  }
  try {
    Animais.adicionar(nome, especie, raca, idade, idcliente);
    mensagem.textContent = 'Animal salvo com sucesso!';
    mensagem.className = 'sucesso';
    const dono = select.value;
    form.reset();
    select.value = dono;
  } catch (err) {
    mensagem.textContent = 'Não foi possível salvar (armazenamento cheio ou bloqueado).';
    mensagem.className = 'erro';
  }
});

carregarClientes();
