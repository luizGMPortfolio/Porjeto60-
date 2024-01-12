


function cadastro(id) {

    const socket = io()

    $('form').submit(() => submeterForm(socket, id))

    socket.on('login', (token) => verificar(token))
    socket.on('cadastrar', NovoUser)
}
function submeterForm(socket, id) {
    if (id === 'user') {
        socket.emit('login', $('#nomes').val(), $('#senha').val())

    }
    else if (id == 'newUser') {
        socket.emit('cadastrar', $('#nomes').val(), $('#numero').val(), $('#email').val(), $('#senha').val())
    }
    else if (id == 'redirect') {
        location.href = 'cadastro.html'
    }
    else if (id == 'AddCont') {
        console.log(localStorage.getItem('token'))
        socket.emit('addcontato', localStorage.getItem('token'), $('#Addcont').val())
    }
    return false
}
//login
function verificar(id) {
    localStorage.setItem('token', id)
    location.href = 'home.html'
}
//cadastrar
function NovoUser() {
    alert('sucesso')
    location.href = '/login.html'
}


/*mensagem*/
function NewMensage(){
    const Lmsn = document.getElementById('mensagens')
    novaMsn = `
    <li>
        <div class="voce">
            <header class="headname1">
                <h2 class="vc">Você</h2>
            </header>
            <div class="dispmsn">
                <button class="audio">
                    <img src="images/playheader.png" alt="play">
                </button>
                <p>${msn.value}</p>
            </div>
        </div>
    </li>`

    Lmsn.innerHTML += novaMsn

    window.scroll({
        top: 100000000000000,
        left: 10000000000000,
        behavior: "smooth",
    });


}
function exibirMsg(msg) {
    $('#messages').append($('<li>').text(msg))
}
function informaUsuariosInicioDigitacao(socket) {
    if (socket.nickname === '') {
        return
    }

    socket.emit('status', socket.nickname + ' está escrevendo...')
}
function exibirMsgStatus(msg) {
    $('#status').html(msg)
    console.log(msg)
}



//redirecionar
function Relogo() {
    location.href = 'login.html'
}
function Recad() {
    location.href = 'cadastro.html'
}
function Rehome() {
    location.href = 'home.html'
}
function Referra() {
    location.href = 'ferramentas.html'
}


/*Conversas*/
function TelaContato() {
    const Add = document.getElementById('container')
    let AddContato = `    
    <center class="containerVoador">
    <button type="submit" class="btn-exit" onclick="fechar()">x</button>
    <form>
      <label for="Contatos">Novo Contato</label>
      <input type="number" name="telefone" class="AddCont" id="Addcont" placeholder="Digite o telefone" required>
      <button type="submit" class="btn-cell" onclick="cadastro('AddCont')">Adicionar</button>
    </form>
    </center>`

    Add.innerHTML += AddContato;
}
function fechar() {
    const Add = document.getElementById('container')
    Add.remove()
    location.href = 'Conversas.html'
}
function AddContato() {
    const lista = document.getElementById('lista')
    let novoContato = `    
    <li>
    <a href="Conversa.html" class="pessoas">
      <div class="foto"></div>
      <div class="perfil">
        <h2 class="nome">nome</h2>
        <div class="mensagens">
          <div class="circulo"></div>
          <span> 10 mensagens</span>
        </div>
      </div>
      </div>
    </a>
    </li>`

    lista.innerHTML += novoContato;

}




/*Grupos*/
function Privado() {
    const priv = document.getElementById('sla')

    let novoContato = `    
    <li class="grupo">
    <div class="medio">
        <div class="sla"></div>
        <img src="images/grupos/nazare (1).jpg" class="capa">
    </div>
    <div class="inferior">
        <h2>Noveleiros</h2>
        <div class="user">
            <img src="images/grupos/veio1.png" class="inte">
            <img src="images/grupos/veio3.png" class="inte">
        </div>
    </div>
</li>
<li class="grupo">
    <div class="medio">
        <div class="sla"></div>
        <img src="images/grupos/aniver (1).jpg" class="capa">
    </div>
    <div class="inferior">
        <h2>Festa do paulo</h2>
        <div class="user">
            <img src="images/grupos/veio1.png" class="inte">
            <img src="images/grupos/veio3.png" class="inte">
            <img src="images/grupos/veio4.png" class="inte">
        </div>
    </div>
</li>
<li class="grupo">
    <div class="medio">
        <div class="sla"></div>
        <img src="images/grupos/igreja (1).jpg" class="capa">
    </div>
    <div class="inferior">
        <h2>igreja</h2>
        <div class="user">
            <img src="images/grupos/veio1.png" class="inte">
            <img src="images/grupos/veio2.png" class="inte">
            <img src="images/grupos/veio3.png" class="inte">
            <img src="images/grupos/veio4.png" class="inte">
            <p>+ 20</p>
        </div>
    </div>
</li>`

    priv.innerHTML = novoContato;

    const buttom = document.getElementById('rodape')

    let muda = `        <center>
    <button id="Grupos" class="gruposActive" onclick="Privado()">Grupos</button>
    <button id="Comunidades" class="comunidadesClose" onclick="Publico()">Comunidades</button>
</center>`

    buttom.innerHTML = muda
}
function Publico(){
    const publi = document.getElementById('sla')

    let pub= `            <li class="grupo">
    <div class="medio">
        <div class="sla"></div>
        <img src="images/grupos/comunidade/custura (1).jpg" class="capa">
    </div>
    <div class="inferior">
        <h2>Custuras</h2>
        <div class="user">
            <h4>200 participantes</h4>
        </div>
    </div>
</li>
<li class="grupo">
    <div class="medio">
        <div class="sla"></div>
        <img src="images/grupos/comunidade/noticiads (1).jpg" class="capa">
    </div>
    <div class="inferior">
        <h2>Noticias</h2>
        <div class="user">
            <h4>1500 participantes</h4>
        </div>
    </div>
</li>
<li class="grupo">
    <div class="medio">
        <div class="sla"></div>
        <img src="images/grupos/comunidade/moda (1).jpg" class="capa">
    </div>
    <div class="inferior">
        <h2>moda</h2>
        <div class="user">
            <h4>300 participantes</h4>
        </div>
    </div>
</li>`

    publi.innerHTML = pub;

    const bottom = document.getElementById('rodape')

    let muda = `        <center>
    <button id="Grupos" class="gruposClose" onclick="Privado()">Grupos</button>
    <button id="Comunidades" class="comunidadesActive" onclick="Publico()">Comunidades</button>
</center>`

    bottom.innerHTML = muda

}


/*Noticias*/
function Geral(){
    const bloco = document.getElementById('bloco')

    let nova =`      <h1>Gerais</h1>
    <li id="noticia">
      <img src="images/noticias/hebe.webp" class="capa">
      <p>Quem é Lilian Gonçalves,
        dona de joias de Hebe Camargo:
        empresária de SP é filha de
        Nelson Gonçalves e chamada de 'Rainha da Noite'</p>
    </li>
    <li id="noticia">
      <img src="images/noticias/marvel.webp" class="capa">
      <p>'As Marvels' se contenta em ser medianamente bom, como tanto gosta a Marvel</p>
    </li>`

    bloco.innerHTML = nova

    const botao= document.getElementById('rodape')

    let muda = `    <center>
    <button id="geral" class="clicado" onclick="Geral()"><img src="images/noticias/geralVerde.png"></button>
    <button id="futebol" onclick="Esportes()"><img src="images/noticias/futebolCinza.png"></button>
    <button id="internacional" onclick="Internacional()"><img src="images/noticias/globoCinza.png"></button>
    <button id="politica" onclick="Politica()"><img src="images/noticias/politicaCinza.png"></button>
    <button onclick="Tv()"><img src="images/noticias/tvCinza.png"></button>
  </center>`

    botao.innerHTML = muda
}
function Tv(){
    const bloco = document.getElementById('bloco')

    let nova =`      <h1>Novela</h1>
    <li id="noticia">
      <img src="images/noticias/novela1.webp" class="capa">
      <p>Novela é gravada na BA e atores compartilham filmagens; Isadora Cruz,
         Thomás Aquino e Alice Carvalho estão no elenco</p>
    </li>
    <li id="noticia">
      <img src="images/noticias/novela2.webp" class="capa">
      <p>Ruan, de Terra e Paixão, realmente morreu? Tairone Vale celebra papel,
         comenta relação com Juiz de Fora e dá spoiler sobre novela</p>
    </li>`

    bloco.innerHTML = nova

    const botom = document.getElementById('rodape')

    let muda = `    <center>
    <button id="geral" onclick="Geral()"><img src="images/noticias/geralCinza.png"></button>
    <button id="futebol" onclick="Esportes()"><img src="images/noticias/futebolCinza.png"></button>
    <button id="internacional" onclick="Internacional()"><img src="images/noticias/globoCinza.png"></button>
    <button id="politica" onclick="Politica()"><img src="images/noticias/politicaCinza.png"></button>
    <button onclick="Tv()" class="clicado"><img src="images/noticias/tvVerde.png"></button>
  </center>`

    botom.innerHTML = muda
}
function Esportes(){
    const bloco = document.getElementById('bloco')

    let nova =`      <h1>Esportes</h1>
    <li id="noticia">
      <img src="images/noticias/esportes.webp" class="capa">
      <p>Caiçara campeão de fisiculturismo se divide entre dois empregos e rotina intensa de treinos:
         'Sonho em viver do esporte'</p>
    </li>
    <li id="noticia">
      <img src="images/noticias/esportes1.webp" class="capa">
      <p>Empresário morre após passar mal enquanto jogava beach tennis</p>
    </li>`

    bloco.innerHTML = nova
    const bottom = document.getElementById('rodape')

    let muda = `    <center>
    <button id="geral" onclick="Geral()"><img src="images/noticias/geralCinza.png"></button>
    <button id="futebol" onclick="Esportes()" class="clicado"><img src="images/noticias/futebolVerde.png"></button>
    <button id="internacional" onclick="Internacional()"><img src="images/noticias/globoCinza.png"></button>
    <button id="politica" onclick="Politica()"><img src="images/noticias/politicaCinza.png"></button>
    <button onclick="Tv()"><img src="images/noticias/tvCinza.png"></button>
  </center>`

    bottom.innerHTML = muda
}
function Internacional(){
    const bloco = document.getElementById('bloco')

    let nova =`      <h1>Internacional</h1>
    <li id="noticia">
      <img src="images/noticias/inter1.webp" class="capa">
      <p>Lago no Havaí fica cor-de-rosa por excesso de sal;
         cientistas apontam estresse ambiental</p>
    </li>
    <li id="noticia">
      <img src="images/noticias/inter2.webp" class="capa">
      <p>Taylor Swift no Rio: fãs pedem homenagem no Cristo, e Santuário diz aguardar contato</p>
    </li>`

    bloco.innerHTML = nova
    const bottom = document.getElementById('rodape')

    let muda = `    <center>
    <button id="geral" onclick="Geral()"><img src="images/noticias/geralCinza.png"></button>
    <button id="futebol" onclick="Esportes()"><img src="images/noticias/futebolCinza.png"></button>
    <button id="internacional" onclick="Internacional()" class="clicado"><img src="images/noticias/globoVerde.png"></button>
    <button id="politica" onclick="Politica()"><img src="images/noticias/politicaCinza.png"></button>
    <button onclick="Tv()"><img src="images/noticias/tvCinza.png"></button>
  </center>`

    bottom.innerHTML = muda
}
function Politica(){
    const bloco = document.getElementById('bloco')

    let nova =`     <h1>Politica</h1>
    <li id="noticia">
      <img src="images/noticias/politica1.webp" class="capa">
      <p>Lula sanciona mudanças na Lei de Cotas que incluem quilombolas e reduzem renda máxima</p>
    </li>
    <li id="noticia">
      <img src="images/noticias/politica2.webp" class="capa">
      <p>Barroso critica projetos que mexem no STF e diz que 
        julgamento sobre maconha busca 'enfrentar política de drogas desastrosa'</p>
    </li>`

    bloco.innerHTML = nova
    const bottom = document.getElementById('rodape')

    let muda = `     <center>
    <button id="geral" onclick="Geral()"><img src="images/noticias/geralCinza.png"></button>
    <button id="futebol" onclick="Esportes()"><img src="images/noticias/futebolCinza.png"></button>
    <button id="internacional" onclick="Internacional()"><img src="images/noticias/globoCinza.png"></button>
    <button id="politica" onclick="Politica()" class="clicado"><img src="images/noticias/politicaVerde.png"></button>
    <button onclick="Tv()"><img src="images/noticias/tvCinza.png"></button>
  </center>`

    bottom.innerHTML = muda
}


/*Ferramentas*/
function ferramentas(){
    const bloco = document.getElementById('main')
    const botao = document.getElementById('voltar')
    botao.href = 'home.html'

    let nova =`         <ul>
    <li>
        <button class="fev" onclick="uber()">
            <img src="images/ferramentas/uber.png" alt="">
            <h2>Chamar um Uber</h2>
        </button>
        <button class="fev" onclick="compras()">
            <img src="images/ferramentas/compras.png" alt="">
            <h2>Fazer compras</h2>
        </button>
    </li>
    <li>
        <button class="fev" onclick="calculadora()">
            <img src="images/ferramentas/calculadora.png" alt="">
            <h2>Calculadora</h2>
        </button>
        <button class="fev" onclick="calendario()">
            <img src="images/ferramentas/calendario.png" alt="">
            <h2>Calendario</h2>
        </button>
    </li>
    <li>
        <button class="fev" onclick="notas()">
            <img src="images/ferramentas/notas.png" alt="">
            <h2>Bloco De Notas</h2>
        </button>
        <button class="fev" onclick="receitas()">
            <img src="images/ferramentas/receitas.png" alt="">
            <h2>Receitas</h2>
        </button>
    </li>
    <li>
        <button class="fev" onclick="jogos()">
            <img src="images/ferramentas/jogos.png" alt="">
            <h2>Jogos Retros</h2>
        </button>
        <button class="fev" onclick="Ia()">
            <img src="images/ferramentas/IA.png" alt="">
            <h2>Inteligencia Artificial</h2>
        </button>
    </li>
    
</ul>`

    bloco.innerHTML = nova
}
function uber(){
    const bloco = document.getElementById('main')
    const voltar = document.getElementById('bot')
    voltar.innerHTML = `            <button class="voltar" id="volta" onclick="Referra()">
    <img src="images/cabeçalho/volta.png" alt="voltar">
</button>`

    let nova =`        <ul id="BlocoUber" class="BlocoUber">
    <h3>Para onde vamos?</h3>
    <li class="uber">
        <button class="fev1">
            <div class="esquerdo"><img src="images/ferramentas/uber/casa.png " alt=""></div>
            <div class="direito">
                <h1>Casa</h2>
                <p>Rua julio De Castilhos 28</p>
            </div>

        </button>
    </li>
    <li class="uber">
        <button class="fev1">
            <div class="esquerdo"><img src="images/ferramentas/uber/igreja.png" alt=""></div>
            <div class="direito">
                <h1 class="ub">Igreja</h1>
                <p>Rua Bahia 250</p>
            </div>
            

        </button>
    </li>
    <li class="uber">
        <button class="fev1">
            <div class="esquerdo"><img src="images/ferramentas/uber/filho.png" alt=""></div>
            <div class="direito">
                <h1>Filho</h1>
                <p>Avenidada josé brambila 1020</p> 
            </div>
            
        </button>
    </li>
    <li class="uber">
        <button class="fev1">
            <div class="esquerdo"><img src="images/ferramentas/uber/medico.png" alt=""></div>
            <div class="direito">
                <h1>Hospital</h1>
                <p> rua alvicio 555</p>
            </div>
        </button>
    </li>
    <h3>Vamos a algum lugar novo?</h3>
    <li class="mais">
        <button class="fevmais">
                <img src="images/ferramentas/uber/mais.png" alt="">
        </button>
    </li>
    
</ul>` 

    bloco.innerHTML = nova
}
function compras(){

} 
function calculadora(){

}
function calendario(){

}
function notas(){

}
function Receitas(){

}
function Jogos(){

}
function Ia(){

}