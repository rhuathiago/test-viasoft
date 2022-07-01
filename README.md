<h1>Verificar status dos serviços de Nfe</h1>
Projeto criado em Node e Express para verificar status dos serviços de Nota Fiscal Eletrônica por estado, utilizando a página https://www.nfe.fazenda.gov.br/portal/disponibilidade.aspx?versao=0.00&tipoConteudo=P2c98tUpxrI="

## Pacotes instalados

<p>node</p>
<p>express</p>
<p>mysql</p>
<p>request-promise</p>

## Instalar

```

npm install express mysql request-promise

```

## Rodar serviços

Para rodar os serviços, envie a requisição localhost:3000/routes/ para algum API Client (como o Postman).

Rotas utilizadas:
<p>/routes/estado/</p>
<p>/routes/data</p>

```

npm start

```

## Filtro por estado

Para filtrar por autorizador, basta utilizar a rota '/estado/' e digitar o autorizador que você deseja ou alguma letra (maiúscula) que o autorizador possui. Caso outro autorizador possua a mesma letra, ele também irá ser retornado.

## Filtro data

Para filtrar por data, basta utilizar a rota '/data/' e digitar o dia, mês ou ano.
