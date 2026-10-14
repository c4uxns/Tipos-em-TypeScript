export {};

const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

// 1. Versão com any (para ver o problema)
function lerComAny(json: string): void {
    const dados: any = JSON.parse(json);
    console.log(`${dados.cidade}: ${dados.temperatura.toFixed(1)}°C`);
}
// lerComAny(respostaQuebrada); // Lançaria TypeError em execução: dados.temperatura.toFixed is not a function

// 3. Função never
function falhar(mensagem: string): never {
    throw new Error(mensagem);
}

// 2 & 4. Versão segura com unknown
function lerClima(json: string): { cidade: string; temperatura: number } {
    const dados: unknown = JSON.parse(json);
    if (
        typeof dados === 'object' &&
        dados !== null &&
        'cidade' in dados &&
        typeof (dados as any).cidade === 'string' &&
        'temperatura' in dados &&
        typeof (dados as any).temperatura === 'number'
    ) {
        return {
            cidade: (dados as any).cidade,
            temperatura: (dados as any).temperatura
        };
    }
    if (
        typeof dados === 'object' &&
        dados !== null &&
        'temperatura' in dados &&
        typeof (dados as any).temperatura !== 'number'
    ) {
        falhar('campo "temperatura" inválido');
    }
    falhar('dados inválidos');
}

const respostas = [respostaOk, respostaQuebrada, respostaInvalida];
for (const resp of respostas) {
    try {
        const resultado = lerClima(resp);
        console.log(`${resultado.cidade}: ${resultado.temperatura.toFixed(1)}°C`);
    } catch (erro: unknown) {
        if (erro instanceof Error) {
            if (erro.message.includes('JSON') || erro.name === 'SyntaxError') {
                try {
                    falhar('JSON malformado');
                } catch (e: unknown) {
                    if (e instanceof Error) console.log(`Erro: ${e.message}`);
                }
            } else {
                console.log(`Erro: ${erro.message}`);
            }
        }
    }
}