const EPITICKET_URL = 'https://striveschool-api.herokuapp.com/api/agenda'

// in questa pagina voglio mostrare i dettagli di UN concerto
// arriverò a questa pagina cliccando il tasto "VAI AI DETTAGLI" di ogni card in homepage

// i dettagli della card verranno recuperati con una fetch()
// a differenza però della fetch() in homepage, che recuperava TUTTI i concerti
// qui voglio fare una fetch per UN SOLO concerto, ben specifica!

// mi sto passando l'_id del concerto che voglio caricare nella barra degli indirizzi
// ora recupererò quell'_id dalla barra degli indirizzi e lo salverò in una variabile

const addressBarContent = new URLSearchParams(window.location.search)
// ho creato una specie di oggetto con dentro tutti i parametri della barra degli indirizzi

const concertId = addressBarContent.get('concertId') // concertId è il nome del parametro che avevo scelto
console.log('concertId', concertId)

// grazie a questo concertId posso fare una fetch con metodo GET molto specifica!
// che mi ritornerà non più TUTTI gli eventi... ma un SINGOLO EVENTO con tutti i dettagli!

// 'https://striveschool-api.herokuapp.com/api/agenda/6735d3a68ad1290015876b88'
fetch(EPITICKET_URL + '/' + concertId)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Errore nel recupero dei dettagli dell'evento")
    }
  })
  .then((singleConcert) => {
    // singleConcert è un oggetto, in particolare UNO DEGLI OGGETTI CONCERT A DB
    // quello con l'_id specificato!
    console.log('singleConcert', singleConcert)
  })
  .catch((error) => {
    console.log('ERROR', error)
  })
