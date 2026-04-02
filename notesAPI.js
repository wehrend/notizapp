const LOCALE_STORAGE_KEY = "notizapp-notizen";

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY)) || [];
}

function saveNote(title, content, id = undefined) {
  const notes = getNotes();
  alert(id);

  if (!id) {
    notes.push({
      title,
      content,
      id: getNextId(),
      lastUpdated: new Date().getTime(),
    });
  } else {
    const indexOfNoteWithId = notes.findIndex((note) => note.id === id);

    if (indexOfNoteWithId > -1) {
      notes[indexOfNoteWithId] = {
        title,
        content,
        id,
        lastUpdated: new Date().getTime(),
      };
    }
  }
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
