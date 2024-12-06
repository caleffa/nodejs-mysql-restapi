import { pool } from '../db.js'
import router from '../routes/index.routes.js'

export const getEmployees = async (req,res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getEmployee = async (req,res) => {
    const id = req.params.id
    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
        if( rows.length <= 0) return res.status(404).json({
            message: 'Employee not found'
        })
        res.json(rows[0])   
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createEmployees = async (req,res) => {
    const {name, lastname, salary} = req.body
    try {
        const [rows] = await pool.query('INSERT INTO employee (NAME,lastname,salary) VALUES (?, ?, ?)', [name, lastname, salary])
        res.send({
             id: rows.insertId,
             name,
             lastname,
             salary
         })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deleteEmployees = async (req,res) => {
    const id = req.params.id
    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [id])
        if( result.affectedRows <= 0) return res.status(404).json({
            message: 'Employee not found'
        })
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


export const updateEmployees = async (req,res) => {
    const { id } = req.params
    const { name, lastname, salary } = req.body
    try {
        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), lastname = IFNULL(?,lastname), salary = IFNULL(?,salary) WHERE id = ?', [name, lastname, salary, id] )
        if( result.affectedRows == 0) return res.status(404).json({
            message: 'Employee not found'
        })
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

