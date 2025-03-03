import express from 'express';
const app = express();

import { buscaPorId , buscaAnoEspecifico , buscaTodaColecao , atualizaValores } from './servicos/servicos.js';


// Rota 4 - Cálculo de reajuste
app.get('/historicoIPCA/calculo', (req, res) => {
    const valor = parseFloat(req.query.valor);
    const mesInicial = parseInt(req.query.mesInicial);
    const anoInicial = parseInt(req.query.anoInicial);
    const mesFinal = parseInt(req.query.mesFinal);
    const anoFinal = parseInt(req.query.anoFinal);
    let valorAtualizado = atualizaValores(valor, mesInicial, anoInicial, mesFinal, anoFinal);
    res.json({ valorAtualizado: valorAtualizado.toFixed(2)});   
})

// Rota 3 - buscando por um id específico
app.get('/historicoIPCA/:id', (req, res) => {
    const idConsiderado = parseInt(req.params.id);
    let itemSelecionado = buscaPorId(idConsiderado);
    if (itemSelecionado) {
        res.json(itemSelecionado);
    } else {
        res.status(404).json({erro: 'Elemento não encontrado.'})
    }
})


// Rota 2 - buscando por um ano específico
app.get('/historicoIPCA', (req, res) => {
    const ano = parseInt(req.query.ano);
    if (ano < 2015 || ano > 2023){
        res.status(404).json({erro: 'Nenhum histórico encontrado para o ano especificado.'})
    } else {
        let colecaoAnoSelecionado = buscaAnoEspecifico(ano);
        res.send(colecaoAnoSelecionado);
    }
})


// Rota 1 - buscando toda a coleção
app.get('/', (req, res) => {
    res.send(buscaTodaColecao());
})






// Listen na porta 8080
app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
})