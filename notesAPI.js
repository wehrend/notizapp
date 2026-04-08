const LOCALE_STORAGE_KEY = "notizapp-notizen";

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY)) || [];
}

function saveNote(title, content, id = undefined) {
  const notes = getNotes();

  if (!id) {
    notes.push({
      title,
      content,
      id: getNextId(),
      lastUpdated: new Date().getTime(),
    });
  } else {
    const indexOfNoteWithID = notes.findIndex((note) => note.id === id);

    if (indexOfNoteWithID > -1) {
      notes[indexOfNoteWithID] = {
        title,
        content,
        id,
        lastUpdated: new Date().getTime(),
      };
    }
  }
  localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(notes));
}

function deleteNote(id) {
  if (!id) return;

  const notes = getNotes();

  filteredNotes = notes.filter((note) => note.id !== Number(id));

  localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(filteredNotes));
}

function getNextId() {
  const notes = getNotes();

  const sortedNotes = notes.sort((noteA, noteB) => noteA.Id - noteB.Id);

  let nextId = 1;

  for (let note of sortedNotes) {
    if (nextId < note.Id) break;
    nextId = note.id + 1;
  }
  return nextId;
}
