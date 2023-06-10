const express = require("express");
const emiRouter = express.Router();
const { UserModel } = require("../model/User.model")

emiRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const user = await UserModel.findById({ _id: id })
        res.status(200).send({ user })

    } catch (error) {
        res.status(404).send({ "msg": error.message })

    }
})
emiRouter.post("/emi", async (req, res) => {
    try {
        const { principle, interest, months } = req.body
        const r = (interest /12) / 100
        console.log(r)
        const E = (principle * r * (1 + r) ** months) / ((1 + r) ** months - 1)
        const totalAmount=E*months
         res.status(200).send({"total":E*months,interest:totalAmount-principle,emi:E})
    } catch (error) {

        res.status(404).send({ "msg": error.message })
    }
})
module.exports = { emiRouter }