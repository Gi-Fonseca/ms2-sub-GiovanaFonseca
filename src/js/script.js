class Servico {
  constructor(nome, preco, descricao, icone) {
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
    this.icone = icone;
  }
}

const servicos = [
  new Servico('Corte Juba Domada', 'R$ 35,00', 'Corte completo na tesoura ou máquina para domar seu estilo.', '✂️'),
  new Servico('Navalha Afiada', 'R$ 25,00', 'Barba com toalha quente e acabamento preciso.', '🪒'),
  new Servico('Combo Por Um Fio', 'R$ 55,00', 'Corte, barba e sobrancelha no pacote completo.', '💈')
];

const lista = document.querySelector('#lista-servicos');
const selectServico = document.querySelector('#servico');

function criarCard(servico) {
  const coluna = document.createElement('div');
  coluna.className = 'col-md-4';
  coluna.innerHTML = `
    <article class="service-card card h-100 border-2 border-dark shadow-sm">
      <div class="card-body d-flex flex-column p-4">
        <div class="service-icon" aria-hidden="true">${servico.icone}</div>
        <h3 class="card-title fw-bold mt-2">${servico.nome}</h3>
        <p class="card-text text-muted flex-grow-1">${servico.descricao}</p>
        <span class="service-price badge text-dark align-self-start fs-6 mb-3">${servico.preco}</span>
        <button class="btn btn-amarelo w-100" type="button" data-servico="${servico.nome}">Escolher serviço</button>
      </div>
    </article>
  `;
  coluna.querySelector('button').addEventListener('click', () => {
    selectServico.value = servico.nome;
    document.querySelector('#agendamento').scrollIntoView({ behavior: 'smooth' });
  });
  return coluna;
}

servicos.forEach((servico) => {
  lista.appendChild(criarCard(servico));
  const opcao = document.createElement('option');
  opcao.value = servico.nome;
  opcao.textContent = `${servico.nome} — ${servico.preco}`;
  selectServico.appendChild(opcao);
});

document.querySelector('#form-agendamento').addEventListener('submit', (event) => {
  event.preventDefault();
  const nome = document.querySelector('#nome').value.trim();
  const servico = selectServico.value;
  const mensagem = document.querySelector('#mensagem-form');
  mensagem.textContent = `Tudo certo, ${nome}! Recebemos seu pedido para ${servico}.`;
  event.target.reset();
});
