const express = require('express')
const cors = require('cors')
const { pool } = require('./config')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

const controleMarca = require('./controladores/marcas')
const controleMoto = require('./controladores/motos')

app
    .route('/marcas')
    .get(controleMarca.getMarcas)
    .post(controleMarca.addMarca)
    .put(controleMarca.updateMarca)

app
    .route('/marcas/:codigo')
    .get(controleMarca.getMarcaPorCodigo)
    .delete(controleMarca.deleteMarca)


app
    .route('/motos')
    .get(controleMoto.getMotos)
    .post(controleMoto.addMoto)
    .put(controleMoto.updateMoto)

app
    .route('/motos/:codigo')
    .get(controleMoto.getMotoPorCodigo)
    .delete(controleMoto.deleteMoto)    

    
app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor rodando na porta 3002')
})



