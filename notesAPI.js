const notes = [
  {
    id: 1,
    title: "Notiz 1",
    content: "Dies ist eine Beispiel-Notiz",
    lastUpdated: 7558626633,
  },
  {
    id: 2,
    title: "Notiz 2",
    content: "Dies ist eine Beispiel-Notiz",
    lastUpdated: 1157558626633,
  },
  {
    id: 3,
    title: "notiz 3",
    content: "Dies ist eine Beispiel-Notiz",
    lastUpdated: 857558626633,
  },
  {
    id: 4,
    title: "notiz 4",
    content: "Dies ist eine Beispiel-Notiz",
    lastUpdated: 457558626633,
  },
];

const sortedNotes = notes.sort(
  (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated,
);
