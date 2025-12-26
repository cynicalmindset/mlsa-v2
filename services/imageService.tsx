export const getuserImagesrc = (imagePath: any) => {
  if (imagePath) {
    return { uri: imagePath };
  } else {
    return require("../assets/illustration/avatar.jpeg");
  }
};
