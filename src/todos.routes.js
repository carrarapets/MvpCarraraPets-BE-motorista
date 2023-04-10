
const { response } = require("express");

const express = require("express")
const {generateToken} = require("./auth")
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

todosRoutes.post("/createmotorista", async(request, response) =>{
    try {
        const{nome, sobrenome, CNH, celular, email, password,validade_cnh, ant_criminal, foto, }=request.body;
    const criaUsuario = await prisma.motorista.create({
        data:{
            nome,
            sobrenome,
            CNH,
            celular,
            email,
            password,
            valido: true,
            validade_cnh,
            ant_criminal, 
            foto
            

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
todosRoutes.get("/loginMotorista", async(request, response)=>{
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
    const comparaSenha =  equal(motorista.password, password);
    if (!comparaSenha) {
        throw new Error("Usuário/Senha incorreto")
        
    }
    const token =generateToken(id);
    return response.status(200).json({token});
        
    } catch (error) {
        return response.status(500).json({message: error.message});
    }
    
});


todosRoutes.get("/getMotorista/:id", verifyToken, async(request, response)=>{
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

todosRoutes.post("/updatemotorista/:id",verifyToken, async(request, response)=>{
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
            valido: true,
            validade_cnh,
            ant_criminal, 
            foto
            
        }
    });
    return response.status(200).json(atualizaUsuario);
    } catch (error) {
        return response.status(200).json({message: error.message});
    }
    
});

todosRoutes.delete("/deletemotorista/:id",verifyToken, async(request, response)=>{
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
            validade_cnh,
            ant_criminal, 
            foto
            
        }

        
    });
    return response.status(200).json("usuario excluido com sucesso");
    } catch (error) {
        return response.status(500).json({message: error.message});
    }
    
});
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
    }

    
});
return response.status(200).json(criaCarro);
    } catch (error) {
        return response.status(200).json({message: error.message});
    }

});
todosRoutes.get("/getcar/:id",verifyToken, async (request, response) =>{

    try {
        const {motoristaId} = request.body;
 const mostraPet =  await prisma.user.findMany({
    where:{
        Id: motoristaId
    }

 });
  return reponse.status(200).json(mostraCarro);
    } catch (error) {
        return reponse.status(200).json({message: error.message});
    }
});

todosRoutes.post("/updatecar/:id",verifyToken, async(request, response)=>{
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