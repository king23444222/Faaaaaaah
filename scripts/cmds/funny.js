const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "funny",
    aliases: ["fun",  "gop", "maga", "ladle", "বউ"],
    version: "1.0",
    author: "Mr.King",
    countDown: 3,
    role: 0,
    shortDescription: { en: "Get unlimited funny videos instantly" },
    category: "fun",
    guide: { en: "{pn}" }
  },

  onStart: async function (args) {
    return this.handleFunny(args);
  },

  onChat: async function (args) {
    const { event } = args;
    if (!event.body) return;
    const body = event.body.toLowerCase();
    
    
    const triggers = [
      "funny", "/funny", "fun", "/fun",  "gop gop gop", 
    ];

    if (triggers.some(t => body.includes(t)) && !event.body.startsWith(global.GoatBot.config.prefix)) {
      return this.handleFunny(args);
    }
  },

  handleFunny: async function ({ api, event, message }) {
    const { threadID, messageID } = event;
    const reactions = ["🤣", "😆", "🤡", "👻", "😹", "🐸", "🦥", "🐒"];
    api.setMessageReaction(reactions[Math.floor(Math.random() * reactions.length)], messageID, () => {}, true);

    try {
    
      const searchTerms = [
        "Cat silly funny video", "dog funny video", "funny video tik tok", 
        "gop gop gop funny", "maka ladle funny", "free fire funny video", "bangla funny video", "girl roasted video", "joker funny video"
      ];
      const randomSearch = searchTerms[Math.floor(Math.random() * searchTerms.length)];

      const res = await axios.get(`https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(randomSearch)}`);
      const videoData = res.data?.data?.videos;

      if (!videoData || videoData.length === 0) {
        return message.reply("⚠️ 𝐍𝐨 𝐯𝐢𝐝𝐞𝐨 𝐟𝐨𝐮𝐧𝐝, 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧!");
      }

    
      const videoUrl = videoData[Math.floor(Math.random() * Math.min(videoData.length, 10))].play;
      const pathVideo = path.join(__dirname, "cache", `funny_${Date.now()}.mp4`);
      
      const response = await axios({ method: 'get', url: videoUrl, responseType: 'stream' });
      const writer = fs.createWriteStream(pathVideo);
      response.data.pipe(writer);

      writer.on('finish', () => {
        api.sendMessage({
          body: `🐸  𝐅𝐔𝐍𝐍𝐘 𝐕𝐈𝐃𝐄𝐎 🦥\n\n Your message ignored successfullyᥬ🙂ᩤ `,
          attachment: fs.createReadStream(pathVideo)
        }, threadID, () => {
          if (fs.existsSync(pathVideo)) fs.unlinkSync(pathVideo);
        }, messageID);
      });

    } catch (err) {
      console.log(err);
      return message.reply("⚠️ 𝐒𝐞𝐫𝐯𝐞𝐫 𝐛𝐮𝐬𝐲, 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧 𝐥𝐚𝐭𝐞𝐫!");
    }
  }
};