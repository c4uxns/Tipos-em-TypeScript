const paciente1 = {
    cpf: '123.456.789-00',
    nome: 'Ana Souza',
    idade: 34,
    plano: true,
    alergias: ['dipirona', 'lactose'],
    contatoEmergencia: { nome: 'João Souza', telefone: '(69) 98888-1111' }
};
const paciente2 = {
    cpf: '987.654.321-11',
    nome: 'Carlos Lima',
    idade: 61,
    plano: false
};
function resumo(p) {
    const alergiasStr = p.alergias && p.alergias.length > 0 ? `Alergias: ${p.alergias.join(', ')}` : 'Sem alergias registradas';
    return `${p.nome}, ${p.idade} anos. ${alergiasStr}`;
}
console.log(resumo(paciente1));
console.log(resumo(paciente2));
export {};
// Erros provocados:
// paciente1.cpf = '000.000.000-00'; // Erro: Cannot assign to 'cpf' because it is a read-only property.
// paciente1.peso = 70; // Erro: Property 'peso' does not exist on type '{ readonly cpf: string; ... }'.
/*
Reflexão:
1. let dados: object = paciente1; dados.nome; -> Erro: Property 'nome' does not exist on type 'object'.
   O tipo 'object' em TypeScript representa qualquer valor que não seja primitivo, mas ele não expõe as propriedades específicas do objeto atribuído.
2. let x: {} = 10; -> Aceito porque o tipo '{}' (objeto vazio) aceita qualquer valor que não seja `null` ou `undefined` (primitivos inclusive).
   let y: object = 10; -> Erro porque 'object' restringe estritamente a valores não-primitivos (objetos, funções, arrays), rejeitando números como 10.
*/ 
