const isDocumentExist = async (Model, query) => {
  const existingDoc = await Model.findOne(query);
  return !!existingDoc;
};

module.exports = isDocumentExist;
