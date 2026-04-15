async function carregarHeader() {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    // Tentamos dois caminhos comuns para evitar erros de pasta
    const caminhos = ['components/header.html', '../components/header.html', './components/header.html'];
    
    for (const caminho of caminhos) {
        try {
            const response = await fetch(caminho);
            if (response.ok) {
                const html = await response.text();
                placeholder.innerHTML = html;
                console.log(`Header carregado com sucesso via: ${caminho}`);
                return; // Para assim que encontrar
            }
        } catch (error) {
            continue; // Tenta o próximo caminho
        }
    }
    console.error('Não foi possível encontrar o arquivo header.html em nenhum dos caminhos.');
}

document.addEventListener('DOMContentLoaded', carregarHeader);