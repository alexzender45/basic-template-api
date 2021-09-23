const { throwError } = require("./handleErrors");
const { error, success } = require("../utils/baseController");

exports.performUpdate = async (
  updates,
  newDetails,
  allowedUpdates,
  oldDetails
) => {
  let invalidField;
  const isValidUpdate = updates.every((update) => {
    if (newDetails[update] === "")
      throwError(`Invalid value supplied for ${update}`);
    invalidField = update;
    return allowedUpdates.includes(update);
  });

  if (!isValidUpdate) {
    throwError(`Invalid Field ${invalidField}`);
  }

  updates.map((update) => {
    oldDetails[update] = newDetails[update];
  });

  return await oldDetails.save();
};
