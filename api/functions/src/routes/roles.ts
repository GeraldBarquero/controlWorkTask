import * as express from 'express';
import config from '../db/config';

  
const db = config.firestore();

interface Rol {
    id: string;
    data: object;
}

const roles = express()

roles.get('/', async(req,res,next)=>{
    try{
        const rolesList = await db.collection('roles').get();
        const rolesResult: Rol[] = [];
        rolesList.forEach((doc) => {
            rolesResult.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.json(rolesResult);
    }catch(e){
        next(e)
    }
});

roles.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('id esta en blanco');
        const rol = await db.collection('roles').doc(id).get();
        if (!rol.exists) {
            throw new Error('rol no existe');
        }
        res.json({
            id: rol.id,
            data: rol.data()
        });
    } catch(e) {
        next(e);
    }
});

roles.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const text = req.body;
        if (!text) throw new Error('No se han enviado los datos correctos');
        
        const ref = await db.collection('roles').add(req.body);
        res.json({
            message: 'Rol creado',
            id: ref.id
        });
    } catch(e) {
        next(e);
    }
});


export default roles;