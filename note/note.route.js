const express = require("express");
const router = express.Router();
const note_controller = require("./note.controller");

router.post("/", note_controller.createNote);
router.get("/:id", note_controller.getNote);
router.get("/", note_controller.getNotes);
router.put("/:id", note_controller.updateNote);
router.delete("/:id", note_controller.deleteNote);

module.exports = router;
