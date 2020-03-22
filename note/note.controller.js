const Note = require("./note.model");

const uuidv1 = require("uuid/v1");

async function deleteNote(req, res) {
    try {
        let query = { note_id: req.params.id };
        date = Date.now();
        let newvalues = { $set: { deleted_at: date } };

        let note = await Note.findOne(query);
        if (note.deleted_at)
            return res.status(404).json({ message: "Note Not Found" });
        note = await Note.updateOne(query, newvalues);
        if (!note.ok)
            return res
                .status(500)
                .json({ message: "Database Error", error: note });

        return res.status(201).json({ message: "Note Deleted" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Database Error", details: req.body, error });
    }
}

async function updateNote(req, res) {
    try {
        let query = { note_id: req.params.id };
        let newvalues = { $set: req.body };
        let note = await Note.findOne(query);
        if (note.deleted_at)
            return res.status(404).json({ message: "Note Not Found" });
        note = await Note.updateOne(query, newvalues);
        if (!note.ok)
            return res
                .status(400)
                .json({ message: "Invalid Entries", details: req.body });

        return res.status(201).json({ message: "Note Updated" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Database Error", details: req.body, error });
    }
}

async function getNotes(req, res) {
    try {
        let query = { deleted_at: null };
        let projections = {
            note_id: 1,
            note_title: 1,
            note_body: 1,
            _id: 0
        };
        let note = await Note.find(query, projections);
        return res.status(200).json({ data: note });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Database Error", details: req.body, error });
    }
}

async function getNote(req, res) {
    try {
        console.log("req.params.id", req.params.id);
        let query = {
            note_id: req.params.id,
            deleted_at: null,
        };
        let projections = {
            note_id: 1,
            note_title: 1,
            note_body: 1,
            _id: 0
        };
        let note = await Note.findOne(query, projections);
        if (!note) return res.status(404).json({ message: "Note Not Found" });

        return res.status(200).json({ data: note });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Database Error", details: req.body, error });
    }
}

async function createNote(req, res) {
    try {
        let note = new Note({
            note_id: uuidv1(),
            note_title: req.body.title || "Untitled Note",
            note_body: req.body.content        
        });
        let resp = await note.save();
        return res.status(201).json({ message: "Note Created successfully", resp });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res
                .status(400)
                .json({ message: "Invalid Entries", data: req.body });
        }
        return res
            .status(500)
            .json({ message: "Database Error", details: req.body, error });
    }
}

module.exports = {
    getNotes,
    getNote,
    deleteNote,
    updateNote,
    createNote
};
