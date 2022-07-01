const express = require('express')
const router = express.Router()
const { chamarStatus } = require('../nfe.js')

router.use(express.json())

router.get('/data/:data', async (req, res) => {
    let status = await chamarStatus()

    let filtro = status.filter((valorAtual) => {
        let data = valorAtual.ultima_verificacao
        let dataFormatada = new Date(data)
 
        let paramsDataAno = req.params.data
        let paramsDataMes = req.params.data
        let paramsDataDia = req.params.data

        const compararAno = paramsDataAno == dataFormatada.getFullYear()
        const compararMes = paramsDataMes == dataFormatada.getMonth() + 1
        const compararDia = paramsDataDia == dataFormatada.getDate()

        return compararAno || compararMes || compararDia
    })

    res.json(filtro)

})

router.get('/estado/:estado', async (req, res) => {

    let status = await chamarStatus()
    let params = req.params.estado

    let filtro = status.filter(valorAtual => {

        let verificar = valorAtual.autorizador.includes(params)

        if (verificar == true) {
            return valorAtual
        }
    })

    res.json(filtro)

})

router.get('/', async (req, res) => {

    let status = await chamarStatus()
    res.json(status)

})

router.use(function (req, res, next) {
    res.status(404).send({ message: 'Erro 404: Página não encontrada!' })
})


module.exports = router