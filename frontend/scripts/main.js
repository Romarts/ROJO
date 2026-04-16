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

function toggleMenu() {
  const menu = document.getElementById("menu");
  const btn = document.querySelector(".menu-btn");
  
  menu.classList.toggle("active");
  btn.classList.toggle("open");
}

// No seu main.js, verifique o caminho:
fetch('../components/footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
    // IMPORTANTE: Chame a função de verificar Admin SÓ DEPOIS que o footer carregar
    verificarAdminNoFooter(); 
  });