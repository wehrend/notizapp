document.addEventListener("DOMContentLoaded", renderNotes);

const titleEl = document.getElementById("title-input");
const contentEl = document.getElementById("content-input");

const newNoteButtonEl = document.querySelector(".create-new");
const deleteNoteButtonEl = document.querySelector(".delete-note");

newNoteButtonEl.addEventListener("click", newNote);
deleteNoteButtonEl.addEventListener("click", deleteNoteButton);

const notes = getNotes();

var sortedNotes = notes.sort(
  (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated,
);

function renderNotes() {
  console.log("calling renderNotes();");

  sortedNotes.forEach((note) => {
    renderNoteEntry(note);
  });
  applyListeners();
}

function applyListeners() {
  const noteEntriesEls = document.querySelectorAll(".note-entry");

  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.addEventListener("click", () =>
      selectNote(noteEntry.getAttribute("data-id")),
    );
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

  saveNote(titleEl.value, contentEl.value, Number(getCurrentlySelectedId()));
  // 3. Optional: Clear the inputs after saving
  titleEl.value = "";
  contentEl.value = "";
  applyListeners();
}

function selectNote(id) {
  console.log("selectNote(" + id + ")");
  const selectedNoteEl = document.querySelector(`.note-entry[data-id="${id}"]`);

  if (selectedNoteEl.classList.contains("selected-note")) return;
  removeSelectedClassFromAllNotes();

  selectedNoteEl.classList.add("selected-note");

  const notes = getNotes();

  const selectedNote = notes.find((note) => note.id === Number(id));

  if (!selectedNote) return;

  titleEl.value = selectedNote.title;
  contentEl.value = selectedNote.content;
}

function newNote() {
  console.log("newNote()");
  titleEl.value = "";
  contentEl.value = "";

  removeSelectedClassFromAllNotes();
}

function deleteNoteButton() {
  const currentlySelectedId = getCurrentlySelectedId();

  if (!currentlySelectedId) return;

  // todo delete note

  titleEl.value = "";
  contentEl.value = "";

  renderNotes();
  applyListeners();
}

function getCurrentlySelectedId() {
  let currentId = undefined;

  const currentlySelectedNoteEl = document.querySelector(".selected-note");
  if (currentlySelectedNoteEl) {
    currentId = currentlySelectedNoteEl.getAttribute("data-id");
  }
}

function removeSelectedClassFromAllNotes() {
  const noteEntriesEls = document.querySelectorAll(".note-entry");
  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.classList.remove("selected-note");
  });
}
