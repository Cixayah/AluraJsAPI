// Função assíncrona para buscar informações de endereço a partir de um CEP
async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = ""; // Limpa a mensagem de erro

    try {
        // Faz uma requisição assíncrona para a API ViaCEP
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        
        // Converte a resposta da requisição para formato JSON
        var consultaCEPConvertida = await consultaCEP.json();

        // Verifica se o CEP consultado não existe
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }

        // Atualiza campos da página com as informações de endereço obtidas
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida); // Exibe o objeto do CEP na console
        return consultaCEPConvertida; // Retorna os dados do CEP
    } catch (erro) {
        // Em caso de erro, exibe uma mensagem de erro na página
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
        console.log(erro); // Exibe o erro na console
    }
}

// Obtém o elemento HTML do campo de CEP
var cep = document.getElementById('cep');

// Adiciona um ouvinte de evento que chama a função buscaEndereco ao perder o foco
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
