// Definiamo l'URL dell'API da cui recuperare le immagini
const endpoint = "https://lanciweb.github.io/demo/api/pictures/";

// Selezioniamo gli elementi della pagina per manipolarli
const container = document.querySelector('.container');
const overlay = document.querySelector('.overlay');
const overlayImage = document.querySelector('#overlay-image');
const closeButton = document.querySelector('#close-button');



// Utilizziamo Axios per fare una chiamata GET all'API
axios.get(endpoint)
    .then(response => {
        // La risposta dell'API è contenuta in response.data
        const data = response.data;

        // Iniziamo un ciclo for per generare 6 card
        for (let i = 0; i < 6; i++) {
            // Prendiamo il singolo elemento dai dati
            const item = data[i];

            // Creiamo una stringa HTML con il codice della card
            // Utilizziamo innerHTML per aggiungere la card all'interno del contenitore
            container.innerHTML += `
                <div class="card">
                    <!-- div che contiene il pin -->
                    <div class="pin">
                        <img src="./img/pin.svg" alt="pin"> 
                    </div>
                    
                    <!-- div per l'immagine -->
                    <div class="image">
                        <img src="${item.url}" alt="${item.title}">
                    </div>
                    
                    <!-- paragrafo per la data -->
                    <p class="date">${item.date}</p>
                    
                    <!-- titolo della card -->
                    <h3>${item.title}</h3>
                </div>
            `;
        }

        // Seleziona tutte le card
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const img = card.querySelector('.image img');
                if (img) {
                    overlay.classList.add('show-overlay');
                    overlayImage.src = img.src;
                }
            });
        });

    })
    .catch(error => {
        // Se c'è un errore nella richiesta dell'API lo stampiamo in console
        console.error("Errore nel recuperare le immagini:", error);
    });

// Funzione per chiudere l'overlay
closeButton.addEventListener('click', () => {
    overlay.classList.remove('show-overlay');
});