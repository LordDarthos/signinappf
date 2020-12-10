const Note = require('../models/notesModels');
const mongoose = require('mongoose');

async function addNote (req, res) {
    try {
        // atrapo los valores del esquema del body, esto se ha parseado a urlencoded anteriormente con modulos agregados(body-parser en app.js)
        const {
            title,
            description
        } = req.body;


        // igualo la variale a modelo o esquema de mongoDB para tenerlo como instancia del mismo y guardarlo con el metodo save() posteriormente
        const note = new Note({
            title,
            description
        })

        note.user = req.body.id;

        console.log(req.user)

        console.log("RES BODTTTTT",req.body)
        

        //.save() es el metodo para guardar valores dentro de la base de datos no relacional
        await note.save();
        res.send('Note Added Successfully')
        // res.redirect('/notes')    
    } catch (err) {
        // req.flash('error_msg', 'Error Adding Note')
        res.status(500).send({ message:err.message });
        
    }
}

async function getNote (req, res) {
    try {
        // console.log("REQ  USER",req.user)
        const notes = await Note.find({ user: req.params.id}).lean().exec(); 
        // const notes = await Note.find().lean().exec();
        // console.log(notes)
        // console.log("USER",req.user)
        res.status(200).send({ notes });
        console.log(req.params)
        res.end()
    } catch (err) {
        res.status(500).send({ message:err.message });
    }
}

async function getIdUpdateNote (req, res) {
    try {
        const note = await Note.findById(req.params.id)
        res.status(200).send({ note })
    } catch (err) {
        res.status(500).send({ message:err.message });
    }
}

async function updateNote (req, res) {
    try {
        mongoose.set('useFindAndModify', false);
        const toUpdate = req.body
        console.log(req.body)
        await Note.findByIdAndUpdate(req.params.id, toUpdate)
        res.status(200).send()
 
        // res.redirect('/notes') //modificar o eliminar redirects para hacerlo en react
    } catch (err) {
        res.status(500)
        // req.flash('error_msg', 'Error Updating Note')
        // res.redirect('/notes')
    }
    
}
    
async function deleteNote (req, res) {
    try {
        console.log(req.params.id)
        await Note.findByIdAndDelete(req.params.id)
        res.status(200)
        req.flash('seccess_msg', 'Note Deleted Successfully')
        res.redirect('/notes')
    } catch (err) {
        res.status(500).send({ message:err.message });
    }
    
}


module.exports = { addNote, getNote, getIdUpdateNote, updateNote, deleteNote }