function extractSomeProps(obj, propsList, defaultVal) {
  const ret = {};
  propsList.forEach(prop => {
    if (Reflect.has(obj, prop)) ret[prop] = obj[prop];
    else if (defaultVal) ret[prop] = defaultVal;
  });
  return ret;
}

module.exports = {
  extractSomeProps,
};
