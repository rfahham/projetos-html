const ul = document.querySelector('ul')

const valoresListagem = ['Hello World', 'Segundo Item']

for (const valorAtual of valoresListagem) {
    const li = document.createElement('li')
    li.textContent = valorAtual
    ul.appendChild(li)
}