document.addEventListener("DOMContentLoaded", renderNotes);

const titleEl = document.getElementById("title-input");
const contentEl = document.getElementById("content-input");

const notes = getNotes();

var sortedNotes = notes.sort(
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
  noteEntryDiv.setAttribute("data-id", note.id);
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

function saveNoteButton() {
  console.log("saveNote() triggered");

  // 2. Check for empty strings (not null)
  if (titleEl.value.trim() === "" || contentEl.value.trim() === "") {
    alert("Bitte Titel und Inhalt eingeben!");
    return; // Stop the function here if empty
  }

  saveNote(titleEl.value, contentEl.value);
  // 3. Optional: Clear the inputs after saving
  titleEl.value = "";
  contentEl.value = "";
}
