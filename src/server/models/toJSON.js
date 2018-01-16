/* eslint-disable no-param-reassign, no-underscore-dangle */
module.exports = function toJSON(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
};
