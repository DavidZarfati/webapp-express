import connection from "../database/db.js";

function index(req, res) {
    const tag = req.query.tag;
    let sql = "SELECT * FROM movies";
    let params = []
    connection.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Errore nel recupero dei film", details: err });
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
    // Recupera il film e i tag associati tramite JOIN
    const sql = `
            SELECT movies.id, movies.title, movies.abstract,
                   reviews.id AS review_id, reviews.name, reviews.vote, reviews.text
            FROM movies
            LEFT JOIN reviews ON movies.id = reviews.movie_id
            WHERE movies.id = ?
        `;
    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ errore: "Errore nel recupero del film", details: err });
        }
        if (results.length === 0) {
            return res.status(404).json({
                errore: "PostNonTrovato",
                numero_errore: 404,
                descrizione: "Nessun film trovato con l'id fornito."
            });
        }
        // Ricostruisce il film con le review
        const film = {
            id: results[0].id,
            title: results[0].title,
            content: results[0].content,
            path: results[0].path,
            reviews: results.length > 0 ? results.map(r => ({ id: r.review_id, reviewer: r.name, rating: r.vote, comment: r.text })) : []
        };
        res.json(film);
    });
}



export { index, show };