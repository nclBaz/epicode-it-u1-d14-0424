// ********************************* EPIC CALENDAR **************************************

// --------------------- PARTE I, LA PARTE "STATICA" ------------------------------
// I seguenti task dovranno essere eseguiti all'avvio dell'applicazione per poter creare tutta la struttura del calendario

// 1. Dobbiamo prima di tutto capire quanti giorni ha il mese corrente (tenendo conto di anni bisestili ecc ecc) ✅

// 2. Una volta che abbiamo capito quanti giorni ha il mese corrente, possiamo usare questa informazione per andare a creare quel numero di celle nel calendario ✅

// 3. Il nome del mese corrente dovrebbe essere visualizzato nel titolo della pagina e il giorno corrente dovrebbe essere colorato diversamente dagli altri ✅

// --------------------- PARTE II, LA PARTE "DINAMICA" ------------------------------
// Nella seconda parte andremo invece a definire quelli che saranno i comportamenti dell'applicazione. Pertanto dovremo andare a creare del codice che risponda a determinati eventi tipo click su una cella del calendario o creazione di un nuovo appuntamento

// 4. Quando clicchiamo su una cella, essa dovrà essere in qualche maniera evidenziata; in più la sezione 'meeting day' dovrà riportare il numero del giorno selezionato

// 5. Alla pressione del tasto 'save meeting' dobbiamo leggere orario e nome dell'appuntamento e salvarli nell'elenco degli appuntamenti del giorno selezionato

// 6. Quando clicco su un giorno specifico dovrò poter vedere tutti gli appuntamenti per quella giornata

const daysInThisMonth = () => {
  const now = new Date() // Thu May 16 2024 09:36:34 GMT+0200 (Ora legale dell’Europa centrale)
  const getYear = now.getFullYear() // 2024
  const getMonth = now.getMonth() // 4 (perchè i mesi partono da zero, essendo noi in maggio allora il mese sarà il numero 4)

  // Per ottenere l'ultimo giorno del mese corrente andiamo al mese successivo per poi chiedere il giorno 0 che è l'ultimo del mese precedente

  const lastDayOfThisMonth = new Date(getYear, getMonth + 1, 0)
  console.log(lastDayOfThisMonth.getDate())
  return lastDayOfThisMonth.getDate()
}

const createDays = days => {
  // 1. Cerchiamo un riferimento al div 'calendar'
  const calendar = document.getElementById("calendar")

  // 2. Devo creare un certo numero di celle, 'certo numero' è un valore che viene passato come parametro
  for (let i = 0; i < days; i++) {
    // 2.1 Ad ogni iterazione dovrò creare un div, la cella
    const dayCell = document.createElement("div") // <div></div>

    // 2.2 Dobbiamo aggiungere una classe 'day' al div
    dayCell.classList.add("day")

    // 2.3 All'interno del div dovrà esserci un h3 con il numero del giorno corrente
    const dayCellContent = document.createElement("h3") // <h3></h3>
    dayCellContent.innerText = i + 1 // <h3>15</h3>

    // 2.3 bis Devo controllare se la cella che stiamo creando è quella del giorno corrente, se lo è allora aggiungo la classe 'color-epic' a tale giorno
    const now = new Date()
    const today = now.getDate()
    if (today === i + 1) dayCellContent.classList.add("color-epic")

    // 2.4 Devo appendere l'h3 appena creato alla cella
    dayCell.appendChild(dayCellContent) // <div><h3>15</h3></div>

    // 2.5 Aggiungo la cella così creata al calendario
    calendar.appendChild(dayCell)
    /* <div id="calendar">
          <div>
            <h3>15</h3>
          </div>
       </div>
    */
  }
}

const printCurrentMonthInH1 = () => {
  // 1. Selezioniamo l'h1
  const title = document.querySelector("h1")
  // 2. Scopro il mese corrente
  const now = new Date()
  const currentMonthIndex = now.getMonth() // 4
  // 3. Vado a selezionare da un elenco di nomi di mesi il mese giusto
  const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]
  const currentMonth = months[currentMonthIndex] // "Maggio"

  // 4. Vado a posizionare quel nome nell'h1
  title.innerText = currentMonth
}

// CreateDays dovrebbe venir invocata al caricamento completato della pagina
window.addEventListener("DOMContentLoaded", () => {
  // Tutto ciò che metto qua dentro verrà eseguito solo ed esclusivamente una volta che il DOM iniziale verrà caricato completamente
  const days = daysInThisMonth()
  createDays(days)
  printCurrentMonthInH1()
})
