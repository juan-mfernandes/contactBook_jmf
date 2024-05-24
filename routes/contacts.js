const express = require('express')
const { findContacts, createContact, updateContact, deleteContact, findContactById } = require('../project/db/contacts')
const { loginAuth } = require('../project/middlewares/auth')
const { getHttpStatusCode } = require('../project/utils/errorUtils')
const contactRouter = express.Router()

contactRouter.get("/contacts", loginAuth, async (req, res) => {
    try {
        const contacts = await findContacts(req.user)
        return res.json({contacts})
    } catch (err) {
        const statusCode = getHttpStatusCode(err)
        return res.status(statusCode).json({error: err.message})
    }
})

contactRouter.get("/contacts/:id", loginAuth, async(req, res) => {
    try {
        const id = Number(req.params.id)
        const contact = await findContactById(id, req.user)
        return res.json(contact)
    } catch (err) {
        const statusCode = getHttpStatusCode(err)
        return res.status(statusCode).json({error: err.message})
    }
})

contactRouter.post('/contacts', loginAuth, async (req, res) => {
    try {
        let data = req.body
        const newContact = await createContact(data, req.user)
        if(newContact === false) return res.status(400).send("Invalid Data Format")
        return res.status(201).json(newContact)
    } catch (err) {
        const statusCode = getHttpStatusCode(err)
        return res.status(statusCode).json({error: err.message})
    }
})

contactRouter.put('/contacts/:id', loginAuth, async (req, res) => {
    try {
        const id = Number(req.params.id)
        if(!id) return res.status(404).send("ID not found")
        let data = req.body 
        const updatedContact = await updateContact(id, data, req.user)
        if(updatedContact === false) return res.status(400).send("Invalid Data Format")
        return res.status(201).json(updatedContact)
    } catch (err) {
        const statusCode = getHttpStatusCode(err)
        return res.status(statusCode).json({error: err.message})
    }
})

contactRouter.delete("/contact/:id", loginAuth, async (req, res) => {
    try {
        const id = Number(req.params.id)
        const deletedContact = await deleteContact(id, req.user);
        return res.status(204).json(deletedContact)
    } catch (err) {
        const statusCode = getHttpStatusCode(err)
        return res.status(statusCode).json({error: err.message})
    }
})

module.exports = { contactRouter }