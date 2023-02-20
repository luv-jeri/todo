const filter_object = (obj, ...allowed_fields) => {
  const filtered_obj = {};

  Object.keys(obj).forEach((el) => {
    if (allowed_fields.includes(el)) filtered_obj[el] = obj[el];
  });

  return filtered_obj;
};

module.exports = filter_object;
