import * as express from 'express';
import config from '../db/config';

  
const db = config.firestore();

interface Modulo {
    id: string;
    data: object;
}

const modulos = express()

modulos.get('/', async(req,res,next)=>{
    try{
        const modulosList = await db.collection('modulos').get();
        const modulosResult: Modulo[] = [];
        modulosList.forEach((doc) => {
            modulosResult.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.json(modulosResult);
    }catch(e){
        next(e)
    }
});

modulos.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('id esta en blanco');
        const modulo = await db.collection('modulos').doc(id).get();
        if (!modulo.exists) {
            throw new Error('modulo no existe');
        }
        res.json({
            id: modulo.id,
            data: modulo.data()
        });
    } catch(e) {
        next(e);
    }
});

modulos.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const text = req.body;
        if (!text) throw new Error('No se han enviado los datos correctos');
        
        const ref = await db.collection('modulos').add(req.body);
        res.json({
            message: 'modulo creado',
            id: ref.id
        });
    } catch(e) {
        next(e);
    }
});


export default modulos;