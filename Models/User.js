const jwt = require("jsonwebtoken");
const { model, Schema } = require("mongoose");

const PasswordManager = require("../helpers/PasswordManager");

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  recipe: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordManager.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

module.exports = model("User", UserSchema);
