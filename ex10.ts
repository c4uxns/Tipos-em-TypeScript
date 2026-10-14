export {};

type Placa = string;
type Periodo = [entrada: number, saida: number];

type Carro = {
    readonly placa: Placa;
    tipo: 'carro';
    portas: 2 | 4;
};

type Moto = {
    readonly placa: Placa;
    tipo: 'moto';
    cilindradas: number;
};

type Caminhao = {
    readonly placa: Placa;
    tipo: 'caminhao';
    eixos: number;
};

type Veiculo = Carro | Moto | Caminhao;

enum SituacaoTicket {
    Aberto = 'ABERTO',
    Pago = 'PAGO'
}

type Ticket = {
    veiculo: Veiculo;
    periodo: Periodo;
    selo: boolean;
    situacao: SituacaoTicket;
    valor?: number;
};

function calcularTarifa(v: Veiculo, horas: number): number {
    const h = Math.max(1, horas);
    let primeiraHora = 0;
    let horaAdicional = 0;

    switch (v.tipo) {
        case 'carro':
            primeiraHora = 8.00;
            horaAdicional = 5.00;
            break;
        case 'moto':
            primeiraHora = 4.00;
            horaAdicional = 2.00;
            break;
        case 'caminhao':
            primeiraHora = 15.00;
            horaAdicional = 10.00;
            break;
        default: {
            const _naoTratado: never = v;
            return _naoTratado;
        }
    }

    return primeiraHora + (h - 1) * horaAdicional;
}

function fecharTicket(t: Ticket): Ticket {
    const [entrada, saida] = t.periodo;
    const horas = Math.max(1, saida - entrada);
    let valorBruto = calcularTarifa(t.veiculo, horas);
    if (t.selo) {
        valorBruto *= 0.5;
    }
    return {
        ...t,
        situacao: SituacaoTicket.Pago,
        valor: valorBruto
    };
}

function registrar(msg: string): void {
    console.log(msg);
}

function falhar(msg: string): never {
    throw new Error(msg);
}

function lerVeiculo(json: string): Veiculo {
    const d: unknown = JSON.parse(json);
    if (typeof d === 'object' && d !== null && 'placa' in d && 'tipo' in d) {
        const tipo = (d as any).tipo;
        const placa = (d as any).placa;
        if (tipo === 'carro') {
            return { placa, tipo: 'carro', portas: (d as any).portas ?? 4 };
        }
        if (tipo === 'moto') {
            return { placa, tipo: 'moto', cilindradas: (d as any).cilindradas ?? 160 };
        }
        if (tipo === 'caminhao') {
            return { placa, tipo: 'caminhao', eixos: (d as any).eixos ?? 2 };
        }
        falhar(`tipo "${tipo}" desconhecido`);
    }
    falhar('veículo inválido');
}

const dadosTeste: Ticket[] = [
    { veiculo: { placa: 'ABC1D23', tipo: 'carro', portas: 4 }, periodo: [8, 11], selo: false, situacao: SituacaoTicket.Aberto },
    { veiculo: { placa: 'MOT0A12', tipo: 'moto', cilindradas: 160 }, periodo: [9, 10], selo: false, situacao: SituacaoTicket.Aberto },
    { veiculo: { placa: 'CAM9Z99', tipo: 'caminhao', eixos: 3 }, periodo: [7, 12], selo: false, situacao: SituacaoTicket.Aberto },
    { veiculo: { placa: 'XYZ4E56', tipo: 'carro', portas: 2 }, periodo: [14, 16], selo: true, situacao: SituacaoTicket.Aberto }
];

const ticketsFechados = dadosTeste.map(t => {
    const fechado = fecharTicket(t);
    const [ent, sai] = fechado.periodo;
    const horas = Math.max(1, sai - ent);
    const seloStr = fechado.selo ? ' (selo -50%)' : '';
    registrar(`[${fechado.situacao}] ${fechado.veiculo.placa} (${fechado.veiculo.tipo}) - ${horas}h - R$ ${(fechado.valor ?? 0).toFixed(2)}${seloStr}`);
    return fechado;
});

const faturamentoTotal = ticketsFechados.reduce((acc, t) => acc + (t.valor ?? 0), 0);
console.log(`Faturamento: R$ ${faturamentoTotal.toFixed(2)}`);

const contagem = ticketsFechados.reduce(
    (acc, t) => {
        if (t.veiculo.tipo === 'carro') acc.carro++;
        else if (t.veiculo.tipo === 'moto') acc.moto++;
        else if (t.veiculo.tipo === 'caminhao') acc.caminhao++;
        return acc;
    },
    { carro: 0, moto: 0, caminhao: 0 }
);
console.log(`Entradas: carro=${contagem.carro}, moto=${contagem.moto}, caminhao=${contagem.caminhao}`);

try {
    lerVeiculo('{"placa":"XYZ9999","tipo":"bicicleta"}');
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log(`Erro ao ler veículo: ${e.message}`);
    }
}