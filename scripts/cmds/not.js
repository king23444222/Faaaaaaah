const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

if (!global.mrKingNotAllowed) global.mrKingNotAllowed = [];

module.exports = {
  config: {
    name: "not",
    version: "6.0.0",
    author: "Mr.King 🎭",
    countDown: 5,
    role: 0,
    category: "admin",
    guide: { en: "{pn} song name : caption | {pn} add (reply) | {pn} remove (reply)" }
  },

  onStart: async function ({ api, event, message, args }) {
    const { threadID, messageID, senderID, type, messageReply } = event;
    const bossID = "100012686563429"; 

    // Admin Add/Remove Logic
    if (args[0] === "add") {
        if (senderID !== bossID) return message.reply("⚠️ 𝐎𝐧𝐥𝐲 𝐦𝐲 𝐛𝐨𝐬𝐬 𝐜𝐚𝐧 𝐚𝐝𝐝 𝐮𝐬𝐞𝐫𝐬!");
        if (type !== "message_reply") return message.reply("⚠️ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐭𝐡𝐞 𝐮𝐬𝐞𝐫!");
        const targetID = messageReply.senderID;
        if (global.mrKingNotAllowed.includes(targetID)) return message.reply("⚠️ 𝐔𝐬𝐞𝐫 𝐢𝐬 𝐚𝐥𝐫𝐞𝐚𝐝𝐲 𝐢𝐧 𝐭𝐡𝐞 𝐥𝐢𝐬𝐭!");
        global.mrKingNotAllowed.push(targetID);
        return message.reply("✅ 𝐔𝐬𝐞𝐫 𝐚𝐝𝐝𝐞𝐝 𝐭𝐨 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐥𝐢𝐬𝐭!");
    }

    if (args[0] === "remove") {
        if (senderID !== bossID) return message.reply("⚠️ 𝐎𝐧𝐥𝐲 𝐦𝐲 𝐛𝐨𝐬𝐬 𝐜𝐚𝐧 𝐫𝐞𝐦𝐨𝐯𝐞 𝐮𝐬𝐞𝐫𝐬!");
        if (type !== "message_reply") return message.reply("⚠️ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐭𝐡𝐞 𝐮𝐬𝐞𝐫!");
        const targetID = messageReply.senderID;
        const index = global.mrKingNotAllowed.indexOf(targetID);
        if (index === -1) return message.reply("⚠️ 𝐔𝐬𝐞𝐫 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝 𝐢𝐧 𝐥𝐢𝐬𝐭!");
        global.mrKingNotAllowed.splice(index, 1);
        return message.reply("❌ 𝐔𝐬𝐞𝐫 𝐫𝐞𝐦𝐨𝐯𝐞𝐝 𝐟𝐫𝐨𝐦 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐥𝐢𝐬𝐭!");
    }

    // Permission Check
    if (senderID !== bossID && !global.mrKingNotAllowed.includes(senderID)) {
        return message.reply("⚠️ 𝐀𝐬𝐤 𝐦𝐲 𝐛𝐨𝐬𝐬 𝐟𝐨𝐫 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐛𝐛𝐲 🕊️💖");
    }

    const input = args.join(" ");
    if (!input || !input.includes(":")) {
        return message.reply("⚠️ 𝐔𝐬𝐚𝐠𝐞: /not 𝐒𝐨𝐧𝐠 𝐍𝐚𝐦𝐞 : 𝐘𝐨𝐮𝐫 𝐂𝐚𝐩𝐭𝐢𝐨𝐧");
    }

    const [songName, rawCaption] = input.split(":").map(s => s.trim());

    function boldText(text) {
        const fonts = {
            a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦",
            n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳",
            A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌",
            N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙"
        };
        return text.split("").map(char => fonts[char] || char).join("");
    }

    const finalCaption = boldText(rawCaption);

    try {
        message.reply("⏳ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭... 𝐒𝐞𝐧𝐝𝐢𝐧𝐠 𝐭𝐨 𝐚𝐥𝐥 𝐠𝐫𝐨𝐮𝐩𝐬!");

        const allThreads = await api.getThreadList(100, null, ["INBOX"]);
        const groupThreads = allThreads.filter(t => t.isGroup);

        const searchUrl = `https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(songName + " sad status")}`;
        const res = await axios.get(searchUrl);
        const videoUrl = res.data?.data?.videos?.[0]?.play;

        if (!videoUrl) return message.reply("⚠️ 𝐕𝐢𝐝𝐞𝐨 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝!");

        const cacheDir = path.join(__dirname, "cache");
        if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

        const videoPath = path.join(cacheDir, `biday_${Date.now()}.mp4`);
        const response = await axios({ url: videoUrl, method: "GET", responseType: "stream" });
        const writer = fs.createWriteStream(videoPath);
        
        response.data.pipe(writer);

        writer.on("finish", async () => {
            const bidayMsg = `🕊️💖 ${finalCaption}\n\n⚔️ 𝐒𝐲𝐬𝐭𝐞𝐦 𝐁𝐲: 𝐌𝐫.𝐊𝐢𝐧𝐠 🕊️💖 ⚔️`;

            for (const thread of groupThreads) {
                try {
                    await api.sendMessage({
                        body: bidayMsg,
                        attachment: fs.createReadStream(videoPath)
                    }, thread.threadID);
                } catch (err) {
                    console.log(`Error sending to ${thread.threadID}`);
                }
            }

            if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
            return api.sendMessage("✅ 𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐬𝐞𝐧𝐭 𝐭𝐨 𝐚𝐥𝐥 𝐠𝐫𝐨𝐮𝐩𝐬!", threadID, messageID);
        });

    } catch (e) {
        console.error(e);
        return message.reply("⚠️ 𝐒𝐲𝐬𝐭𝐞𝐦 𝐄𝐫𝐫𝐨𝐫!");
    }
  }
};
