const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let NoteSchema = new Schema({
    note_id: { type: String, required: true, unique: true },
    note_title: { type: String, required: true, max: 100 },
    note_body: { type: String, required: true, max: 1000 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null },
});
NoteSchema.index({ note_id: 1 });

module.exports = mongoose.model("Note", NoteSchema);
