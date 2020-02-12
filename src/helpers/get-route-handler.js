const url = require("url");

const getClearUrl = (pathname, req) => {
  // url example : `/user/12345`
  const lastIndex = pathname.lastIndexOf("/");
  const isQuery = url.parse(req.url).query;
  const idString = pathname.slice(lastIndex + 1).trim();
  const idNumber = +idString;

  if (isQuery) {
    return pathname.slice(0, lastIndex);
  }

  if (idNumber) {
    return pathname.slice(0, lastIndex);
  }

  return pathname;
};

const getRouteHandler = (routerConfig, pathname, req) => {
  const clearUrl = getClearUrl(pathname, req);

  return routerConfig[clearUrl];
};

module.exports = getRouteHandler;
