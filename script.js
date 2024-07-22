const html = document.querySelector('html')
const focoBT = document.querySelector(".app__card-button--foco")
const curtoBT = document.querySelector(".app__card-button--curto")
const longoBT = document.querySelector(".app__card-button--longo")
const banner = document.querySelector('.app__image')
const Titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const MusicaFocoInput = document.querySelector('#alternar-musica')
const botaoInicio = document.querySelector('#start-pause')
const iniciarOuPausarBT = document.querySelector('#start-pause span')
const IniciarOuPausarSym = document.querySelector('.app__card-primary-butto-icon')
const TempoNaTela= document.querySelector('#timer')


const musica = new Audio ('sons/luna-rise-part-one.mp3')
const beep = new Audio ('sons/beep.mp3')
const pausar = new Audio('sons/pause.mp3')
const play = new Audio ('sons/play.wav')

musica.loop = true

let tempoDecorridoEmSegundos = 1500
let intervaloID = null

MusicaFocoInput.addEventListener('change', () =>{
    if (musica.paused){
            musica.play()
    } else{
        musica.pause()
    }
})

focoBT.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBT.classList.add('active')
    
})

curtoBT.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBT.classList.add('active')
})

longoBT.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBT.classList.add('active')  
})

function alterarContexto (contexto){
    MostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    }) 
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
                Titulo.innerHTML =
                `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            Titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        default:
        case "descanso-longo":
            Titulo.innerHTML =`Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
    }
}

const contagemRegressiva = () =>{
    if (tempoDecorridoEmSegundos<=0){
        beep.play()
        alert('tempo finalizado')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo){
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
        MostrarTempo()
        tempoDecorridoEmSegundos -= 1
}

botaoInicio.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar (){
    if(intervaloID){
        zerar()
        pausar.play()
        return  
    }
    play.play()
    intervaloID = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBT.textContent = 'Pausar'
    IniciarOuPausarSym.setAttribute('src', '/imagens/pause.png')
}

function zerar (){
    clearInterval(intervaloID)
    iniciarOuPausarBT.textContent = 'Começar'
    IniciarOuPausarSym.setAttribute('src', '/imagens/play_arrow.png')
    intervaloID = null
}

function MostrarTempo(){
    const Tempo = new Date(tempoDecorridoEmSegundos*1000)
    const TempoFormatado = Tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    TempoNaTela.innerHTML = `${TempoFormatado}`
}
MostrarTempo()