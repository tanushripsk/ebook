const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator')
const Notes = require('../modules/Notes')
var fetchuser = require('../fetch/Fetchuser')


//api/notes/addnote
router.post('/addnote', fetchuser, [
    body('title', 'enter valid title').isLength({ min: 3 }),
    body('description', 'enter desc').isLength({ min: 3 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Notes({ title, description, tag, user: req.user.id })
        const savenote = await note.save();
        res.json(savenote)
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('internal error')
    }
})

//api/notes/fetchuser
router.post('/fetchuser', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('internal server error')
    }
})


// udpate
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
        newNote.title = title;
    }
    if (description) {
        newNote.description = description
    }
    if (tag) {
        newNote.tag = tag;
    }
    var note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("not found")
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(400).send('not allowed')
    }
    note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
    );
    res.json({ note })
})

// delete
router.delete("/deletenote/:id", fetchuser, async (req, res) => { 
    try {
        var note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send('not found');

        }
        if (note.user.toString() !== req.user.id) {
            return res.status(400).send("not allow")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ success: "note deleted", note: note })
    } catch (error) {
        console.log(error.message)
        return res.status(500).send("internal server erross")
    }
})

//api/notes/fetchuser
router.get("/fetchuser", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal server error")
    }
});

module.exports = router