// const express = require("express");
// const userController = require("../controllers/user.controller");
// const identifyUser = require("../middleweres/auth.middleweres");

// const userRouter = express.Router();

// userRouter.post("/follow/:username", identifyUser, userController.followUserController);

// userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController);






// module.exports = userRouter;
const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middleweres/auth.middleweres");

const userRouter = express.Router();

// 🔵 Send Follow Request
userRouter.post("/follow/:username", identifyUser, userController.followUserController);

// ❌ Unfollow / Cancel
userRouter.delete("/unfollow/:username", identifyUser, userController.unfollowUserController);

// 🟢 Accept Request
userRouter.put("/follow/accept/:id", identifyUser, userController.acceptFollowRequest);

// 🔴 Reject Request
userRouter.put("/follow/reject/:id", identifyUser, userController.rejectFollowRequest);

module.exports = userRouter;