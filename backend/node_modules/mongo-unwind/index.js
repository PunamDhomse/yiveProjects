/**
 * Unwinds a array in object (similar to mongo $unwind)
 */
module.exports = unwind;

/**
 * Unwinds a array in object (similar to mongo $unwind)
 * It first flattens the given object(except the given path),
 * then if the given path contains an array
 * it will create a copy of the flattened object for every element
 * in the array and assign one value from the array
 * to each copy of the flattened object and
 * finally unflattens all the copied objects into an array
 *
 * @example
 * let obj = {a: {b: 1, c: [1,2]}}
 * console.log(unwind(obj, 'a.c')) // [{a: {b: 1, c: 2}}, {a: {b: 1, c: 2}}]
 *
 * @param {Object} obj Object with array to be unwinded
 * @param {String} keyPath Path to the array in the object. Ex: 'a.b.c'
 *
 * @returns {Array<Object>}
 */
function unwind(obj, keyPath) {
  // Flatten an object and get the val for the matched path
  const { flattened, val: arrVal } = flatten(obj, keyPath);

  const result = arrVal.map(v => {
    const copy = Object.assign({}, flattened);
    copy[`${keyPath}`] = v;
    return unflatten(copy);
  });

  return result.length ? result : [obj];
}

/**
 * Flattens an object into another object
 * with key(in the form of 'a.b', 'a.c.0')-value pairs of dept=1
 *
 * @param {Object} target Object to be flattened
 * @param {String} path String path not to include in the flattened object
 *
 * @returns {Object}
 */
function flatten(target, path) {
  var delimiter = ".";
  var output = { flattened: {}, val: [] };

  /**
   * Moves into each embedded object in step by step fashion
   *
   * @param {Object} object
   * @param {String} prev Previous step's key
   */
  function step(object, prev) {
    Object.entries(object).forEach(([key, val]) => {
      var isarray = Array.isArray(val);
      var isobject = val instanceof Object;

      var newKey = prev ? prev + delimiter + key : key;

      // Do not include if the given path has been reached
      // and it's value is an array
      if (newKey == path && target[newKey] == undefined)
        return (output.val = val);

      // If not an empty object, then recurse
      if (!isarray && isobject && Object.keys(val).length)
        return step(val, newKey);

      output.flattened[newKey] = val;
    });
  }

  step(target);

  return output;
}

/**
 * Unflatten/reverts the flattened object back
 * to original object
 *
 * @param {Object} target Flattened object
 *
 * @returns {Object} unflattened object
 */
function unflatten(target) {
  const delimiter = ".";
  const result = {};

  Object.entries(target).forEach(([k, v]) => {
    const split = k.split(delimiter);

    let i = 0;

    // Get first and next key in the split key path
    let k1 = getkey(split[i]);
    let k2 = getkey(split[i + 1]);

    let tmp = result;

    // Loop until k1 has reached end of split
    while (k2 !== undefined) {
      const isObj = tmp[k1] instanceof Object;

      // If path has not been initialized,
      // then initialize it as an array/object
      // depending on next key (whether number or not?)
      if (!isObj) tmp[k1] = typeof k2 === "number" ? [] : {};

      // Move one key forward
      tmp = tmp[k1];
      if (++i < split.length) {
        k1 = getkey(split[i]);
        k2 = getkey(split[i + 1]);
      }
    }

    tmp[k1] = v;
  });

  return result;
}

/**
 * Return the given key if it's a string else
 * parses it into number
 *
 * @param {String} key
 *
 * @returns {String|Number}
 */
function getkey(key) {
  var parsedKey = Number(key);

  return isNaN(parsedKey) ? key : parsedKey;
}
