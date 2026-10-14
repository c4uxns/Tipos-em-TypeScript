var StatusPedido;
(function (StatusPedido) {
    StatusPedido[StatusPedido["Recebido"] = 1] = "Recebido";
    StatusPedido[StatusPedido["EmPreparo"] = 2] = "EmPreparo";
    StatusPedido[StatusPedido["SaiuParaEntrega"] = 3] = "SaiuParaEntrega";
    StatusPedido[StatusPedido["Entregue"] = 4] = "Entregue";
    StatusPedido[StatusPedido["Cancelado"] = 5] = "Cancelado";
})(StatusPedido || (StatusPedido = {}));
var FormaPagamento;
(function (FormaPagamento) {
    FormaPagamento["PIX"] = "PIX";
    FormaPagamento["CARTAO"] = "CARTAO";
    FormaPagamento["DINHEIRO"] = "DINHEIRO";
})(FormaPagamento || (FormaPagamento = {}));
function mensagem(status) {
    switch (status) {
        case StatusPedido.Recebido:
            return 'Recebemos seu pedido!';
        case StatusPedido.EmPreparo:
            return 'Seu pedido está sendo preparado 🍳';
        case StatusPedido.SaiuParaEntrega:
            return 'O entregador está a caminho 🛵';
        case StatusPedido.Entregue:
            return 'Pedido entregue. Bom apetite!';
        case StatusPedido.Cancelado:
            return 'Pedido cancelado.';
        default:
            return '';
    }
}
function avancar(status) {
    if (status === StatusPedido.Entregue || status === StatusPedido.Cancelado) {
        return status;
    }
    return status + 1;
}
let atual = StatusPedido.Recebido;
while (atual <= StatusPedido.Entregue) {
    console.log(`[${atual} - ${StatusPedido[atual]}] ${mensagem(atual)}`);
    if (atual === StatusPedido.Entregue)
        break;
    atual = avancar(atual);
}
const pagamento = FormaPagamento.PIX;
console.log(`Pagamento: ${pagamento}`);
export {};
// Erro provocado:
// const pagamentoErrado: FormaPagamento = 'PIX'; // Erro: Type '"PIX"' is not assignable to type 'FormaPagamento'. (Enums de string exigem atribuição estrita do membro do enum).
