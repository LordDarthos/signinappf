const router = require('express').Router()
const { addNote, getNote, getIdUpdateNote, updateNote, deleteNote } = require('../controllers/notesController')
const isAuth = require('../helpers/auth')
const multer = require('multer')
const upload = multer()

//agregar isAuthenticated de nuevo

router.post('/notes/new-note',  upload.none(),  addNote)

router.get('/notes/:id', getNote)
// router.get('/notes', (req,res,next)=>{
//     if(req.isAuthenticated) {
//         console.log(req.session)
//         next()
//     } else {
//         console.log("joto")
//     }
// }, getNote)
router.get('/notes/edit/:id', getIdUpdateNote)

router.patch('/notes/edit-note/:id', updateNote)

// router.patch('/notes/edit-note/:id', isAuthenticated, updateNote)

router.delete('/notes/delete-note/:id', deleteNote)

module.exports = router