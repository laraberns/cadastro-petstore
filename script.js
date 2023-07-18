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

