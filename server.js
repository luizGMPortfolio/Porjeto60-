const express = require('express')

const fs = require("fs");

// https://expressjs.com/en/4x/api.html 
const app = express()
app.use(express.static("public"))

// https://nodejs.org/api/http.html
const http = require('http').Server(app)

// https://socket.io
const serverSocket = require('socket.io')(http)

const PORTA = process.env.PORT || 8080

const host = "http://localhost"

http.listen(PORTA, () => {
    const portaStr = PORTA === 80 ? '' : ':' + PORTA
    if (process.env.HEROKU_APP_NAME)
        console.log('Servidor iniciado. Abra o navegador em ' + host)
    else console.log('Servidor iniciado. Abra o navegador em ' + host + portaStr)
})

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.get('/login.html', (req, res) => res.sendFile(__dirname + '/login'))
app.get('/home.html', (req, res) => res.sendFile(__dirname + '/home.html'))
app.get('/cadastro.html', (req, res) => res.sendFile(__dirname + '/cadastro.html'))

function recebeConexaoUsuario(socket) {
    socket.on('login', (nickname, senha) => LoginUsuario(socket, nickname, senha))
    socket.on('cadastrar', (nome, numero, email, senha) => CadastraUser(socket, nome, numero, email, senha))
    socket.on('addcontato', (token, add) => AddContato(socket, token, add))
    socket.on('disconnect', () => console.log('Cliente desconectado: ' + socket.nickname))
    socket.on('chat msg', (msg) => encaminhaMsgsUsuarios(socket, msg))
    socket.on('status', (msg) => encaminhaMsgStatus(socket, msg))

}
function encaminhaMsgStatus(socket, msg) {
    console.log(msg)
    socket.broadcast.emit('status', msg)
}
function encaminhaMsgsUsuarios(socket, msg) {
    serverSocket.emit('chat msg', `${socket.nickname} diz: ${msg}`)
}
function LoginUsuario(socket, nickname, senha) {
    const usuarioscad = fs.readFileSync('./usuarios.json')
    const usuariosparse = JSON.parse(usuarioscad)

    socket.nickname = nickname
    const s = senha

    for (var umUsuario of usuariosparse) {
        if (socket.nickname == umUsuario.nome && s == umUsuario.senha) {

            const Contato = fs.readFileSync('./contatos.json')
            const Contatoparse = JSON.parse(Contato)

            for (var umContato of Contatoparse) {
                if (umContato.id == umUsuario.numero) {
                    serverSocket.emit('login', umUsuario.numero, umContato.conversas)
                }
            }
        }
    }
}
function CadastraUser(socket, nome, numero, email, senha) {
    const usuarioscad = fs.readFileSync('./usuarios.json')
    const usuariosparse = JSON.parse(usuarioscad)

    var nomes = nome
    var senha = senha
    var numero = numero
    var email = email

    const datauser = {
        nome: nomes,
        senha: senha,
        numero: numero,
        email: email
    }

    usuariosparse.push(datauser)

    fs.writeFile('./usuarios.json', JSON.stringify(usuariosparse, null, 4), (error, result) => {
        if (error) {
            console.error(error)

            return
        }
        console.log(result)
        socket.emit('cadastrar', 'User Cadastrado')
    })

    const Contato = fs.readFileSync('./contatos.json')
    const Contatoparse = JSON.parse(Contato)

    var id = numero
    var status = 0
    var convarsas = []

    const contuser = {
        id: id,
        status: status,
        convarsas: convarsas
    }

    Contatoparse.push(contuser)

    fs.writeFile('./contatos.json', JSON.stringify(Contatoparse, null, 3), (error, result) => {
        if (error) {
            console.error(error)

            return
        }
        console.log(result)
        socket.emit('cadastrar', 'ContatoUser Criado')
    })

}
function AddContato(socket, token, Add) {
    const ConversaAdd = fs.readFileSync('./conversas.json')
    const conversasparse = JSON.parse(ConversaAdd)
    cont = 0
    for (var umUsuario of conversasparse) {
        cont += 1
    }
    const id = 'C' + cont + 1

    const conver = {
        id: id,
        user1: token,
        user2: Add,
        mensagem: [],
        msnNulluser1: 0,
        msnNulluser2: 0
    }

    conversasparse.push(conver)

    fs.writeFile('./conversas.json', JSON.stringify(conversasparse, null, 6), (error, result) => {
        if (error) {
            console.error(error)

            return
        }
        console.log('ok')
    })

    const Contato = fs.readFileSync('./contatos.json')
    const Contatoparse = JSON.parse(Contato)

    for (var umUsuario of Contatoparse) {
        if (umUsuario.id == token) {
            Contatoparse.conversas.push(Add, id)
        }
        else if (umUsuario.id == Add) {
            Contatoparse.conversas.push(token, id)
        }
    }
    fs.writeFile('./contatos.json', JSON.stringify(Contatoparse, null, 2), (error, result) => {
        if (error) {
            console.error(error)

            return
        }
        console.log(result)
    })
}
serverSocket.on('connect', recebeConexaoUsuario)
