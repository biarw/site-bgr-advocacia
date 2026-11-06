const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'lexmanager.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite (LexManager).');
    }
});

// Inicialização das tabelas
db.serialize(() => {
    // Tabela de Clientes
    db.run(`CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        doc TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        status TEXT DEFAULT 'Ativo'
    )`);

    // Tabela de Processos
    db.run(`CREATE TABLE IF NOT EXISTS cases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number TEXT NOT NULL,
        client_id INTEGER,
        area TEXT,
        phase TEXT,
        status TEXT DEFAULT 'Em andamento',
        FOREIGN KEY(client_id) REFERENCES clients(id)
    )`);

    // Tabela Financeira
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT,
        type TEXT,
        value REAL,
        status TEXT DEFAULT 'Pendente'
    )`);
});

module.exports = db;
