const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const configPath = path.join(__dirname, "cache", "btsVip.json");

function loadConfig() {
    if (!fs.existsSync(configPath)) {
        const initial = { status: true, vips: ["61588626550420"] };
        fs.outputJsonSync(configPath, initial);
        return initial;
    }
    return fs.readJsonSync(configPath);
}

module.exports = {
  config: {
    name: "bts",
    aliases: ["hijra", "nunuless"],
    version: "10.0.0",
    author: "Mr.King",
    countDown: 2,
    role: 0,
    category: "vip",
    guide: { en: "{pn} | {pn} on/off | {pn} add | {pn} remove | {pn} list" }
  },

  onStart: async function (args) {
    return this.handleBTS(args);
  },

  onChat: async function (args) {
    const { event } = args;
    if (!event.body) return;
    const body = event.body.toLowerCase();
    const triggers = ["bts", "hijra", "nunuless"];
    if (triggers.some(t => body.startsWith(t)) && !event.body.startsWith(global.GoatBot.config.prefix)) {
      return this.handleBTS(args);
    }
  },

  handleBTS: async function ({ api, event, message, args }) {
    const { threadID, messageID, senderID, messageReply } = event;
    const bossID = "61588626550420";
    let btsData = loadConfig();

    if (senderID === bossID) {
        if (args[0] === "on") {
            btsData.status = true;
            fs.writeJsonSync(configPath, btsData);
            return message.reply("✅ 𝐁𝐓𝐒 𝐒𝐲𝐬𝐭𝐞𝐦 𝐓𝐮𝐫𝐧𝐞𝐝 𝐎𝐍!");
        }
        if (args[0] === "off") {
            btsData.status = false;
            fs.writeJsonSync(configPath, btsData);
            return message.reply("❌ 𝐁𝐓𝐒 𝐒𝐲𝐬𝐭𝐞𝐦 𝐓𝐮𝐫𝐧𝐞𝐝 𝐎𝐅𝐅!");
        }
        if (args[0] === "add") {
            const id = messageReply ? messageReply.senderID : args[1];
            if (!id) return message.reply("⚠️ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐨𝐫 𝐠𝐢𝐯𝐞 𝐔𝐈𝐃!");
            if (!btsData.vips.includes(id)) btsData.vips.push(id);
            fs.writeJsonSync(configPath, btsData);
            return message.reply("✅ 𝐔𝐈𝐃 𝐀𝐝𝐝𝐞𝐝 𝐭𝐨 𝐕𝐈𝐏 𝐋𝐢𝐬𝐭!");
        }
        if (args[0] === "remove" && args[1] === "all") {
            btsData.vips = [bossID];
            fs.writeJsonSync(configPath, btsData);
            return message.reply("🧹 𝐀𝐥𝐥 𝐕𝐈𝐏𝐬 𝐑𝐞𝐦𝐨𝐯𝐞𝐝 𝐄𝐱𝐜𝐞𝐩𝐭 𝐁𝐨𝐬𝐬!");
        }
        if (args[0] === "remove") {
            const id = messageReply ? messageReply.senderID : args[1];
            btsData.vips = btsData.vips.filter(v => v !== id);
            fs.writeJsonSync(configPath, btsData);
            return message.reply("🗑️ 𝐕𝐈𝐏 𝐏𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐑𝐞𝐦𝐨𝐯𝐞𝐝!");
        }
    }

    if (!btsData.vips.includes(senderID)) {
        return message.reply("⚠️ 𝐀𝐬𝐤 𝐦𝐲 𝐛𝐨𝐬𝐬 𝐟𝐨𝐫 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐛𝐛𝐲 🕊️💖");
    }

    if (!btsData.status && senderID !== bossID) return;

    if (args[0] === "list") {
        let listMsg = "👑 𝐁𝐓𝐒 𝐕𝐈𝐏 𝐀𝐔𝐓𝐇𝐎𝐑𝐈𝐙𝐄𝐃 𝐋𝐈𝐒𝐓 👑\n\n";
        btsData.vips.forEach((id, index) => {
            listMsg += `${index + 1}. 🆔 ${id}\n`;
        });
        return message.reply(listMsg);
    }

    if (args[0] === "army") {
        const armyMsg = "🎭 𝐁𝐓𝐒 𝐌𝐄𝐌𝐁𝐄𝐑𝐒 𝐍𝐀𝐌𝐄 🎭\n\n" +
                        "✨ 𝐉𝐢𝐧 (진)\n" +
                        "✨ 𝐒𝐮𝐠𝐚 (슈가)\n" +
                        "✨ 𝐉-𝐇𝐨𝐩𝐞 (제이홉)\n" +
                        "✨ 𝐑𝐌 (알এম)\n" +
                        "✨ 𝐉𝐢𝐦𝐢𝐧 (지민)\n" +
                        "✨ 𝐕 (뷔)\n" +
                        "✨ 𝐉𝐮𝐧𝐠𝐤𝐨𝐨𝐤 (정국)\n\n" +
                        "💖 𝐓𝐚𝐰𝐡𝐢𝐝 𝐋𝐨𝐯𝐞𝐬 𝐘𝐨𝐮 🕊️";
        return message.reply(armyMsg);
    }

    try {
        api.setMessageReaction("✨", messageID, () => {}, true);
        let searchQuery = "BTS video status 4k";
        if (args.length > 0) searchQuery = `BTS member ${args.join(" ")}`;

        const res = await axios.get(`https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(searchQuery)}`);
        const video = res.data?.data?.videos?.[0];

        if (!video) return message.reply("⚠️ 𝐍𝐨 𝐯𝐢𝐝𝐞𝐨 𝐟𝐨𝐮𝐧𝐝!");

        const videoPath = path.join(__dirname, "cache", `bts_vip_${Date.now()}.mp4`);
        const stream = await axios({ method: 'get', url: video.play, responseType: 'stream' });
        const writer = fs.createWriteStream(videoPath);
        stream.data.pipe(writer);

        writer.on('finish', () => {
            api.sendMessage({
                body: `⚔️ 𝐁𝐓𝐒 𝐒𝐏𝐄𝐂𝐈𝐀𝐋 𝐕𝐈𝐃𝐄𝐎 ⚔️\n\n` +
                      `✨ 𝐄𝐧𝐣𝐨𝐲 𝐘𝐨𝐮𝐫 𝐅𝐚𝐯𝐨𝐫𝐢𝐭𝐞 𝐁𝐓𝐒 𝐌𝐨𝐦𝐞𝐧𝐭!\n` +
                      `💖 𝐓𝐚𝐰𝐡𝐢𝐝 𝐋𝐨𝐯𝐞𝐬 𝐘𝐨𝐮\n\n` +
                      `🦭 𝐒𝐲𝐬𝐭𝐞𝐦 𝐁𝐲: 𝐌𝐫.𝐊𝐢𝐧𝐠 🕊️💖`,
                attachment: fs.createReadStream(videoPath)
            }, threadID, () => fs.unlinkSync(videoPath), messageID);
        });
    } catch (e) {
        return message.reply("⚠️ 𝐒𝐞𝐫𝐯𝐞𝐫 𝐄𝐫𝐫𝐨𝐫!");
    }
  }
};