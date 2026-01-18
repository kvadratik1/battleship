import { createFolder, deleteFolder } from "./folder-module";
import { createNote, deleteNote } from "./note-module";
import { showFolders, showNotes } from "./ui-module";
import "./style.css";

const addFolderButton = document.querySelector("#addFolderBtn");
const addNoteButton = document.querySelector("#addNoteBtn");

const folders = [];

showFolders(folders);

addFolderButton.addEventListener("click", triggerCreateFolderWindow);

function triggerCreateFolderWindow() {
  const folderName = prompt("Choose your folder name");
  if (folderName === null) {
    return;
  }
  createFolder(folderName, folders.length + 1, folders);
  showFolders(folders);
}

addNoteButton.addEventListener("click", triggerCreateNoteWindow);

function triggerCreateNoteWindow() {
  const chosenFolder = localStorage.getItem("chosenFolder");
  if (!chosenFolder) {
    alert("Please choose the folder you want to create your note in!");
    return;
  }

  const noteTitle = prompt("Choose your note name");
  if (noteTitle === null) return;

  const noteDescription = prompt("Add description");
  if (noteDescription === null) return;

  const notePriority = prompt("Add Priority: 1 high, 2 medium, 3 low");
  if (notePriority === null || !["1", "2", "3"].includes(notePriority)) return;

  const folderToUpdate = folders.find(
    (folder) => folder.id === parseInt(chosenFolder)
  );

  const noteCount = folderToUpdate.notes?.length || 0;

  createNote(
    noteTitle,
    noteDescription,
    notePriority,
    noteCount,
    folderToUpdate
  );
  showNotes(folderToUpdate.notes);
}
