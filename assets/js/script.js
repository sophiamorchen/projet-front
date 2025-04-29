/*
PROGRAMME :
- cliquer usr une case de mon calendrier
- cette case doit avoir un numéro inférieur à la date du jour
- si => non : 
- il ne se passe rien
- si => oui :
- jouer la musique
- afficher l'image cachée 
- affiche une popup avec une citation
- quand on ferme la popup, la musique s'arrête
- sauvegarder un historique des cases cliquées dans le navigateur
- quand j'arrive sur ma page, je veux ouvrir mes box.
=> C'est la premiere fonction que je vais devoir annoncer
*/
import quotes from "./quotes.js"

const previsouslyOpenedBoxes = () => {
    // 1. récuperer les nombres des box deja ouvertes
    const openedBoxes = localStorage.getItem("openedBoxes") 
    if (openedBoxes !== null) {
        // 2. ouvrir les portes
        const listeOfOpenedBoxes = openedBoxes.split(",")
        for (let i = 0 ; i< listeOfOpenedBoxes.length; i++){
            const boxNumber = listeOfOpenedBoxes[i]
            const box = document.querySelector(`[data-number="${boxNumber}"]`) // double guillemets car je cherche une chaine de carcatère
            showImage(box)
        }
    }
}



const today = new Date(Date.now())
const boxes = document.querySelectorAll('.js-box')
const dateNumber = today.getDate() 


boxes.forEach(box => {
    const boxNumber = parseInt(box.textContent)
    box.addEventListener('click', () => {
        if (boxNumber <= dateNumber){
            playSong()
            showImage(box)
            openModal(boxNumber)
            saveHistory(boxNumber)
        }        
    })
});

const url = "assets//audios/opening-song.mp3"
const song = new Audio(url)
const playSong = () => {
    song.pause()
    // song.pause optionnel???
    song.currentTime = 0
    song.play()
}

const showImage = (boxToHide) =>{ // ce mot, c'est le mot qu'on invente pour "imager" l'élément qui va être maniuplé
    boxToHide.classList.add('hide')
}

const modal = document.querySelector('.js-modal')
const quote = modal.querySelector('.js-quote') // je veux "tel" élément qui est dans un autre élément html (dans modal)
const author = modal.querySelector('.js-author')

const openModal = (index) => {
    quote.textContent = quotes[index].quote
    author.textContent = quotes[index].author
    modal.showModal()
}

modal.addEventListener("close", () => {
    song.pause()
})

const saveHistory = (boxNumber) => {
    let openedBoxes = []
    let localValue = localStorage.getItem("openedBoxes")
    if(localValue !== null) {
        openedBoxes = localValue.split(',') // =>(à chaque virgule, tu me créeun tableau de valeurs, et chaques valeurs sont détectées car séparées par virgule) transforme ma chaine de caractères qui a des virgules en un tableau !!!
    }
    openedBoxes.push(boxNumber)
    localStorage.setItem("openedBoxes", openedBoxes)
}
previsouslyOpenedBoxes()