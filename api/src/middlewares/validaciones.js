const validate = (req, res, next) => {
    const {name} = req.body;
    if (!name) return res.status(400).json({ error:"Falta el campo name" });

    next();
};

module.exports = validate;