const express = require("express");
const router = express.Router();
const {
  getUser,
  filterUser,
  searchUserByUUID,
} = require("../controllers/userController.js");

// router.get("/user", getUser); //internally its request is like /user/user if we mention it like that
router.get("/", getUser);
router.get("/search", filterUser);
router.get("/:uuid", searchUserByUUID);

module.exports = router;
