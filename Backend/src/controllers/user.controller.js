const followModel = require("../model/follow.model")
const userModel = require("../model/user.model")




// async function followUserController(req, res) {
//     const followerUsername = req.user.username
//     const followeeUsername = req.params.username

//     if (followeeUsername == followerUsername) { 
//         return res.status(400).json({
//             message: "You cannot follow yourself"
//         })
//     }

//     const isFolloweeExists = await userModel.findOne({
//         username: followeeUsername
//     })
//     if (!isFolloweeExists){ 
//         return res.status(404).json({
//             message: `User ${followeeUsername} does not exist`
//         })
//     }

//     const isAllreadyFollowing = await followModel.findOne({
//         follower: followerUsername,
//         followee: followeeUsername
//     })

//     if (isAllreadyFollowing) {
//         return res.status(200).json({
//             message: `You are already following ${followeeUsername}`,
//             follow: isAllreadyFollowing
//         })
//     }
//     const followRecord = await followModel.create({
//         follower: followerUsername,
//         followee: followeeUsername
//     })

//     res.status(201).json({
//         message: `You are now following ${followeeUsername}`,
//         follow: followRecord
//     })
// }

// async function unfollowUserController(req, res) {
//     const followerUsername = req.user.username
//     const followeeUsername = req.params.username

//     const isUserFollowing = await followModel.findOne({
//         follower: followerUsername,
//         followee: followeeUsername
//     })

//     if (!isUserFollowing) {
//         return res.status(404).json({
//             message: `You are not following ${followeeUsername}`
//         })
//     }
//     await followModel.findByIdAndDelete(isUserFollowing._id)

//     res.status(200).json({
//         message: `You have unfollowed ${followeeUsername}`
//     })
// }


// module.exports = {
//     followUserController,
//     unfollowUserController
// }

async function followUserController(req, res) {
    try {
        const followerUsername = req.user.username
        const followeeUsername = req.params.username

        if (followeeUsername === followerUsername) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            })
        }

        const isFolloweeExists = await userModel.findOne({
            username: followeeUsername
        })

        if (!isFolloweeExists) {
            return res.status(404).json({
                message: `User ${followeeUsername} does not exist`
            })
        }

        const existingFollow = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername
        })

        if (existingFollow) {

            if (existingFollow.status === "pending") {
                return res.json({
                    message: "Follow request already sent",
                    follow: existingFollow
                })
            }

            if (existingFollow.status === "accepted") {
                return res.json({
                    message: `You are already following ${followeeUsername}`,
                    follow: existingFollow
                })
            }

            if (existingFollow.status === "rejected") {
                existingFollow.status = "pending"
                await existingFollow.save()

                return res.json({
                    message: "Follow request sent again",
                    follow: existingFollow
                })
            }
        }

        const followRecord = await followModel.create({
            follower: followerUsername,
            followee: followeeUsername,
            status: "pending"
        })

        res.status(201).json({
            message: `Follow request sent to ${followeeUsername}`,
            follow: followRecord
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


async function unfollowUserController(req, res) {
    try {
        const followerUsername = req.user.username
        const followeeUsername = req.params.username

        const follow = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername
        })

        if (!follow) {
            return res.status(404).json({
                message: `No follow relationship found`
            })
        }

        await followModel.findByIdAndDelete(follow._id)

        if (follow.status === "pending") {
            return res.json({
                message: "Follow request cancelled"
            })
        }

        res.json({
            message: `You have unfollowed ${followeeUsername}`
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function acceptFollowRequest(req, res) {
    try {
        const followId = req.params.id

        const follow = await followModel.findByIdAndUpdate(
            followId,
            { status: "accepted" },
            { new: true }
        )

        if (!follow) {
            return res.status(404).json({
                message: "Follow request not found"
            })
        }

        res.json({
            message: "Follow request accepted",
            follow
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function rejectFollowRequest(req, res) {
    try {
        const followId = req.params.id

        const follow = await followModel.findByIdAndUpdate(
            followId,
            { status: "rejected" },
            { new: true }
        )

        if (!follow) {
            return res.status(404).json({
                message: "Follow request not found"
            })
        }

        res.json({
            message: "Follow request rejected",
            follow
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    followUserController,
    unfollowUserController,
    acceptFollowRequest,
    rejectFollowRequest
}