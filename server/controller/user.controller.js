const asyncHandler = require("../middleware/asyncHandler");
const userServices = require("../services/user.servicse");

exports.handleEditUserName = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const userId = req.user.id;

  const { success, code } = await userServices.handleChangeUserName(
    userId,
    username
  );

  if (!success) {
    let message = "Something wrong :(";
    switch (code) {
      case "USER_NOTFOUND":
        message =
          "Oops! Looks like you’re not logged in. Mind signing in first?";
        break;
      case "USERNAME_EXIST":
        message = "Oops! That username is already taken. Try another one";
        break;
    }
    return res.status(400).json({ success: false, message });
  }
  return res
    .status(200)
    .json({ success: true, message: "Nice! Your username has been set. 🎉" });
});

exports.handleChangePictureProfile = asyncHandler(async (req, res) => {
  const { file, user } = req;
  await userServices.handleUpdateProfilePicture(file);

  return res
    .status(200)
    .json({ success: true, message: "Your new appearance is ready! 🎉 " });
});
