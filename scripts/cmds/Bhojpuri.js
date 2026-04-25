const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

// Initialize global variables
if (!global.bhojpuriUsers) global.bhojpuriUsers = new Set(["61588626550420", "100085152017663", "100078992950475"]);
if (global.bhojpuriStatus === undefined) global.bhojpuriStatus = true;

module.exports = {
  config: {
    name: "bhojpuri",
    aliases: ["bj", "dj", "uttejona", "gorom", "uff", "🔞", "nesha", "pinik"],
    version: "5.1.0",
    author: "Mr.King",
    countDown: 5,
    role: 0,
    shortDescription: { en: "𝐆𝐞𝐭 𝐯𝐢𝐫𝐚𝐥 𝐨𝐫 𝐒𝐞𝐚𝐫𝐜𝐡 𝐬𝐩𝐞𝐜𝐢𝐟𝐢𝐜 𝐯𝐢𝐝𝐞𝐨𝐬 𝐰𝐢𝐭𝐡 𝐑𝐞𝐭𝐫𝐲 𝐋𝐨𝐠𝐢𝐜" },
    category: "media",
    guide: { en: "{pn} [text] | /bj add (reply) | /bj on/off" }
  },

  onStart: async function (args) {
    const { event, message, args: commandArgs } = args;
    const { senderID, type, messageReply } = event;
    const bossID = "100012686563429";

    // Admin Commands
    if (commandArgs[0] === "add" && senderID === bossID) {
      if (type !== "message_reply") return message.reply("❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐭𝐡𝐞 𝐩𝐞𝐫𝐬𝐨𝐧 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭 𝐭𝐨 𝐚𝐝𝐝!");
      global.bhojpuriUsers.add(messageReply.senderID);
      return message.reply("✅ 𝐔𝐬𝐞𝐫 𝐚𝐝𝐝𝐞𝐝 𝐭𝐨 𝐭𝐡𝐞 𝐫𝐞𝐬𝐭𝐫𝐢𝐜𝐭𝐞𝐝 𝐥𝐢𝐬𝐭!");
    }

    if (commandArgs[0] === "on" && senderID === bossID) {
      global.bhojpuriStatus = true;
      return message.reply("✅ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐭𝐮𝐫𝐧𝐞𝐝 𝐎𝐍!");
    }

    if (commandArgs[0] === "off" && senderID === bossID) {
      global.bhojpuriStatus = false;
      return message.reply("❌ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐭𝐮𝐫𝐧𝐞𝐝 𝐎𝐅𝐅!");
    }

    // Access Check
    if (!global.bhojpuriUsers.has(senderID) && senderID !== bossID) return;
    if (!global.bhojpuriStatus) return;

    const searchQuery = commandArgs.join(" ");
    return this.handleContent(args, searchQuery);
  },

  onChat: async function (args) {
    const { event } = args;
    const { body, senderID } = event;
    if (!body || !global.bhojpuriStatus) return;

    if (!global.bhojpuriUsers.has(senderID)) return;

    const bodyLower = body.toLowerCase();
    const triggers = ["bj", "dj", "uttejona", "gorom", "uff", "🔞", "bhojpuri", "nesha"];
    const prefix = global.GoatBot?.config?.prefix || "/";
    
    const matchedTrigger = triggers.find(t => bodyLower.startsWith(t));
    
    if (matchedTrigger && !body.startsWith(prefix)) {
      const searchQuery = body.slice(matchedTrigger.length).trim();
      return this.handleContent(args, searchQuery);
    }
  },

  handleContent: async function (args, searchQuery) {
    const { api, event, message } = args;
    api.setMessageReaction("🌚", event.messageID, () => {}, true);

    const cacheDir = path.join(__dirname, 'cache');
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    // Helper function to search videos
    const getVideos = async (query) => {
      try {
        const res = await axios.get(`https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(query)}`);
        return res.data?.data?.videos || [];
      } catch (e) {
        return [];
      }
    };

    const randomTerms = [
      "bhojpuri hot dance reels", "russian girl viral reels 4k", "bangla dj song dance video", 
      "bangla girl viral dance tiktok", "suno sajna re", "nyxlu queen", "nyxly edit", 
      "Russian queen", "black pink 4k", "black pink hot", "Bangla hot girls", 
      "hot girls", "hot nagin dance", "Indian hot girls", "trending hot reels 2026"
    ];

    try {
      let videos = [];
      let currentSearch = searchQuery || randomTerms[Math.floor(Math.random() * randomTerms.length)];

      // First Attempt
      videos = await getVideos(currentSearch);

      // Retry Loop: If no videos found, try different random keywords up to 5 times
      let attempts = 0;
      while (videos.length === 0 && attempts < 5) {
        currentSearch = randomTerms[Math.floor(Math.random() * randomTerms.length)];
        videos = await getVideos(currentSearch);
        attempts++;
      }

      if (videos.length === 0) {
        return message.reply("⚠️ 𝐒𝐞𝐫𝐯𝐞𝐫 𝐁𝐮𝐬𝐲! 𝐤𝐨𝐧𝐨 𝐯𝐢𝐝𝐞𝐨 𝐩𝐚𝐨𝐲𝐚 𝐣𝐚𝐜𝐜𝐡𝐞 𝐧𝐚।");
      }

      // Pick a random video from the search results
      const randomVideo = videos[Math.floor(Math.random() * videos.length)];
      const videoUrl = randomVideo.play;
      const pathVideo = path.join(cacheDir, `boss_video_${Date.now()}.mp4`);

      const response = await axios({ method: 'get', url: videoUrl, responseType: 'stream' });
      const writer = fs.createWriteStream(pathVideo);
      response.data.pipe(writer);

      writer.on('finish', () => {
        return message.reply({
          body: `⚔️ 𝐑𝐞𝐬𝐮𝐥𝐭 𝐟𝐨𝐫: ${currentSearch} ⚔️\n\n🦭 𝐒𝐲𝐬𝐭𝐞𝐦 𝐁𝐲: 𝐌𝐫.𝐊𝐢𝐧𝐠 🕊️💖`,
          attachment: fs.createReadStream(pathVideo)
        }, () => {
          if (fs.existsSync(pathVideo)) fs.unlinkSync(pathVideo);
        });
      });

      writer.on('error', (err) => {
        console.error(err);
        message.reply("⚠️ 𝐅𝐢𝐥𝐞 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝 𝐞𝐫𝐫𝐨𝐫!");
      });

    } catch (err) {
      console.error(err);
      return message.reply("⚠️ 𝐄𝐫𝐫𝐨𝐫: 𝐕𝐢𝐝𝐞𝐨 𝐬𝐞𝐫𝐯𝐞𝐫 𝐝𝐨𝐰𝐧! 🛠️");
    }
  }
};
