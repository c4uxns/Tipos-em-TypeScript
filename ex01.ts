export {};

const nomeProduto1: string = 'Pão francês';
const precoUnitario1: number = 0.75;
const quantidade1: number = 12;

const nomeProduto2 = 'Bolo de cenoura';
const precoUnitario2 = 18.5;
const quantidade2 = 2;

const aberta = true; // inferido: boolean

const subtotal1 = quantidade1 * precoUnitario1;
const subtotal2 = quantidade2 * precoUnitario2;
const total = subtotal1 + subtotal2;

const paesAno = 1_250_000;
const categoria = 0x1A;

console.log(`${nomeProduto1}: ${quantidade1} x R$ ${precoUnitario1.toFixed(2)} = R$ ${subtotal1.toFixed(2)}`);
console.log(`${nomeProduto2}: ${quantidade2} x R$ ${precoUnitario2.toFixed(2)} = R$ ${subtotal2.toFixed(2)}`);
console.log(`Total: R$ ${total.toFixed(2)}`);
console.log(`Padaria aberta? ${aberta}`);
console.log(`Pães vendidos no ano: ${paesAno}`);
console.log(`Categoria: ${categoria}`);

// Erro provocado:
// quantidade1 = 'doze'; // Erro: Type 'string' is not assignable to type 'number'.