const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const db = require('./database');

const DRIVE_PATH = 'G:\\Meu Drive';
const TARGET_DIRS = ['CLIENTES - OABSP', 'CLIENTES - EXECUÇÕES DE PENA'];

// Regex para encontrar CPF (suporta pontuação ou sem pontuação)
const cpfRegex = /\b(\d{3})[\.\s]?(\d{3})[\.\s]?(\d{3})[-\.\s]?(\d{2})\b/g;

function formatCpf(match) {
    const numbers = match.replace(/\D/g, '');
    if (numbers.length === 11) {
        return `${numbers.slice(0,3)}.${numbers.slice(3,6)}.${numbers.slice(6,9)}-${numbers.slice(9,11)}`;
    }
    return null;
}

function extractClientName(folderName) {
    let name = folderName.split('-')[0].trim();
    name = name.replace(/\(.*?\)/g, '').trim();
    return name.toUpperCase();
}

async function processPdf(pdfPath) {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const data = await pdf(dataBuffer);
        const text = data.text;
        
        let match;
        while ((match = cpfRegex.exec(text)) !== null) {
            const formatted = formatCpf(match[0]);
            if (formatted) return formatted;
        }
    } catch (err) {
        // Ignora erros de leitura de PDF silenciosamente para não poluir o terminal
    }
    return null;
}

async function runExtraction() {
    let cpfsFound = 0;
    const updatePromises = [];

    // Pega todos os clientes que ainda não tem documento
    const clientsSemDoc = await new Promise((resolve) => {
        db.all("SELECT name FROM clients WHERE doc = 'Não Informado' OR doc IS NULL", [], (err, rows) => {
            if (err) resolve([]);
            resolve(rows.map(r => r.name));
        });
    });

    console.log(`Buscando em Petições Iniciais para ${clientsSemDoc.length} clientes sem CPF...`);

    for (const target of TARGET_DIRS) {
        const targetPath = path.join(DRIVE_PATH, target);
        if (!fs.existsSync(targetPath)) continue;

        const categories = fs.readdirSync(targetPath, { withFileTypes: true })
            .filter(d => d.isDirectory())
            .map(d => d.name);

        for (const category of categories) {
            const categoryPath = path.join(targetPath, category);
            
            const clientFolders = fs.readdirSync(categoryPath, { withFileTypes: true })
                .filter(d => d.isDirectory())
                .map(d => d.name);

            for (const folder of clientFolders) {
                const clientName = extractClientName(folder);
                
                // Só processa se o cliente estiver na lista dos que precisam de CPF
                if (!clientsSemDoc.includes(clientName)) continue;

                const folderPath = path.join(categoryPath, folder);
                
                // Procura arquivos PDF no diretório do cliente
                const files = fs.readdirSync(folderPath, { withFileTypes: true })
                    .filter(f => f.isFile() && f.name.toLowerCase().endsWith('.pdf'))
                    .map(f => f.name);

                for (const file of files) {
                    const lfile = file.toLowerCase();
                    // Agora foca em petições iniciais, procurações, hipossuficiência
                    if (lfile.includes('pet') || lfile.includes('inicial') || lfile.includes('proc') || lfile.includes('hip')) {
                        const pdfPath = path.join(folderPath, file);
                        
                        const cpf = await processPdf(pdfPath);
                        if (cpf) {
                            console.log(`✅ CPF Encontrado via Petição: ${cpf} -> ${clientName}`);
                            cpfsFound++;
                            
                            const p = new Promise((resolve) => {
                                db.run("UPDATE clients SET doc = ? WHERE name = ?", [cpf, clientName], function(err) {
                                    resolve();
                                });
                            });
                            updatePromises.push(p);
                            break; // Vai pro próximo cliente
                        }
                    }
                }
            }
        }
    }

    await Promise.all(updatePromises);
    console.log(`\n🎉 Processo de Petições finalizado! Foram extraídos e salvos mais ${cpfsFound} CPFs.`);
}

runExtraction();
