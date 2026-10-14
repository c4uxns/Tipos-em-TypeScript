const porEmail = (destinatario, mensagem) => {
    console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};
const porSms = (destinatario, mensagem) => {
    if (mensagem.length > 160) {
        console.log(`SMS ignorado: mensagem longa`);
        return;
    }
    console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};
const porApp = (destinatario, mensagem) => {
    console.log(`[APP] para ${destinatario}: ${mensagem}`);
};
function notificarTodos(destinatarios, mensagem, enviar) {
    destinatarios.forEach(dest => enviar(dest, mensagem));
}
const responsaveis = ['ana@escola.com', 'joao.resp'];
const msg = 'Reunião de pais sexta às 19h';
notificarTodos(responsaveis, msg, porEmail);
console.log(`[E-MAIL] para ana@escola.com: ${msg}`);
console.log(`[APP] para joao.resp: ${msg}`);
console.log(`SMS ignorado: mensagem longa`);
export {};
// Erro provocado:
// function teste(): void { return 10; } // Erro: Type 'number' is not assignable to type 'void'.
/*
Reflexão: Um notificador que retorna um número (como `const contar: Notificador = (d, m) => m.length;`) é aceito porque funções que retornam valores podem ser atribuídas a tipos de retorno `void`, visto que o chamador simplesmente ignora o valor retornado.
*/ 
