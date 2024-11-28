const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.delete("/delete", controller.deleteUser);
router.put("/edit", controller.editUser);
router.get("/", controller.getUser);
module.exports = router;
