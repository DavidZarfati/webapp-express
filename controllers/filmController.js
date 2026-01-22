import connection from "../database/db.js";

function index(req, res) {
    const tag = req.query.tag;
    let sql = "SELECT * FROM movies";
    let params = []
    connection.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Errore nel recupero dei post", details: err });
        }
        res.json({
            count: results.length,
            results: results
        });
    });
}
function show(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0) {
        return res.status(404).json({
            errore: "IdNonValido",
            numero_errore: 404,
            descrizione: "L'id fornito non è valido."
        });
    }
    // Recupera il post e i tag associati tramite JOIN
    const sql = `
        SELECT *
        FROM movies
        JOIN reviews 
        WHERE movies.id = ?

        
    `;
    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ errore: "Errore nel recupero del post", details: err });
        }
        if (results.length === 0) {
            return res.status(404).json({
                errore: "PostNonTrovato",
                numero_errore: 404,
                descrizione: "Nessun post trovato con l'id fornito."
            });
        }
        // Ricostruisce il post con i tag
        const post = {
            id: results[0].id,
            title: results[0].title,
            content: results[0].content,
            path: results[0].path,
            tags: results[0].tag_id ? results.map(r => ({ id: r.tag_id, name: r.label })) : []
        };
        res.json(post);
    });
}



export { index, show };