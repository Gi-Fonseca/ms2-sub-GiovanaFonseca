class Servico {
  constructor(nome, preco, descricao, icone) {
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
    this.icone = icone || "✂️";
  }
}

const servicoList = [
  new Servico("Corte Juba Domada", "R$ 35,00", "Corte completo na tesoura ou máquina para domar seu estilo.", "✂️"),
  new Servico("Navalha Afiada", "R$ 25,00", "Barba completa feita com toalha quente e alinhamento preciso.", "🪒"),
  new Servico("Combo Por Um Fio", "R$ 55,00", "Corte + Barba + Sobrancelha. O pacote completo!", "💈")
];

const containerServicos = document.querySelector('#lista-servicos');

function criarCardServico(servico) {
  const col = document.createElement('div');
  col.className = 'col-md-4';

  col.innerHTML = `
    <div class="card bg-white p-3 border border-dark text-center h-100 shadow-sm">
        <div class="fs-1 mb-2">${servico.icone}</div>
        <h4 class="text-primary fw-bold">${servico.nome}</h4>
        <p class="text-muted flex-grow-1">${servico.descricao}</p>
        <div class="mb-3">
            <span class="badge bg-danger fs-5">${servico.preco}</span>
        </div>
        <button class="btn btn-warning text-dark fw-bold border border-dark w-100"
            data-bs-toggle="modal"
            data-bs-target="#modalConfirmacao"
            data-nome="${servico.nome}"
            data-preco="${servico.preco}">
            💈 Agendar
        </button>
    </div>
  `;
  return col;
}

function renderizarServicos() {
  if (!containerServicos) return;
  containerServicos.innerHTML = '';
  servicoList.forEach(servico => {
    containerServicos.appendChild(criarCardServico(servico));
  });
}

renderizarServicos();

const modalConfirmacao = document.getElementById('modalConfirmacao');
let servicoSelecionadoTexto = "";

if (modalConfirmacao) {
  modalConfirmacao.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const nome = button.getAttribute('data-nome');
    const preco = button.getAttribute('data-preco');

    servicoSelecionadoTexto = `${nome} - ${preco}`;

    const modalNome = modalConfirmacao.querySelector('#modalServicoNome');
    const modalPreco = modalConfirmacao.querySelector('#modalServicoPreco');

    if (modalNome) modalNome.textContent = nome;
    if (modalPreco) modalPreco.textContent = preco;
  });
}

const btnProsseguir = document.querySelector('#btnProsseguirAgendamento');

if (btnProsseguir) {
  btnProsseguir.addEventListener('click', () => {
    const modalElement = document.getElementById('modalConfirmacao');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);

    modalElement.addEventListener('hidden.bs.modal', function handler() {
      modalElement.removeEventListener('hidden.bs.modal', handler);

      alert(`✂️ Ótima escolha!\n\nPara confirmar, preencha seu Nome e WhatsApp no formulário a seguir.`);

      const selectServico = document.querySelector('#agendamento select');
      if (selectServico && servicoSelecionadoTexto) {
        const nomeApenas = servicoSelecionadoTexto.split(' - ')[0];
        for (let option of selectServico.options) {
          if (option.text.includes(nomeApenas)) {
            option.selected = true;
            break;
          }
        }
      }

      const secaoAgendamento = document.getElementById('agendamento');
      if (secaoAgendamento) {
        secaoAgendamento.scrollIntoView({ behavior: 'smooth' });
      }

      const inputNome = document.querySelector('#agendamento input[type="text"]');
      if (inputNome) inputNome.focus();
    });

    if (modalInstance) {
      modalInstance.hide();
    }
  });
}

const formAgendamento = document.querySelector('#agendamento form');
if (formAgendamento) {
  formAgendamento.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = formAgendamento.querySelector('input[type="text"]').value;
    const servico = formAgendamento.querySelector('select').value;

    alert(`🎉 Agendamento realizado com sucesso, ${nome}!\n\nServiço: ${servico}\n\nTe esperamos na Por Um Fio Barbearia!`);
    formAgendamento.reset();
  });
}