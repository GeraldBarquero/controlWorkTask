import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';
//import * as firebaseHelper from 'firebase-functions-helper';
import roles from './routes/roles';
import usuarios from './routes/usuarios';
import modulos from './routes/modulos';
import tareas from './routes/tareas';
import documentos from './routes/documentos';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',usuarios);
app.use('/roles/',roles);
app.use('/modulos/',modulos);
app.use('/tareas/',tareas);
app.use('/documentos/',documentos);
app.use(cors({ origin: true }));
export const apiRest = functions.https.onRequest(app);
