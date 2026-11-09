//controller - clientes e seus animais
const lista = document.getElementById('lista');
const mensagem = document.getElementById('mensagem');

function mostrar() {
  const clientes = Clientes.listar()
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  lista.innerHTML = '';
  if (clientes.length === 0) {
    mensagem.textContent = 'Nenhum cliente cadastrado.';
    return;
  }
  mensagem.textContent = '';
  clientes.forEach((c) => {
    const li = document.createElement('li');

    const topo = document.createElement('div');
    topo.className = 'topo';
    const nome = document.createElement('span');
    nome.className = 'nome';
    nome.textContent = c.nome;
    const tel = document.createElement('a');
    tel.href = `tel:${c.telefone}`;
    tel.textContent = formatarTelefone(c.telefone);
    topo.append(nome, tel);

    const end = document.createElement('p');
    end.className = 'endereco';
    end.textContent = c.endereco;

    const pets = document.createElement('ul');
    pets.className = 'pets';
    const animais = Animais.listarPorCliente(c.id)
      .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    if (animais.length === 0) {
      const vazio = document.createElement('li');
      vazio.className = 'vazio';
      vazio.textContent = 'Sem animais cadastrados';
      pets.appendChild(vazio);
    } else {
      animais.forEach((a) => {
        const p = document.createElement('li');
        const anos = a.idade === 1 ? '1 ano' : `${a.idade} anos`;
        const n = document.createElement('strong');
        n.textContent = a.nome;
        p.append(n, ` — ${a.especie}, ${a.raca}, ${anos}`);
        pets.appendChild(p);
      });
    }

    li.append(topo, end, pets);
    lista.appendChild(li);
  });
}
mostrar();
