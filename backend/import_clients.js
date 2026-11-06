const fs = require('fs');
const path = require('path');
const db = require('./database');

const DRIVE_PATH = 'G:\\Meu Drive';
const TARGET_DIRS = ['CLIENTES - OABSP', 'CLIENTES - EXECUÇÕES DE PENA'];

// Função para limpar o nome do cliente
function extractClientName(folderName) {
    // Pega apenas a primeira parte antes de " - "
    let name = folderName.split('-')[0].trim();
    // Remove qualquer texto entre parênteses caso não tenha traço
    name = name.replace(/\(.*?\)/g, '').trim();
    return name;
}

const clientsToInsert = new Set(); // Usando Set para evitar nomes duplicados

TARGET_DIRS.forEach(target => {
    const targetPath = path.join(DRIVE_PATH, target);
    if (!fs.existsSync(targetPath)) return;

    // Lendo categorias (ex: BEATRIZ - SERVIÇOS PARTICULARES)
    const categories = fs.readdirSync(targetPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    categories.forEach(category => {
        const categoryPath = path.join(targetPath, category);
        
        // Lendo as pastas dos clientes (depth 2)
        const clientFolders = fs.readdirSync(categoryPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        clientFolders.forEach(folder => {
            const rawName = extractClientName(folder);
            if (rawName && rawName.length > 2) { // Evita pastas vazias ou siglas muito curtas
                clientsToInsert.add(rawName.toUpperCase());
            }
        });
    });
});

console.log(`Foram encontrados ${clientsToInsert.size} clientes únicos nas pastas.`);

// Inserindo no banco de dados SQLite
db.serialize(() => {
    const stmt = db.prepare("INSERT INTO clients (name, type, doc, phone, email, status) VALUES (?, 'PF', 'Não Informado', '', '', 'Ativo')");
    
    let insertedCount = 0;
    
    // Primeiro limpamos a tabela para não duplicar clientes que foram criados hardcoded
    db.run("DELETE FROM clients", (err) => {
        if(err) console.error(err);
        console.log("Tabela limpa para importação fresca.");
        
        Array.from(clientsToInsert).forEach(clientName => {
            stmt.run(clientName, (err) => {
                if (err) {
                    console.error(`Erro ao inserir ${clientName}:`, err.message);
                } else {
                    insertedCount++;
                }
            });
        });

        stmt.finalize(() => {
            console.log(`✅ Importação concluída! Total inserido: ${insertedCount}`);
            
            // Lendo do banco pra confirmar
            db.all("SELECT id, name FROM clients LIMIT 5", [], (err, rows) => {
                console.log("Amostra do banco de dados:");
                console.log(rows);
            });
        });
    });
});
