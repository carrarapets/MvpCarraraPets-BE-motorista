
const { response } = require("express");

const express = require("express")
<<<<<<< HEAD
const {generateToken} = require("./auth")
=======
const jwt = require('jsonwebtoken');
const ConfigServerEmail = require('./serverEmail');
>>>>>>> 216448d5cc4c9e2e4fbcf8a7ed4fc20b39063e3f
const todosRoutes = express.Router();
const {PrismaClient} = require("@prisma/client");
const { equal } = require("assert");
const { verifyToken } = require("./authMiddleware");

const prisma = new PrismaClient();
const secret = process.env.SECRET;

function verifyJwt (request, response, next){
    const token =  req.headers['x-access-token'];
    jwt.verify(token, secret, async(err, decoded) =>{
        if(err) return response.status(401).end();

        request.loginUser = decoded.loginUser;


    })
};

<<<<<<< HEAD
todosRoutes.post("/createmotorista", async(request, response) =>{
    try {
        const{nome, sobrenome, CNH, celular, email, password,validade_cnh, ant_criminal, foto, }=request.body;
=======
todosRoutes.post("/CreateMotorista", async(request, response) =>{
    try {
        const{nome, sobrenome, email, CNH, password, foto,
        ant_criminal, celular}=request.body;
>>>>>>> 216448d5cc4c9e2e4fbcf8a7ed4fc20b39063e3f
    const criaUsuario = await prisma.motorista.create({
        data:{
            nome,
            sobrenome,
            CNH,
            celular,
            email,
            password,
            valido: true,
<<<<<<< HEAD
            validade_cnh,
            ant_criminal, 
            foto
=======
            rg, 
            foto,
            ant_criminal
>>>>>>> 216448d5cc4c9e2e4fbcf8a7ed4fc20b39063e3f
            

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
<<<<<<< HEAD
todosRoutes.get("/loginMotorista", async(request, response)=>{
=======
todosRoutes.post("/LoginMotorista", async(request, response)=>{
>>>>>>> 216448d5cc4c9e2e4fbcf8a7ed4fc20b39063e3f
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
<<<<<<< HEAD
    const comparaSenha =  equal(motorista.password, password);
    if (!comparaSenha) {
        throw new Error("Usuário/Senha incorreto")
        
    }
    const token =generateToken(id);
    return response.status(200).json({token});
=======
    return response.status(200).json("login efetuado com sucesso");
>>>>>>> 216448d5cc4c9e2e4fbcf8a7ed4fc20b39063e3f
        
    } catch (error) {
        return response.status(500).json({message: error.message});
    }
    
});


<<<<<<< HEAD
todosRoutes.get("/getMotorista/:id", verifyToken, async(request, response)=>{
=======
todosRoutes.get("/GetMotorista/:id", async(request, response)=>{
>>>>>>> 216448d5cc4c9e2e4fbcf8a7ed4fc20b39063e3f
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

<<<<<<< HEAD
todosRoutes.post("/updatemotorista/:id",verifyToken, async(request, response)=>{
=======
todosRoutes.post("/UpdateMotorista/:id", async(request, response)=>{
>>>>>>> 216448d5cc4c9e2e4fbcf8a7ed4fc20b39063e3f
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
<<<<<<< HEAD
            valido: true,
            validade_cnh,
            ant_criminal, 
            foto
=======
            rg, 
            foto,
            ant_criminal
>>>>>>> 216448d5cc4c9e2e4fbcf8a7ed4fc20b39063e3f
            
        }
    });
    return response.status(200).json(atualizaUsuario);
    } catch (error) {
        return response.status(200).json({message: error.message});
    }
    
});

<<<<<<< HEAD
todosRoutes.delete("/deletemotorista/:id",verifyToken, async(request, response)=>{
=======
todosRoutes.delete("/DeleteMotorista/:id", async(request, response)=>{
>>>>>>> 216448d5cc4c9e2e4fbcf8a7ed4fc20b39063e3f
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
<<<<<<< HEAD
            validade_cnh,
            ant_criminal, 
            foto
=======
            rg, 
            foto,
            ant_criminal
>>>>>>> 216448d5cc4c9e2e4fbcf8a7ed4fc20b39063e3f
            
        }

        
    });
    return response.status(200).json("usuario excluido com sucesso");
    } catch (error) {
        return response.status(500).json({message: error.message});
    }
    
});
<<<<<<< HEAD
// ROTAS MOTORISTA COM CARRO
todosRoutes.post("/createcar/",verifyToken, async(request, response)=>{
    try {
        const {motoristaId,placa, modelo, marca, renavam, cor}= request.params;
const criaPet = await prisma.pet.create({
    data:{
  placa,
  modelo,
  marca,
  renavam,
  cor,
  motoristaId    
=======
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
>>>>>>> 216448d5cc4c9e2e4fbcf8a7ed4fc20b39063e3f
    }

    
});
return response.status(200).json(criaCarro);
    } catch (error) {
        return response.status(200).json({message: error.message});
    }

});
<<<<<<< HEAD
todosRoutes.get("/getcar/:id",verifyToken, async (request, response) =>{

    try {
        const {motoristaId} = request.body;
 const mostraPet =  await prisma.user.findMany({
=======
todosRoutes.get("/GetCarro/:id", async (request, response) =>{

    try {
        const {motoristaId} = request.body;
 const mostraCarro =  await prisma.user.findMany({
>>>>>>> 216448d5cc4c9e2e4fbcf8a7ed4fc20b39063e3f
    where:{
        Id: motoristaId
    }

 });
  return reponse.status(200).json(mostraCarro);
    } catch (error) {
        return reponse.status(200).json({message: error.message});
    }
});

<<<<<<< HEAD
todosRoutes.post("/updatecar/:id",verifyToken, async(request, response)=>{
=======
todosRoutes.post("/UpdateCarro/:id", async(request, response)=>{
>>>>>>> 216448d5cc4c9e2e4fbcf8a7ed4fc20b39063e3f
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
<<<<<<< HEAD
        cor,  
=======
        cor,
        
>>>>>>> 216448d5cc4c9e2e4fbcf8a7ed4fc20b39063e3f
    }

    
});
return response.status(200).json("Dados Atualizados com sucesso");
    } catch (error) {
        return response.status(200).json({message: error.message});
    }

});


module.exports = todosRoutes;