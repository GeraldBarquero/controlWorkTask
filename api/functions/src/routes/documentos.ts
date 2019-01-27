import * as express from 'express';
import config from '../db/config';

  
const db = config.firestore();

interface Documento {
    id: string;
    data: object;
}

const documentos = express()

documentos.get('/', async(req,res,next)=>{
    try{
        const documentosList = await db.collection('documentos').get();
        const documentosResult: Documento[] = [];
        documentosList.forEach((doc) => {
            documentosResult.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.json(documentosResult);
    }catch(e){
        next(e)
    }
});

documentos.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('id esta en blanco');
        const documento = await db.collection('documentos').doc(id).get();
        if (!documento.exists) {
            throw new Error('documento no existe');
        }
        res.json({
            id: documento.id,
            data: documento.data()
        });
    } catch(e) {
        next(e);
    }
});

documentos.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const text = req.body;
        if (!text) throw new Error('No se han enviado los datos correctos');
        
        const ref = await db.collection('documentos').add(req.body);
        res.json({
            message: 'documento creado',
            id: ref.id
        });
    } catch(e) {
        next(e);
    }
});


export default documentos;