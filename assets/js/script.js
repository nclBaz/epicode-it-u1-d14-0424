// ********************************* EPIC CALENDAR **************************************

// --------------------- PARTE I, LA PARTE "STATICA" ------------------------------
// I seguenti task dovranno essere eseguiti all'avvio dell'applicazione per poter creare tutta la struttura del calendario

// 1. Dobbiamo prima di tutto capire quanti giorni ha il mese corrente (tenendo conto di anni bisestili ecc ecc) ✅

// 2. Una volta che abbiamo capito quanti giorni ha il mese corrente, possiamo usare questa informazione per andare a creare quel numero di celle nel calendario

// 3. Il nome del mese corrente dovrebbe essere visualizzato nel titolo della pagina e il giorno corrente dovrebbe essere colorato diversamente dagli altri

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

daysInThisMonth()
