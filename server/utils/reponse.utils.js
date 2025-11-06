exports.sendSuccessResponse = (res, code, moduleMessages, extra = {}) => {
  const message = moduleMessages?.success?.[code] || "Something went wrong :(";
  console.log(moduleMessages?.success?.[code]);
  return res.status(200).json({ success: true, message, ...extra });
};

exports.sendErrorResponse = (
  res,
  code,
  moduleMessages,
  status = 400,
  extra = {}
) => {
  const message = moduleMessages?.error?.[code] || "Something went wrong :(";
  return res.status(status).json({ success: false, message, ...extra });
};
