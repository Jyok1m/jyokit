var express = require("express");
var router = express.Router();
var db = require("../database/db");

/* GET users listing. */
router.get("/", async (req, res, next) => {
	try {
		const users = await db.users.find({});
		res.status(200).json({ result: true, users });
	} catch (error) {
		console.error("Error fetching users:", error);
		return res.status(500).json({ result: false, error: "Internal Server Error" });
	}
});

module.exports = router;
