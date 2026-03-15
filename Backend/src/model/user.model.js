const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({ 
    username: { 
        type: String,
        unique:[ true, "Username already exists"],
        required: [true, "Username is required"]
    },
    email: { 
        type: String,
        unique:[ true, "Email already exists"],
        required: [true, "Email is required"]
    },
    password: { 
        type: String,
        required: [true, "Password is required"],
        select: false

    },

    bio: String,
    profileImage: { 
        type: String,
        default: "https://ik.imagekit.io/qiwndruvq/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.webp"}

})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;