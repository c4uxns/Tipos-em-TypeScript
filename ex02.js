const nomeDigitado = ' maria da silva ';
function formatarNome(nome) {
    const palavrasIgnoradas = ['da', 'de', 'do'];
    const limpo = nome.trim().split(/\s+/).filter(Boolean);
    const formatadas = limpo.map((palavra, index) => {
        const pLower = palavra.toLowerCase();
        if (index > 0 && palavrasIgnoradas.includes(pLower)) {
            return pLower;
        }
        return pLower.charAt(0).toUpperCase() + pLower.slice(1);
    });
    return formatadas.join(' ');
}
const nomeFormatado = formatarNome(nomeDigitado);
const precoLido = Number('12.40');
const quantidadeLida = parseInt('3un', 10);
const clienteFidelidade = true;
const subtotal = quantidadeLida * precoLido;
const desconto = clienteFidelidade ? subtotal * 0.05 : 0;
const totalFinal = subtotal - desconto;
const numCupom = String(42).padStart(6, '0');
const cupom = `CUPOM Nº ${numCupom}
Cliente: ${nomeFormatado}
Item: ${quantidadeLida} x R$ ${precoLido.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${totalFinal.toFixed(2)}`;
console.log(cupom);
export {};
