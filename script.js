import ehUmCPF from "./valida-cpf.js"
import ehMaiorDeIdade from "./valida-idade.js"

const camposDoFormulario = document.querySelectorAll("[required]")
const formulario = document.querySelector("[data-formulario]")

async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ''

    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

        var consultaCepConvertida = await consultaCep.json()

        if (consultaCepConvertida.erro) {
            throw Error("CEP não existente")
        } else
            var cidade = document.getElementById('cidade')
        var logradouro = document.getElementById('endereco')
        var bairro = document.getElementById('bairro')

        cidade.value = consultaCepConvertida.localidade
        logradouro.value = consultaCepConvertida.logradouro
        estado.value = consultaCepConvertida.uf
        bairro.value = consultaCepConvertida.bairro

        console.log(consultaCepConvertida)
        return consultaCepConvertida

    } catch (erro) {
        console.log(erro)
        mensagemErro.innerHTML = `<p> CEP inválido. Tente novamente! </p>`
    }
}

var cep = document.getElementById('cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value))

formulario.addEventListener("submit", (e) => {
    e.preventDefault()

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "nascimento": e.target.elements["nascimento"].value,
        "telefone": e.target.elements["telefone"].value,
        "cpf": e.target.elements["cpf"].value,
        "email": e.target.elements["email"].value,
        "cep": e.target.elements["cep"].value,
        "endereco": e.target.elements["endereco"].value,
        "numero": e.target.elements["numero"].value,
        "complemento": e.target.elements["complemento"].value,
        "bairro": e.target.elements["bairro"].value,
        "cidade": e.target.elements["cidade"].value,
        "estado": e.target.elements["estado"].value
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas))
    
})


camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo))

    campo.addEventListener("invalid", evento => evento.preventDefault())
})

const tiposDeErros = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        tooShort: "Por favor, preencha um nome válido."
    },
    nascimento: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    telefone: {
        valueMissing: "O campo de telefone não pode estar vazio.",
        tooShort: "Por favor, preencha um telefone válido."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    cep: {
        valueMissing: "O campo de CEP não pode estar vazio.",
        tooShort: "Por favor, preencha um CEP válido."
    },
    endereco: {
        valueMissing: "O campo de Endereço não pode estar vazio.",
        tooShort: "Por favor, preencha um Endereço válido."
    },
    numero: {
        valueMissing: "O campo de Número não pode estar vazio.",
        tooShort: "Por favor, preencha um Número válido."
    },
    complemento: {
        valueMissing: "O campo de Complemento não pode estar vazio.",
        tooShort: "Por favor, preencha um Complemento válido."
    },
    bairro: {
        valueMissing: "O campo de Bairro não pode estar vazio.",
        tooShort: "Por favor, preencha um Bairro válido."
    },
    cidade: {
        valueMissing: "O campo de Cidade não pode estar vazio.",
        tooShort: "Por favor, preencha uma Cidade válida."
    },
    estado: {
        valueMissing: "O campo de Estado não pode estar vazio.",
        tooShort: "Por favor, preencha um Estado válido."

    }
}

function verificaCampo(campo) {
    
    let mensagem = ""
    campo.setCustomValidity("")

    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo)
    }
    if (campo.name == "nascimento" && campo.value != "") {
        ehMaiorDeIdade(campo)
    }

    tiposDeErros.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro]
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro')
    const validadorDeInput = campo.checkValidity()

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem
    } else {
        mensagemErro.textContent = ""
    }

 }

   
