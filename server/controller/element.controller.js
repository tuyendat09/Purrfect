const asyncHandler = require("../middleware/asyncHandler");
const elementServices = require("../services/element.services");
const reponseUtils = require("../utils/reponse.utils");

exports.handleCreateNewElement = asyncHandler(async (req, res) => {
  const { file, user } = req;

  const uploadData = { file, user };

  const { success, code } = await elementServices.handleCreateNewElement(
    uploadData
  );

  const errorMessages = {
    IMAGE_INVALID: "This image doesn't look right?",
  };

  if (!success) return reponseUtils.sendErrorResponse(res, code, errorMessages);

  return res.status(200).json({
    success: true,
    message: "Yay! Your image just landed safely. Thanks for sharing! 🎉",
  });
});

exports.handleQueryElement = asyncHandler(async (req, res) => {
  const query = req.query;
  const userId = req.user.id;

  const queryData = { query, userId };

  const { success, elements, hasNextPage, total } =
    await elementServices.handleQueryElement(queryData);

  if (!success) {
    let message = "Something wrong :(";
    return res.status(400).json({ success: false, message });
  }

  return res.status(200).json({
    success: true,
    element: elements,
    hasNextPage: hasNextPage,
    total: total,
  });
});

exports.handleLikeElement = asyncHandler(async (req, res) => {
  const { elementId } = req.body;
  const userId = req.user.id;

  const likeElementData = { userId, elementId };

  const { success, code } = await elementServices.handleLikeElement(
    likeElementData
  );

  if (success) {
    let message = "Something wrong :(";
    switch (code) {
      case "LIKED_ELEMENT":
        message = "Added to your favorites! 🌟";
        break;
      case "UNLIKED_ELEMENT":
        message = "All clear — no more like on this one 💔";
        break;
    }
    return res.status(200).json({ success: true, message });
  }

  return res.status(400).json({
    success: false,
    message: "Something wrong :(",
  });
});

exports.handleQueryClusterElements = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { clusterName } = req.query;

  const queryData = { userId, clusterName };
  const { success, elements, hasNextPage, total } =
    await elementServices.handleQueryClusterElements(queryData);

  return res.status(200).json({
    success: true,
    element: elements,
    hasNextPage: hasNextPage,
    total: total,
  });
});
