const resolveTribeName = (tribeName) => {
  if (tribeName.charAt(0) === "@") return tribeName.slice(1);
  return tribeName;
};

const URL = Object.freeze({
  DEFAULT: "https://google.com",
  PROJECTNAME_TRIBENAME_UAT: "https://www.instagram.com",
});

export const getUrlByTribeName = (tribeName) => {
  switch (resolveTribeName(tribeName)) {
    case "projectname-tribename-uat":
      return URL.PROJECTNAME_TRIBENAME_UAT;
    case "projectname-tribename-sit":
    default:
      return URL.DEFAULT;
  }
};
