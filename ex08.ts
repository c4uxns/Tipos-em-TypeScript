export {};

function formatarCodigo(c: number | string): string {
    if (typeof c === 'number') {
        return `CLI-${String(c).padStart(4, '0')}`;
    }
    return c;
}

type TamanhoCamiseta = 'P' | 'M' | 'G' | 'GG';
const tamanho: TamanhoCamiseta = 'M';
// const tamanhoErrado: TamanhoCamiseta = 'XG'; // Erro: Type '"XG"' is not assignable to type 'TamanhoCamiseta'.

type Regiao = 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul';
function calcularFrete(regiao: Regiao): number {
    switch (regiao) {
        case 'norte': return 25;
        case 'nordeste': return 20;
        case 'centro-oeste': return 18;
        case 'sudeste': return 12;
        case 'sul': return 15;
    }
}

const complemento: string | null = null;
const complementoStr = complemento ?? '(sem complemento)';

function limparTelefone(tel: string | number): string {
    return String(tel).replace(/\D/g, '');
}

console.log(`Cliente: ${formatarCodigo(42)} | Camiseta: ${tamanho}`);
console.log(`Entrega: Rua das Flores, 100 - ${complementoStr}`);
console.log(`Frete para o sul: R$ ${calcularFrete('sul').toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);

/*
Reflexão sobre inferência de literais:
`const r = 'sul'` infere o tipo literal `'sul'`, por isso pode ser passado diretamente para `calcularFrete`.
`let r2 = 'sul'` infere o tipo geral `string` (pois variáveis `let` podem ter seu valor reatribuído), e `string` não é atribuível ao tipo literal restrito `Regiao`.
Para corrigir o caso do `let`, deve-se tipá-lo explicitamente com `let r2: Regiao = 'sul'`.
*/