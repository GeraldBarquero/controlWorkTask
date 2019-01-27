import * as express from 'express';
import config from '../db/config';


const db = config.firestore();


interface User {
    id: string;
    data: object;
}

const users = express()
users.get('/', async(req,res,next)=>{
    try{
        const usersResult = {
            ok: true,
            message: 'Exito / respondiendo'
        }
        res.json(usersResult);
    }catch(e){
        next(e)
    }
});

users.get('/users', async(req,res,next)=>{
    try{
        const usersList = await db.collection('users').get();
        const usersResult: User[] = [];
        usersList.forEach((doc) => {
            usersResult.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.json(usersResult);
    }catch(e){
        next(e)
    }
});

users.get('/users:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('id esta en blanco');
        const user = await db.collection('users').doc(id).get();
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

users.post('/users', async (req, res, next) => {
    try {
        console.log(req.body)
        const text = req.body;
        if (!text) throw new Error('No se han enviado los datos correctos');
        
        const ref = await db.collection('users').add(req.body);
        res.json({
            message: 'Usuario creado',
            id: ref.id
        });
    } catch(e) {
        next(e);
    }
});


export default users;