const request = require('request-promise')

function pegarTabela(result) {
    return result.split('<table class="tabelaListagemDados"')[1].split('</table>')[0]
}

function pegarTr(result) {
    return result.split('<tr')
}

function pegarTitulos(array) {
    let resultado = []

    for (let i of array) {
        if (i && i.includes('<th scope="col">')) {
            let a = i.trim().split('th scope="col"')
            for (let e of a) {
                e = e.split('</th')[0]

                e ? resultado.push(e) : false
            }
        }
    }

    return resultado
}

function pegarEstados(array) {
    let resultado = []

    for (let i of array) {
        if (i && i.includes('<td>')) {
            let a = i.split('<td>')

            a = a.filter(e => !e.includes('class') && e)

            let estado, res = {}

            a.forEach((element, index) => {
                if (index === 0) {
                    estado = element.split('</td>').join('')
                    if (estado == 'SVC-RS') {
                        estado = 'SVC_RS'
                    } else if (estado == 'SVC-AN') {
                        estado = 'SVC_AN'
                    }
                    res[estado] = []
                } else {
                    if (element.includes('img')) {
                        if (element.includes('img') && element.includes('/bola_vermelho')) res[estado].push('vermelha')
                        if (element.includes('img') && element.includes('/bola_verde')) res[estado].push('verde')
                        if (element.includes('img') && element.includes('/bola_amarela')) res[estado].push('amarela')
                    } else {
                        res[estado].push("-")
                    }

                }
            })
            autorizacao = res[estado][0]
            retorno_autorizacao = res[estado][1]
            inutilizacao = res[estado][2]
            consulta_protocolo = res[estado][3]
            status_servico = res[estado][4]
            tempo_medio = res[estado][5]
            consulta_cadastro = res[estado][6]
            recepcao_evento = res[estado][7]

            resultado.push({
                'autorizador': estado,
                'autorizacao': autorizacao,
                'retorno_autorizacao': retorno_autorizacao,
                'inutilizacao': inutilizacao,
                'consulta_protocolo': consulta_protocolo,
                'status_servico': status_servico,
                'tempo_medio': tempo_medio,
                'consulta_cadastro': consulta_cadastro,
                'recepcao_evento': recepcao_evento,
                'ultima_verificacao': new Date()
            })
        }
    }
    return resultado
}


async function chamarStatus() {
    try {
        let tabela = await request.get('https://www.nfe.fazenda.gov.br/portal/disponibilidade.aspx?versao=0.00&tipoConteudo=P2c98tUpxrI=', {
            followRedirect: false,
            headers: {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6",
                "Cookie": "AspxAutoDetectCookieSupport=1; ASP.NET_SessionId=ez1qg22qi2o3uuxtpm2jicmg",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
            }
        })

        let apenasTabela = pegarTabela(tabela)
        let tr = pegarTr(apenasTabela)
        let titulos = pegarTitulos(tr)
        let estados = pegarEstados(tr)

        return estados
        
    } catch (error) {
        console.log('Erro:', error)
    }
}

// chamarStatus().then(e => console.log(e));

exports.chamarStatus = chamarStatus