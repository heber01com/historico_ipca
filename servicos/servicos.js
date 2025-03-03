import historicoInflacao from "../dados/dados.js";

export const buscaTodaColecao = () => {
    let colecao = historicoInflacao;
    return colecao;
};

export const buscaAnoEspecifico = (ano) => {
    let colecaoAno = historicoInflacao.filter((item) => item.ano === ano);
    return colecaoAno;
};

export const buscaPorId = (id) => {
    let itemSelecionado = historicoInflacao.find((item) => item.id === id);
    return itemSelecionado;
};

/*export const calculaPeriodo = (mesInicial, anoInicial, mesFinal, anoFinal) => {
    let idInicial = historicoInflacao.find((item) => item.mes === mesInicial && item.ano == anoInicial);
    let idFinal = historicoInflacao.find((item) => item.mes === mesFinal && item.ano === anoFinal);
    let idsConsiderados = historicoInflacao.filter((item) => item.id >= idInicial && item.id <= idFinal);
    return idFinal;
};*/

const selecionaPeriodo = (mesInicial, anoInicial, mesFinal, anoFinal) => {
    let periodoSelecionado = historicoInflacao.filter((item) => {
        if (anoInicial === anoFinal) {
            return item.ano === anoInicial && item.mes >= mesInicial && item.mes <= mesFinal;
        } else {
            return (
                (item.ano === anoInicial && item.mes >= mesInicial) ||
                (item.ano > anoInicial && item.ano < anoFinal) ||
                (item.ano === anoFinal && item.mes <= mesFinal)
            )
        }
    })
    return periodoSelecionado;
}

const calculaReajuste = (periodoSelecionado) => {
    let taxa = 1;
    for (const item of periodoSelecionado) {
        taxa *= (item.ipca / 100) +1
    }
    return taxa;
}

export const atualizaValores = (valor, mesInicial, anoInicial, mesFinal, anoFinal) => {
    let periodoSelecionado = selecionaPeriodo(mesInicial, anoInicial, mesFinal, anoFinal);
    let taxa = calculaReajuste(periodoSelecionado);
    let valorAtualizado = valor * taxa;
    return valorAtualizado;
}