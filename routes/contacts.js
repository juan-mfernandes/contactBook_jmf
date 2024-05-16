const express = require('express')
const { findContacts, createContact, updateContact } = require('../project/db/contacts')
const contactRouter = express.Router()

contactRouter.get("/contacts", async (req, res) => {
    const contacts = await findContacts()
    if(contacts.length === 0) return res.send("There are no registered users.")
    res.json(contacts)
})

contactRouter.post('/contacts', async (req, res) => {
    let data = req.body
    const newContact = await createContact(data)
    if(newContact === false) return res.status(400).send("Invalid Data Format")
    res.status(201).json(newContact)
})

contactRouter.put('/contacts/:id', async (req, res) => {
    const id = Number(req.params.id)
    let data = req.body
    const updatedContact = await updateContact(id, data)
    if(updatedContact === false) return res.status(400).send("Invalid Data Format")
    res.status(201).json(updatedContact)
})

module.exports = { contactRouter }