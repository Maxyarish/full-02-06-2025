const Yup = require("yup");

module.exports.createProductSchema=Yup.object({
    title:Yup.string().trim().min(3).max(255).required(),
    description:Yup.string().trim(),
    price:Yup.number().positive().max(1000000).required(),
    stockQty:Yup.number().min(0).max(1000).default(1),
    category:Yup.string().required(),
    isSale:Yup.boolean(),
})