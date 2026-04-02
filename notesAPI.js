const LOCALE_STORAGE_KEY = "notizapp-notizen";

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY)) || [];
}

function saveNote(title, content) {
  const notes = getNotes();

  notes.push({
    title,
    content,
    id: getNextId(),
    lastUpdated: new Date().getTime(),
  });
  localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(notes));
}

function getNextId() {
  const notes = getNotes();

  const sortedNotes = notes.sort((noteA, noteB) => noteA.Id - noteB.Id);

  let nextId = 1;

  for (let note of sortedNotes) {
    if (nextId < note.Id) break;
    nextId = note.Id + 1;
  }
  return nextId;
}
