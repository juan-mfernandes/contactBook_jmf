const express = require('express')
const { findContacts, createContact, updateContact, deleteContact, findContactById } = require('../project/db/contacts')
const { loginAuth } = require('../project/middlewares/auth')
const contactRouter = express.Router()

contactRouter.get("/contacts", loginAuth, async (req, res) => { 
    const contacts = await findContacts()
    if(contacts.length === 0) return res.send("There are no registered users.")
    res.json(contacts)
})

contactRouter.get("/contacts/:id", loginAuth, async(req, res) => {
    const id = Number(req.params.id)
    const contact = await findContactById(id)
    res.json(contact)
})

contactRouter.post('/contacts', loginAuth, async (req, res) => {
    let data = req.body
    const newContact = await createContact(data)
    if(newContact === false) return res.status(400).send("Invalid Data Format")
    res.status(201).json(newContact)
})

contactRouter.put('/contacts/:id', loginAuth, async (req, res) => {
    const id = Number(req.params.id)
    if(!id) return res.status(404).send("ID not found")
    let data = req.body 
    const updatedContact = await updateContact(id, data)
    if(updatedContact === false) return res.status(400).send("Invalid Data Format")
    res.status(201).json(updatedContact)
})

contactRouter.delete("/contact/:id", loginAuth, async (req, res) => {
    const id = Number(req.params.id)
    if(!id) return res.status(404).send("ID not found")
    const deletedContact = await deleteContact(id);
    res.send(204).json(deletedContact)
})

module.exports = { contactRouter }