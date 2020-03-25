const express = require("express");
const router = express.Router();
const note_controller = require("./note.controller");
const auth = require("../_helpers/auth");


router.post("/", auth ,note_controller.createNote);
router.get("/:id", auth , note_controller.getNote);
router.get("/", auth , note_controller.getNotes);
router.put("/:id", auth , note_controller.updateNote);
router.delete("/:id", auth , note_controller.deleteNote);

module.exports = router;
