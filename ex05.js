const leituras = [
    ['Porto Velho', 34],
    ['Curitiba', 12],
    ['Manaus', 31],
    ['Porto Alegre', 9],
    ['Natal', 29]
];
function extremos(temps) {
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    return [min, max];
}
for (const [cidade, temp] of leituras) {
    console.log(`${cidade}: ${temp}°C`);
}
const temperaturas = leituras.map(l => l[1]);
const [minima, maxima] = extremos(temperaturas);
const media = temperaturas.reduce((a, b) => a + b, 0) / temperaturas.length;
console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);
const contato1 = ['Ana', '(69) 99999-1234', 'ana@imprensa.com'];
const contato2 = ['Carlos', '(69) 98888-5678'];
const historicoPortoVelho = ['Porto Velho', 32, 33, 34, 31, 35, 34, 33];
const tempsHistorico = historicoPortoVelho.slice(1);
const mediaHistorico = tempsHistorico.reduce((a, b) => a + b, 0) / tempsHistorico.length;
const capitalOficial = ['RO', 'Porto Velho'];
export {};
// capitalOficial[0] = 'AC'; // Erro: Cannot assign to index because it is a read-only property.
