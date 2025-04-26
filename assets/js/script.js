/*
PROGRAMME :
- cliquer usr une case de mon calendrier
- cette case doit avoir un numéro inférieur à la date du jour
- si: non =>  il ne se passe rien
- si: oui => 
- jouer la musique
- afficher l'image cachée 
*/

const today = new Date(Date.now())
const boxes = document.querySelectorAll('.js-box')
const dateNumber = today.getDate() 


boxes.forEach(box => {
    const boxNumber = parseInt(box.textContent)
    box.addEventListener('click', () => {
        if (boxNumber <= dateNumber){
            playSong()
            showImage(box)
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
    console.log(song);
    console.log(url);
}

const showImage = (boxToHide) =>{ // ce mot, c'est le mot qu'on invente pour "imager" l'élément qui va être maniuplé
    boxToHide.classList.toggle('hide')
}
