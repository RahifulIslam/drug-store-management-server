module.exports = async (req, res, next) => {
    console.log("Inside the admin", req.user)
    if (req.user.role !== "admin") return res.status(403).send("Forbidden!");
    console.log("User role are:", req.user.role)

    next();
}