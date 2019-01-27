import * as express from 'express';
import config from '../db/config';

  
const db = config.firestore();

interface Tarea {
    id: string;
    data: object;
}

const tareas = express()

tareas.get('/', async(req,res,next)=>{
    try{
        const tareasList = await db.collection('tareas').get();
        const tareasResult: Tarea[] = [];
        tareasList.forEach((doc) => {
            tareasResult.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.json(tareasResult);
    }catch(e){
        next(e)
    }
});

tareas.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('id esta en blanco');
        const tarea = await db.collection('tareas').doc(id).get();
        if (!tarea.exists) {
            throw new Error('tarea no existe');
        }
        res.json({
            id: tarea.id,
            data: tarea.data()
        });
    } catch(e) {
        next(e);
    }
});

tareas.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const text = req.body;
        if (!text) throw new Error('No se han enviado los datos correctos');
        
        const ref = await db.collection('tareas').add(req.body);
        res.json({
            message: 'tarea creada',
            id: ref.id
        });
    } catch(e) {
        next(e);
    }
});


export default tareas;