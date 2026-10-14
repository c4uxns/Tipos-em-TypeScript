const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';
// 1. Versão com any (para ver o problema)
function lerComAny(json) {
    const dados = JSON.parse(json);
    console.log(`${dados.cidade}: ${dados.temperatura.toFixed(1)}°C`);
}
// lerComAny(respostaQuebrada); // Lançaria TypeError em execução: dados.temperatura.toFixed is not a function
// 3. Função never
function falhar(mensagem) {
    throw new Error(mensagem);
}
// 2 & 4. Versão segura com unknown
function lerClima(json) {
    const dados = JSON.parse(json);
    if (typeof dados === 'object' &&
        dados !== null &&
        'cidade' in dados &&
        typeof dados.cidade === 'string' &&
        'temperatura' in dados &&
        typeof dados.temperatura === 'number') {
        return {
            cidade: dados.cidade,
            temperatura: dados.temperatura
        };
    }
    if (typeof dados === 'object' &&
        dados !== null &&
        'temperatura' in dados &&
        typeof dados.temperatura !== 'number') {
        falhar('campo "temperatura" inválido');
    }
    falhar('dados inválidos');
}
const respostas = [respostaOk, respostaQuebrada, respostaInvalida];
for (const resp of respostas) {
    try {
        const resultado = lerClima(resp);
        console.log(`${resultado.cidade}: ${resultado.temperatura.toFixed(1)}°C`);
    }
    catch (erro) {
        if (erro instanceof Error) {
            if (erro.message.includes('JSON') || erro.name === 'SyntaxError') {
                try {
                    falhar('JSON malformado');
                }
                catch (e) {
                    if (e instanceof Error)
                        console.log(`Erro: ${e.message}`);
                }
            }
            else {
                console.log(`Erro: ${erro.message}`);
            }
        }
    }
}
export {};
