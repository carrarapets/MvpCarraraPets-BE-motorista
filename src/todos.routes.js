
const { response } = require("express");

const express = require("express")
const jwt = require('jsonwebtoken');
const ConfigServerEmail = require('./serverEmail');
const todosRoutes = express.Router();
const {PrismaClient} = require("@prisma/client");
const { equal } = require("assert");

const prisma = new PrismaClient();
const secret = process.env.SECRET;

function verifyJwt (request, response, next){
    const token =  req.headers['x-access-token'];
    jwt.verify(token, secret, async(err, decoded) =>{
        if(err) return response.status(401).end();

        request.loginUser = decoded.loginUser;


    })
};

todosRoutes.post("/CreateMotorista", async(request, response) =>{
    try {
        const{nome, sobrenome, email, CNH, password, foto,
        ant_criminal, celular}=request.body;
    const criaUsuario = await prisma.motorista.create({
        data:{
            nome,
            sobrenome,
            CNH,
            celular,
            email,
            password,
            valido: true,
            rg, 
            foto,
            ant_criminal
            

        },
    },
    ConfigServerEmail.sendMail({
        from:'Carrara Pets <carrarapets@gmail.com>',
        to: email,
        subject: 'Cadastro Completo',
        html:' <h1>oi,'+ nome+' '+sobrenome+ ' tudo bem?</h1> <p> eviando esse email, para confirmar seu cadastro',
        text:'oi, tudo bem? Estou testando o envio de email'
    
    })
    .then((reponse)=> console.log('Email enviado com sucesso') )
    .catch((err) => console.log('Erro ao enviar email', err))
    
    );
    return response.status(201).json(criaUsuario);
        
    } catch (error) {
        return response.status(500).json({message: error.message});
    }
    
});
todosRoutes.post("/LoginMotorista", async(request, response)=>{
    try {
        const {email, password}= request.body;
    
        const loginUser =  await prisma.motorista.findFirst({
            where:{
                email: email,
                password: password

            }
        })
        
    if(!loginUser){
        throw new Error("Usuário/Senha incorreto")

    }
    return response.status(200).json("login efetuado com sucesso");
        
    } catch (error) {
        return response.status(500).json({message: error.message});
    }
    
});


todosRoutes.get("/GetMotorista/:id", async(request, response)=>{
    try {
        const {id} = request.params;
    const lerUsuario = await prisma.motorista.findUnique({
        where:{
            id: Number(id)
        },

    })
    return response.status(200).json(lerUsuario);
    } catch (error) {
        return response.status(200).json({message: error.message});
    }
    
    
});
todosRoutes.get("/", (req, res) =>{
    res.json({
       message: "hello word"
    });
    
});

todosRoutes.post("/UpdateMotorista/:id", async(request, response)=>{
    try {
        const{id} = request.params;
    const atualizaUsuario = await prisma.motorista.update({
        where:{
            id: Number(id)
        },
        data:{
            nome,
            sobrenome,
            CNH,
            celular,
            email,
            password,
            rg, 
            foto,
            ant_criminal
            
        }
    });
    return response.status(200).json(atualizaUsuario);
    } catch (error) {
        return response.status(200).json({message: error.message});
    }
    
});

todosRoutes.delete("/DeleteMotorista/:id", async(request, response)=>{
    try {
        const{id}= request.params;
    const deletaUsuario = await prisma.motorista.delete({
        where:{
            id: Number(id)
        },
        data:{
            nome,
            sobrenome,
            CNH,
            celular,
            email,
            password,
            valido: true,
            rg, 
            foto,
            ant_criminal
            
        }

        
    });
    return response.status(200).json("usuario excluido com sucesso");
    } catch (error) {
        return response.status(500).json({message: error.message});
    }
    
});
// ROTAS USUARIO COM PET
todosRoutes.post("/CreateCarro/", async(request, response)=>{
    try {
        const {placa, modelo, marca, renavam, cor, motoristaId}= request.params;
const criaCarro = await prisma.carro.create({
    data:{
    placa,
    modelo,
    marca,
    renavam,
    cor,
    motoristaId 
    }

    
});
return response.status(200).json(criaCarro);
    } catch (error) {
        return response.status(200).json({message: error.message});
    }

});
todosRoutes.get("/GetCarro/:id", async (request, response) =>{

    try {
        const {motoristaId} = request.body;
 const mostraCarro =  await prisma.user.findMany({
    where:{
        Id: motoristaId
    }

 });
  return reponse.status(200).json(mostraCarro);
    } catch (error) {
        return reponse.status(200).json({message: error.message});
    }
});

todosRoutes.post("/UpdateCarro/:id", async(request, response)=>{
    try {
        const {motoristaId}= request.params;
const criaPet = await prisma.pet.create({
    where:{
        id: Number(motoristaId)

    },
    data:{
        placa,
        modelo,
        marca,
        renavam,
        cor,
        
    }

    
});
return response.status(200).json("Dados Atualizados com sucesso");
    } catch (error) {
        return response.status(200).json({message: error.message});
    }

});


module.exports = todosRoutes;