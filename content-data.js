/*
  THE CATALOGUE: every book / document on the website is listed here.
  To add a PDF, copy the file into the matching folder (see ADD-NEW-PDF-GUIDE.md),
  then add one block { ... } to the correct list below. Separate blocks with a comma.
  Use forward slashes and NO leading slash:  "pdfs/books/my-file.pdf"  (correct)   "/pdfs/books/my-file.pdf"  (wrong)
*/
window.NIRMOH_CONTENT = {

  books: [
    {
      id: "hindi",                                   // short unique word, letters/numbers only
      title: "Nirmoh Vatika — Hindi Edition",
      edition: "Hindi Edition",
      language: "Hindi",
      category: "Nirmoh Vatika",
      pages: 36,
      size: "9.3 MB",
      description: "The Hindi edition of Nirmoh Vatika. Contents include Jain Dharma, Panch Parmeshthi, the 24 Tirthankaras, Jeev–Ajeev, Jain festivals, religious slogans and poems.",
      cover: "assets/img/covers/hindi.jpg",
      pdf: "pdfs/books/nirmoh-vatika-hindi.pdf",
      download: true                                 // true = show the Download button, false = reading only
    },
    {
      id: "english",
      title: "Nirmoh Vatika — English Edition",
      edition: "English Edition",
      language: "English",
      category: "Nirmoh Vatika",
      pages: 40,
      size: "81 MB",
      description: "The English edition of Nirmoh Vatika. Contents include Jain Dharma, Panch Parmeshthi, the 24 Tirthankaras, Jeev–Ajeev, Jain festivals, religious slogans and poems.",
      cover: "assets/img/covers/english.jpg",
      pdf: "pdfs/books/nirmoh-vatika-english.pdf",
      download: true
    }
  ],

  // Question papers / question banks. Empty for now: the page shows "No documents available yet."
  // Example block (remove the // marks to use it):
  // { id: "paper1", title: "Question Paper 1", description: "Short description", pdf: "pdfs/questions/paper-1.pdf", download: true },
  questions: [],

  // Pratiyogita (competition) documents. Empty for now.
  // { id: "comp1", title: "Competition name", description: "Short description", date: "Date text", pdf: "pdfs/pratiyogita/comp-1.pdf", download: true },
  pratiyogita: []
};
