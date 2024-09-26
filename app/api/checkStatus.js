import db from '../../lib/db'; // Adjust the path to your database connection

export default async function handler(req, res) {
    try {
        // Fetch data from the database (customize the query as needed)
        const data = await db.query('SELECT * FROM your_table'); // Adjust your query here
        // Process data and return status
        const results = data.map(item => ({
            id: item.id,
            status: item.someCondition ? 'tick' : 'cross', // Define your condition here
        }));
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
