//model
const CHAVE_CLIENTES = 'tubapet:clientes';
const CHAVE_ANIMAIS = 'tubapet:animais';
const CHAVE_SEQ = 'tubapet:seq';

function ler(chave) {
  try {
    return JSON.parse(localStorage.getItem(chave)) || [];
  } catch (err) {
    return [];
  }
}

function proximoId(tabela) {
  let seq = {};
  try {
    seq = JSON.parse(localStorage.getItem(CHAVE_SEQ)) || {};
  } catch (err) {
    seq = {};
  }
  const id = (seq[tabela] || 0) + 1;
  seq[tabela] = id;
  localStorage.setItem(CHAVE_SEQ, JSON.stringify(seq));
  return id;
}

// Tabela: Cliente (id int, nome varchar, telefone int, endereco varchar)
const Clientes = {
  listar() {
    return ler(CHAVE_CLIENTES);
  },
  buscar(id) {
    return this.listar().find((c) => c.id === id);
  },
  adicionar(nome, telefone, endereco) {
    const lista = this.listar();
    const cliente = { id: proximoId('clientes'), nome, telefone, endereco };
    lista.push(cliente);
    localStorage.setItem(CHAVE_CLIENTES, JSON.stringify(lista));
    return cliente;
  }
};

// Tabela: Animais (id int, nome varchar, especie varchar, raca varchar, idade int, idcliente int)
const Animais = {
  listar() {
    return ler(CHAVE_ANIMAIS);
  },
  listarPorCliente(idcliente) {
    return this.listar().filter((a) => a.idcliente === idcliente);
  },
  adicionar(nome, especie, raca, idade, idcliente) {
    const lista = this.listar();
    const animal = { id: proximoId('animais'), nome, especie, raca, idade, idcliente };
    lista.push(animal);
    localStorage.setItem(CHAVE_ANIMAIS, JSON.stringify(lista));
    return animal;
  }
};

function formatarTelefone(tel) {
  const d = String(tel);
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return d;
}
