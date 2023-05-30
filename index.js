// npm init
// npm install express
// https://www.prisma.io/docs/getting-started/quickstart
// npm install prisma --save-dev
// npx prisma init --datasource-provider sqlite  
// npx prisma migrate dev --name init 
// npm install cors

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');

const cors = require('cors');

const server = express();

server.use(cors());

server.use(express.json());



server.get('/veiculos', async (req, res)=>{
    const veiculos = await prisma.veiculo.findMany();
    return res.json(veiculos);
});

server.get('/veiculos/:placa', async (req, res)=>{
    const placa = req.params.placa;
    const veiculo = await prisma.veiculo.findFirst({
        where:{
            placa:placa
        }
    });
    return res.json(veiculo);
});

server.put('/veiculos/:placa', async(req, res)=>{
    const placa = req.params.placa;
    const veiculo = req.body;
    try {
        await prisma.veiculo.update({
            where:{
                placa:placa
            },
            data: veiculo
        });  
    } catch (error) {
        return res.status(500).json('Erro ao editar veiculo!');
    }
    return res.status(200).json('OK');
});

server.post('/veiculos', async (req, res)=>{
    const veiculo = req.body;
    try{
    await prisma.veiculo.create({
        data: veiculo
    
    });
} catch (error) {
    return res.status(500).json('Erro ao Cadastrar veiculo!');
}
    return res.status(200).json('OK');
});

server.delete('/veiculos/:placa', async (req, res)=>{
    const placa = req.params.placa;
    try{
        await prisma.veiculo.delete({
        where: {
            placa: placa
        }
    });    
} catch (error) {
    return res.status(500).json('Erro ao deletar veiculo!');
}
    return res.status(200).json('OK');
});




server.listen(3333);