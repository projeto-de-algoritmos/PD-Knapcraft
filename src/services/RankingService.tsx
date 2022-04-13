import dotenv from 'dotenv';
const { Client } = require('pg');

dotenv.config();
const client = new Client({ssl: { rejectUnauthorized: false }});

export async function selectAllRanking() {
    const query = 'SELECT * FROM public.ranking';
    
    client.connect();
    const result = await client.query(query);
    client.end();

    return result.rows;
}
