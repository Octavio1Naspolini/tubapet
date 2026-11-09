//controller - cadastro de cliente
const form = document.getElementById('form-cliente');
const mensagem = document.getElementById('mensagem');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const digitos = document.getElementById('telefone').value.replace(/\D/g, '');
  const endereco = document.getElementById('endereco').value.trim();
  if (!nome || !digitos || !endereco) {
    mensagem.textContent = 'Nome, telefone e endereço são obrigatórios.';
    mensagem.className = 'erro';
    return;
  }
  if (digitos.length < 10 || digitos.length > 11) {
    mensagem.textContent = 'Telefone inválido. Use DDD + número.';
    mensagem.className = 'erro';
    return;
  }
  try {
    Clientes.adicionar(nome, Number(digitos), endereco);
    mensagem.textContent = 'Cliente salvo com sucesso!';
    mensagem.className = 'sucesso';
    form.reset();
  } catch (err) {
    mensagem.textContent = 'Não foi possível salvar (armazenamento cheio ou bloqueado).';
    mensagem.className = 'erro';
  }
});
