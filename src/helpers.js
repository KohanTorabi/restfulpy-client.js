/**
 * Created by vahid on 7/11/17.
 */

export function encodeQueryString(obj) {
  if (Array.isArray(obj)) {
    return obj
      .map((k) => `${encodeURIComponent(k[0])}=${encodeURIComponent(k[1])}`)
      .join("&");
  } else {
    return Object.keys(obj)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
      .join("&");
  }
}

// FIXME: Add this with defineProperty
// eslint-disable-next-line no-extend-native
String.prototype.getHashCode = function () {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    hash = (hash << 5) - hash + this.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

export function getObjectHashCode(obj) {
  let items = Object.keys(obj).map((k) => [k, JSON.stringify(obj[k])]);
  items.sort();
  return encodeQueryString(items).getHashCode();
}

export const fixNumbers = (str = "") => {
  const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  const arabicNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g,
  ];
  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};
