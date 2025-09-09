const Query = require("../models/QueriesSchema")
const User = require("../models/userSchema")


exports.addQuery = async (req, res) => {
    const { user_name, user_email, message } = req.body
    const Id = req.params.id
    try {

        const valid_user = await User.findById(Id);

        if (!valid_user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        if (!user_name || !user_email || !message) {
            return res.status(404).json({ status: false, message: "Please Fill the fields" });
        }
        const query = new Query({ user_email, user_name, message, userId: Id });
        await query.save();

        res.status(200).json({ status: true, message: "Query Posted" });
    } catch (error) {
        res.status(501).json({ status: false, message: "Internal Server Error" })
    }
}


exports.getReviews = async (req, res) => {
    // const { userId } = req.params.id;
    try {
        // const Admin = await User.findById(userId);
        // if (!Admin) {
        //     return res.status(404).json({ status: false, message: "Only admin can access" });
        // }
        const getQuery = Query.find();
        console.log(getQuery);
        res.status(200).json({ status: true, getQuery, message: "Retrieved" });
    } catch (error) {
        res.status(501).json({ status: false, message: "Internal Error" });
    }
}