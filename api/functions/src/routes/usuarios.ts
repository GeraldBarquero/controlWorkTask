import * as express from 'express';
import config from '../db/config';


const db = config.firestore();


interface User {
    id: string;
    data: object;
}

const usuarios = express()
usuarios.get('/', async(req,res,next)=>{
    try{
        const usuariosResult = {
            ok: true,
            message: 'Exito / respondiendo'
        }
        res.json(usuariosResult);
    }catch(e){
        next(e)
    }
});

usuarios.get('/usuarios', async(req,res,next)=>{
    try{
        console.log("get all usuarios")
        console.log(req.params);
        const usuariosList = await db.collection('usuarios').get();
        const usuariosResult: User[] = [];
        usuariosList.forEach((doc) => {
            usuariosResult.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.json(usuariosResult);
    }catch(e){
        next(e)
    }
});

usuarios.get('/usuarios/:id', async(req, res, next) => {
    try {
        console.log("get user by id")
        const id = req.params.id;
        console.log(req.params);
        if (!id) throw new Error('id esta en blanco');
        const user = await db.collection('usuarios').doc(id).get();
        if (!user.exists) {
            throw new Error('usuario no existe');
        }
        res.json({
            id: user.id,
            data: user.data()
        });
    } catch(e) {
        next(e);
    }
});

usuarios.post('/usuarios', async (req, res, next) => {
    try {
        console.log(req.body)
        if (!req.body) throw new Error('No se han enviado los datos correctos');
        
        const ref = await db.collection('usuarios').add(req.body);
        res.json({
            message: 'Usuario creado',
            id: ref.id
        });
    } catch(e) {
        next(e);
    }
});


export default usuarios;