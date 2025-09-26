exports.getMissingFields = (answers) => {
  const requiredFields = ["age","smoker","exercise","diet"];
  return requiredFields.filter(field => answers[field] === undefined || answers[field] === null);
};
