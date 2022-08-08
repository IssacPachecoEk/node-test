const express = require("express");
const contactSchema = require("../models/contact");

const router = express.Router();

// Todos contacts
router.get("/contacts", (req, res) => {
  contactSchema
    .find()
    .then((data) => res.json(data),res.status(200))
    .catch((error) => res.status(404).send({
      message: `Server Exception: ${error.message}`,
    }));
});

// crear contact
router.post("/contact", (req, res) => {
  const contact = new contactSchema({name: req.body.name, phone: req.body.phone, addressLines: req.body.addressLines});
  contact
    .save()
    .then((data) => res.json(data),res.status(200))
    .catch((error) => res.status(404).send({
      message: `Server Exception: ${error.message}`,
    }));
});

// obtener un contact por id
router.get("/contacts/:id", (req, res) => {
  const { id } = req.params;
  contactSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.status(404).send({
      message: `Server Exception: ${error.message}`,
    }));
});

//actualizar un contact
router.put("/user/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, phone, addressLines } = req.body;
  contactSchema
    .updateOne({ _id: id }, { $set: { name, phone, addressLines } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//borrar un contact
router.delete("/contact/delete/:id", (req, res) => {
  const { id } = req.params;
  contactSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
