const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// --- ROTAS: CLIENTES ---
app.get('/api/clients', (req, res) => {
    db.all("SELECT * FROM clients", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/clients', (req, res) => {
    const { name, type, doc, phone, email } = req.body;
    db.run(
        "INSERT INTO clients (name, type, doc, phone, email) VALUES (?, ?, ?, ?, ?)",
        [name, type, doc, phone, email],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, name, type, doc, phone, email, status: 'Ativo' });
        }
    );
});

// --- ROTAS: PROCESSOS ---
app.get('/api/cases', (req, res) => {
    const query = `
        SELECT cases.*, clients.name as client_name 
        FROM cases 
        LEFT JOIN clients ON cases.client_id = clients.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/cases', (req, res) => {
    const { number, client_id, area, phase } = req.body;
    db.run(
        "INSERT INTO cases (number, client_id, area, phase) VALUES (?, ?, ?, ?)",
        [number, client_id, area, phase],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, number, client_id, area, phase, status: 'Em andamento' });
        }
    );
});

// --- ROTAS: FINANCEIRO ---
app.get('/api/transactions', (req, res) => {
    db.all("SELECT * FROM transactions", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/transactions', (req, res) => {
    const { date, description, category, type, value, status } = req.body;
    db.run(
        "INSERT INTO transactions (date, description, category, type, value, status) VALUES (?, ?, ?, ?, ?, ?)",
        [date, description, category, type, value, status || 'Pendente'],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, date, description, category, type, value, status: status || 'Pendente' });
        }
    );
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 LexManager Backend rodando em http://localhost:${PORT}`);
});
