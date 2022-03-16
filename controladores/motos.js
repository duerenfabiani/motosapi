const { pool } = require("../config");
const { request, response } = require("express");

const getMotos = (request, response) => {
    pool.query("select l.codigo as codigo, l.nome as nome, to_char(l.ano, \'YYYY-MM-DD\') as ano, \
    l.marca as marca, e.nome as marca_nome \
    from motos l \
    join marcas e on e.codigo = l.marca order by l.codigo", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os motos: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

module.exports.getMotos = getMotos;

const addMoto = (request, response) => {
    const { nome , ano, marca } = request.body

    pool.query(
        'insert into motos ( nome , ano, marca ) values ($1, $2, $3)',
        [ nome , ano, marca ],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir o moto: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Moto criado.' })
        }        
    )
}

module.exports.addMoto = addMoto;


const updateMoto = (request, response) => {
    const { codigo, nome , ano, marca } = request.body

    pool.query(
        'update motos set nome = $1, ano = $2, marca = $3 where codigo = $4',
        [nome , ano, marca, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar o moto: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Moto atualizado.' })
        }        
    )
}

module.exports.updateMoto = updateMoto;

const deleteMoto = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'delete from motos where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível remover o moto: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'moto removido.' })
        }        
    )
}

module.exports.deleteMoto = deleteMoto;

const getMotoPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select l.codigo as codigo, l.nome as nome, to_char(l.ano, \'YYYY-MM-DD\') as ano, \
        l.marca as marca, e.nome as marca_nome \
        from motos l \
        join marcas e on e.codigo = l.marca where l.codigo = $1 order by l.codigo ',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar o moto: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

module.exports.getMotoPorCodigo = getMotoPorCodigo;