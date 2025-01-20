let form_control = document.querySelector('#form_control');
let nome = document.querySelector('#nome');
let sobrenome = document.querySelector('#sobrenome');
let email = document.querySelector('#email');
let senha = document.querySelector('#senha');
let confirmasenha = document.querySelector('#confirmasenha');

form_control.addEventListener('submit', async function (event) {
    event.preventDefault();

    console.log(nome.value, sobrenome.value, email.value, senha.value, confirmasenha.value);

    if (senha.value !== confirmasenha.value) {
        senha.classList.add('erro-field');
        confirmasenha.classList.add('erro-field');
        setTimeout(() => {
            senha.classList.remove('erro-field');
            confirmasenha.classList.remove('erro-field');
        }, 3000);
        return;
    }

    try {
        const data = {
            nome: nome.value,
            sobrenome: sobrenome.value,
            email: email.value,
            senha: senha.value
        };
        const response = await fetch('http://localhost:8090/pessoa/salvar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            setTimeout(()=> {
                window.location.href = "login.html";
            }, 1000);
            clean();
        } else {
            const error = await response.json();
            alert(`Erro: ${error.message}`);
        }
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Ocorreu um erro no cadastro. Tente novamente.');
    }
});

function clean() {
    nome.value = '';
    sobrenome.value = '';
    email.value = '';
    senha.value = '';
    confirmasenha.value = '';
}
