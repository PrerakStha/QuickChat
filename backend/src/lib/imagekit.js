import Imagekit from "imagekit";

const imagekit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

function hasImagekitConfig() {
  return Boolean(
    process.env.IMAGEKIT_PRIVATE_KEY 
&& process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_URL_ENDPOINT
  );
}

function createFileName( originalName = 'upload') {
    const safeName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
    return `chat-${Date.now()}-${safeName}`;
}

async function uploadChatMedia(file) {
    const fileName = createFileName(file.originalname);
const result = await imagekit.files.upload({
    file: await toFile(file.buffer, fileName, {type: file.mimetype}),
    fileName,
    folder: "/chat",
});

return result.url;
}

export { hasImagekitConfig, uploadChatMedia };