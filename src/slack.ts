import { files } from "slack";
import config from "./config";

interface MenuImageUploadOptions {
  caption?: string;
}

const MenuImageUploadDefaults: MenuImageUploadOptions = {
  caption: "Menu"
};

export const uploadMenuImageToSlack = async (
  file: ReadableStream,
  passedOptions: MenuImageUploadOptions
): Promise<void> => {
  const options = { ...MenuImageUploadDefaults, passedOptions };
  await files.upload({
    file,
    title: "Menu",
    channels: config.slack.channelId,
    token: config.slack.token,
    initial_comment: `*${options.caption}*`
  });
};

export default slack;
