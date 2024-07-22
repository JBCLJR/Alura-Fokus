// encontrar o botão adicionar tarefa

const BTAdicionarTarefa = document.querySelector('.app__button--add-task')
const BTCancelar = document.querySelector('.app__form-footer__button--cancel')
const FormAdicionarTarefa= document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const ultarefas = document.querySelector('.app__section-task-list')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTarefas = document.querySelector('#btn-remover-todas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let LitarefaSelecionada = null

function atualizarTarefas (){
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa){
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = ` <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick =     () => {
        const NovaDescricao =prompt("Qual é o novo nome da tarefa?")
        if (NovaDescricao) {
            paragrafo.textContent = NovaDescricao
            tarefa.descricao = NovaDescricao
            atualizarTarefas() 
        alert("Tarefa atualizada com sucesso!")
        } else {
        alert("Atualização cancelada ou valor inválido!")
         
        }
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)
   
    if (tarefa.completa){
        li.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled','disabled')  
    } else {
        li.onclick = () => 
            li.onclick = () => {    
                document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento =>{
                    elemento.classList.remove('app__section-task-list-item-active')
                })
                if (tarefaSelecionada == tarefa) {
                    paragrafoDescricaoTarefa.textContent = ''
                    tarefaSelecionada = null
                    LitarefaSelecionada = null
                    return       
                }
                tarefaSelecionada = tarefa
                LitarefaSelecionada = li
                paragrafoDescricaoTarefa.textContent = tarefa.descricao       
                li.classList.add('app__section-task-list-item-active')
            }
    }


    return li
}
const limparFormulario = () =>{
    textarea.value = ''
    FormAdicionarTarefa.classList.toggle('hidden')
}
BTAdicionarTarefa.addEventListener('click', () =>{
    FormAdicionarTarefa.classList.toggle('hidden')
})

BTCancelar.addEventListener('click', limparFormulario) 

FormAdicionarTarefa.addEventListener('submit', (evento) =>{
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ultarefas.append(elementoTarefa)
    atualizarTarefas()
    textarea.value = ''
    FormAdicionarTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ultarefas.append(elementoTarefa)
});

document.addEventListener('FocoFinalizado', () =>{
    if (tarefaSelecionada && LitarefaSelecionada){
    LitarefaSelecionada.classList.remove('app__section-task-list-item-active')
    LitarefaSelecionada.classList.add('app__section-task-list-item-complete')
    LitarefaSelecionada.querySelector('button').setAttribute('disabled','disabled')
    tarefaSelecionada.completa = true
    atualizarTarefas()
}
})  

const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas()
}
btnRemoverConcluidas.onclick = () => removerTarefas(true)
btnRemoverTarefas.onclick = () => removerTarefas(false)