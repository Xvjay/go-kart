import mysql from "mysql2/promise"

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Likliklik@1',
    database: 'go_kart'
})

export default pool