import { pool } from '../db.js'
import router from '../routes/index.routes.js'

export const getCategories = async (req,res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM category')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getCategory = async (req,res) => {
    const id = req.params.id
    try {
        const [rows] = await pool.query('SELECT * FROM category WHERE id = ?', [id])
        if( rows.length <= 0) return res.status(404).json({
            message: 'Category not found'
        })
        res.json(rows[0])   
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createCategories = async (req,res) => {
    const {name, code} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO category (name,code) VALUES (?, ?)', [name, code])
        res.send({
             id: rows.insertId,
             name,
             code
         })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deleteCategories = async (req,res) => {
    const id = req.params.id
    try {
        const [result] = await pool.query('DELETE FROM category WHERE id = ?', [id])
        if( result.affectedRows <= 0) return res.status(404).json({
            message: 'Category not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


export const updateCategories = async (req,res) => {
    const { id } = req.params
    const { name, code } = req.body
    try {
        const [result] = await pool.query('UPDATE category SET name = IFNULL(?, name), code = IFNULL(?,code) WHERE id = ?', [name, code, id] )
        if( result.affectedRows == 0) return res.status(404).json({
            message: 'Category not found'
        })
        const [rows] = await pool.query('SELECT * FROM category WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

