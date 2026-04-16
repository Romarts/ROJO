const API_URL = "http://localhost:3000";
let editandoId = null; 

async function carregarProdutosAdmin() {
    const token = localStorage.getItem("rojo_token");
    const tabela = document.getElementById("tabelaProdutos");
    if (!tabela || !token) return;

    try {
        const res = await fetch(`${API_URL}/produtos`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const produtos = await res.json();
        tabela.innerHTML = "";

        produtos.forEach(p => {
            tabela.innerHTML += `
                <tr>
                    <td><strong>${p.nome}</strong></td>
                    <td>R$ ${Number(p.preco).toFixed(2)}</td>
                    <td>${p.descricao || 'Sem descrição'}</td>
                    <td>
                        <button onclick="prepararEdicao(${p.id}, '${p.nome}', ${p.preco}, '${p.descricao || ''}')" style="background: #007bff; color: white; border: none; padding: 6px 12px; cursor: pointer; border-radius: 4px; margin-right: 5px;">Alterar</button>
                        <button onclick="deletarProduto(${p.id})" style="background: #dc3545; color: white; border: none; padding: 6px 12px; cursor: pointer; border-radius: 4px;">Excluir</button>
                    </td>
                </tr>`;
        });
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

function prepararEdicao(id, nome, preco, descricao) {
    document.getElementById("prodNome").value = nome;
    document.getElementById("prodPreco").value = preco;
    document.getElementById("prodDesc").value = descricao;
    
    editandoId = id; 
    const btn = document.querySelector(".btn-add");
    if (btn) {
        btn.textContent = "Salvar Alterações";
        btn.style.background = "#ffc107";
        btn.style.color = "black";
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function salvarProduto() {
    const token = localStorage.getItem("rojo_token");
    const nome = document.getElementById("prodNome").value;
    const preco = document.getElementById("prodPreco").value;
    const descricao = document.getElementById("prodDesc").value;

    if (!nome || !preco) return alert("Preencha nome e preço!");

    const dados = { nome, preco: parseFloat(preco), descricao, categoryId: 1 };

    // Bate exatamente com as rotas do seu index.ts
    const url = editandoId ? `${API_URL}/produtos/${editandoId}` : `${API_URL}/produtos`;
    const metodo = editandoId ? "PUT" : "POST";

    try {
        const res = await fetch(url, {
            method: metodo,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(dados)
        });

        if (res.ok) {
            alert(editandoId ? "Produto atualizado!" : "Produto cadastrado!");
            resetarFormulario();
            carregarProdutosAdmin();
        } else {
            const erro = await res.json();
            alert("Erro: " + (erro.message || "Falha ao salvar"));
        }
    } catch (error) {
        alert("Erro de conexão com o servidor.");
    }
}

function resetarFormulario() {
    document.getElementById("prodNome").value = "";
    document.getElementById("prodPreco").value = "";
    document.getElementById("prodDesc").value = "";
    editandoId = null;
    const btn = document.querySelector(".btn-add");
    if (btn) {
        btn.textContent = "Cadastrar Novo Perfume";
        btn.style.background = "#28a745";
        btn.style.color = "white";
    }
}

async function deletarProduto(id) {
    if (!confirm("Excluir item?")) return;
    const token = localStorage.getItem("rojo_token");
    const res = await fetch(`${API_URL}/produtos/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) carregarProdutosAdmin();
}

document.addEventListener("DOMContentLoaded", carregarProdutosAdmin);