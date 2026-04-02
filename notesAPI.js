const LOCALE_STORAGE_KEY = "notizapp-notizen";

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCALE_STORAGE_KEY)) || [];
}

function saveNote(title, content) {
  const notes = getNotes();

  notes.push({
    title,
    content,
    id: "hallo",
    lastUpdated: new Date().getTime(),
  });
  localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(notes));
}
