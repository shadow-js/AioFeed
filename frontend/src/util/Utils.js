export const RemoveCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const AddCookie = (cookieName, value, expire_date) => {
  document.cookie = `${cookieName}=${value}; path=/; ${
    expire_date ? `expires=${expire_date}` : null
  } SameSite=Lax`;
};

export const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      // console.log(`Cookie ${cname}: ${c.substring(name.length, c.length)}`);
      if (c.substring(name.length, c.length) === "null") {
        return null;
      } else if (c.substring(name.length, c.length) === "false") {
        return false;
      } else if (c.substring(name.length, c.length) === "true") {
        return true;
      }

      return c.substring(name.length, c.length);
    }
  }
  return null;
};

export const getLocalstorage = (name) => {
  const item = localStorage.getItem(name);
  try {
    const itemParsed = JSON.parse(item);

    if (itemParsed === "null") {
      return null;
    } else {
      return itemParsed;
    }
  } catch (error) {
    return item;
  }
};

export const truncate = (input, max) => {
  if (input && input.length > max) return input.substring(0, max) + "..";
  else return input;
};
