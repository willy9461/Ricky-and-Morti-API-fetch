import { getCharacters } from "./services/getData.js";

const container = document.querySelector('#characters');
const loader = document.getElementById('lds-ring');

const characterList = async (page = 1) => {
    loader.style.display = 'grid';

    const { results } = await getCharacters(page);
    
    loader.style.display = 'none';

    results.forEach(character => {
        const article = document.createElement('article');
        article.setAttribute ('class', 'character' );
        article.innerHTML =`
        <img src="${character.image}" alt=""></img>
        <h2>${character.name}</h2>
        <div>
            <p>${character.species}</p>
            <p class="${character.status.toLowerCase()}"></p>
        </div>
        <a href="/#/${character.id}">Ver detalle</a>
        `

        container.appendChild(article);
    });

}
characterList();

window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1).toLocaleLowerCase().split('/')[1] || '/';
    localStorage.setItem('charID', id);
    window.location.replace('/character.html');
});