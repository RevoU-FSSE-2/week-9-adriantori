import mysql from 'mysql2';

interface QueryResponse {
    error?: string;
    statusCode: number;
    result?: any[]; // Change the type to any[]
    resultId?: number;
    affectedRows?: number;
}

export default function mySqlQuery(query: string): Promise<QueryResponse> {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASS,
            database: process.env.SQL_DB,
            port: +process.env.SQL_PORT!
        });

        con.connect((err) => {
            if (err) {
                reject({ error: err.message, statusCode: 400 }); // Use err.message to get the error message
            } else {
                console.log("Connected to Database!");
                con.query(query, (err, result: any, fields) => {
                con.end(); // Close the connection after querying

                    if (err) {
                        reject({ error: err.message, statusCode: 404 });
                    } else {
                        resolve({ result, statusCode: 200, resultId: result.insertId, affectedRows: result.affectedRows });
                    }
                });
            }
        });

        con.on('error', (err) => {
            reject({ error: err, statusCode: 503 }); // Use err.message to get the error message
        });
    });
}
