export const checkImageURL = (url) => {
    if (!url) return false;
    const pattern = new RegExp(
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|bmp|gif|webp)(?:\?.*)?)$|^(https?:\/\/.*(images|media).*\?.*)$/i
    );
    return pattern.test(url);
};
