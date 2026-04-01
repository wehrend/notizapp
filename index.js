document.addEventListener("DOMContentLoaded", renderNotes);

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

function renderNotes() {
  console.log("calling renderNotes();");

  sortedNotes.forEach((note) => {
    renderNoteEntry(note);
  });
}

function renderNoteEntry(note) {
  var noteEntryDiv = document.createElement("div");
  noteEntryDiv.classList.add("note-entry");

  var noteTitleDiv = document.createElement("div");
  noteTitleDiv.textContent = note.title;
  noteTitleDiv.classList.add("note-title");
  noteEntryDiv.appendChild(noteTitleDiv);

  var noteContentDiv = document.createElement("div");
  noteContentDiv.textContent = note.content;
  noteContentDiv.classList.add("note-content");
  noteEntryDiv.appendChild(noteContentDiv);

  var noteTimestampDiv = document.createElement("div");
  noteTimestampDiv.textContent = new Date(note.lastUpdated).toLocaleString(
    "de-DE",
  );
  noteTimestampDiv.classList.add("note-date");
  noteEntryDiv.appendChild(noteTimestampDiv);

  console.log(noteEntryDiv);
  if (noteEntryDiv) {
    document.getElementById("notes-list").appendChild(noteEntryDiv);
  }
}
