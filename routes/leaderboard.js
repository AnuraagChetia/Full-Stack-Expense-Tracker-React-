const express = require("express");
const router = express.Router();

const leaderboardController = require("../controller/leaderboard");

router.get("/get-leaderboard", leaderboardController.getLeaderboard);

module.exports = router;
