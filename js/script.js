// Função assíncrona para buscar informações de endereço a partir de um CEP
async function buscaEndereco(cep) {
    const mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = ""; // Limpa a mensagem de erro

    try {
        // Faz uma requisição assíncrona para a API ViaCEP
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        // Verifica se a resposta não foi bem-sucedida
        if (!consultaCEP.ok) {
            throw new Error('Erro ao consultar CEP. Por favor, tente novamente.');
        }

        // Converte a resposta da requisição para formato JSON
        const consultaCEPConvertida = await consultaCEP.json();

        // Verifica se o CEP consultado não existe
        if (consultaCEPConvertida.erro) {
            throw new Error('CEP não existente!');
        }

        // Atualiza campos da página com as informações de endereço obtidas
        const cidade = document.getElementById('cidade');
        const logradouro = document.getElementById('endereco');
        const estado = document.getElementById('estado');

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida); // Exibe o objeto do CEP no console
        return consultaCEPConvertida; // Retorna os dados do CEP
    } catch (erro) {
        // Em caso de erro, exibe uma mensagem de erro na página
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
        console.error(erro); // Exibe o erro no console
    }
}

// Obtém o elemento HTML do campo de CEP
const cep = document.getElementById('cep');

// Adiciona um ouvinte de evento que chama a função buscaEndereco ao perder o foco
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
