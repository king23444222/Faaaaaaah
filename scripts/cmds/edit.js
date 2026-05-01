const axios = require("axios");

if (!global.mrKingVipList) global.mrKingVipList = [];
if (!global.mrKingEditLimit) global.mrKingEditLimit = {};

module.exports = {
  config: {
    name: "edit",
    aliases: [],
    author: "Mr.King 🎭",
    category: "ai",
    countDown: 5,
    role: 0,
    description: { en: "Edit/Generate images with Economy & VIP System" },
    guide: { en: "{pn} <prompt> | {pn} buy | {pn} -add (reply)" }
  },

  onStart: async function ({ api, message, event, args, usersData }) {
    const { messageID, threadID, messageReply, senderID, type } = event;
    const bossID = "100012686563429";

    const menu = `┌─── ❖ ── ✦ ── ❖ ───┐
     𝐄𝐃𝐈𝐓 𝐆𝐄𝐍-𝐏𝐑𝐎
└─── ❖ ── ✦ ── ❖ ───┘
 ▧ 𝟏. 𝐒𝐢𝐧𝐠𝐥𝐞 𝐔𝐬𝐞 ⪼ 𝟏𝟎𝐤
 ▧ 𝟐. 𝐃𝐨𝐮𝐛𝐥𝐞 𝐔𝐬𝐞 ⪼ 𝟐𝟎𝐤
 ▧ 𝟑. 𝐓𝐫𝐢𝐩𝐥𝐞 𝐔𝐬𝐞 ⪼ 𝟑𝟎𝐤
 ▧ 𝟒. 𝐐𝐮𝐚𝐝 𝐔𝐬𝐞 ⪼ 𝟒𝟎𝐤
 ▧ 𝟓. 𝐅𝐮𝐥𝐥 𝐇𝐨𝐮𝐫 ⪼ 𝟐𝟎𝐦
└────────────────────┘
⚠️ 𝐔𝐬𝐚𝐠𝐞: /𝐞𝐝𝐢𝐭 𝐛𝐮𝐲 <𝐧𝐮𝐦𝐛𝐞𝐫>`;

    // ── Admin Management ─────────────────────────────────
    if (args[0] === "-add") {
      if (senderID !== bossID) return message.reply("⚠️ 𝐎𝐧𝐥𝐲 𝐦𝐲 𝐛𝐨𝐬𝐬 𝐜𝐚𝐧 𝐚𝐝𝐝 𝐕𝐈𝐏!");
      if (type !== "message_reply") return message.reply("⚠️ 𝐑𝐞𝐩𝐥𝐲 𝐭𝐨 𝐭𝐡𝐞 𝐮𝐬𝐞𝐫!");
      global.mrKingVipList.push(messageReply.senderID);
      return message.reply("✅ 𝐔𝐬𝐞𝐫 𝐚𝐝𝐝𝐞𝐝 𝐭𝐨 𝐕𝐈𝐏 𝐥𝐢𝐬𝐭!");
    }

    if (args[0] === "-remove") {
      if (senderID !== bossID) return message.reply("⚠️ 𝐎𝐧𝐥𝐲 𝐦𝐲 𝐛𝐨𝐬𝐬 𝐜𝐚𝐧 𝐫𝐞𝐦𝐨𝐯𝐞 𝐕𝐈𝐏!");
      const index = global.mrKingVipList.indexOf(messageReply.senderID);
      if (index > -1) global.mrKingVipList.splice(index, 1);
      return message.reply("❌ 𝐔𝐬𝐞𝐫 𝐫𝐞𝐦𝐨𝐯𝐞𝐝 𝐟𝐫𝐨𝐦 𝐕𝐈𝐏!");
    }

    // ── Economy Buy System ───────────────────────────────
    if (args[0] === "buy") {
      if (!args[1]) return message.reply(menu);
      
      const userData = await usersData.get(senderID);
      let balance = userData.money || 0;
      let cost = 0, amount = 0, isHour = false;

      switch (args[1]) {
        case "1": cost = 10000; amount = 1; break;
        case "2": cost = 20000; amount = 2; break;
        case "3": cost = 30000; amount = 3; break;
        case "4": cost = 40000; amount = 4; break;
        case "5": cost = 20000000; isHour = true; break;
        default: return message.reply("❌ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐨𝐩𝐭𝐢𝐨𝐧!");
      }

      if (balance < cost) return message.reply(`❌ 𝐈𝐧𝐬𝐮𝐟𝐟𝐢𝐜𝐢𝐞𝐧𝐭 𝐛𝐚𝐥𝐚𝐧𝐜𝐞! 𝐍𝐞𝐞𝐝 ${cost.toLocaleString()}৳`);

      await usersData.set(senderID, { money: balance - cost });

      if (isHour) {
        global.mrKingEditLimit[senderID] = "INFINITY";
        message.reply("✅ 𝟏 𝐇𝐨𝐮𝐫 𝐀𝐜𝐜𝐞𝐬𝐬 𝐁𝐨𝐮𝐠𝐡𝐭!");
        setTimeout(() => {
          delete global.mrKingEditLimit[senderID];
          api.sendMessage("⏰ 𝐘𝐨𝐮𝐫 𝟏 𝐡𝐨𝐮𝐫 𝐞𝐝𝐢𝐭 𝐦𝐞𝐲𝐚𝐝 𝐢𝐬 𝐨𝐯𝐞𝐫. 𝐁𝐮𝐲 𝐚𝐠𝐚𝐢𝐧!", senderID);
        }, 3600000);
      } else {
        global.mrKingEditLimit[senderID] = (global.mrKingEditLimit[senderID] || 0) + amount;
        message.reply(`✅ 𝐁𝐨𝐮𝐠𝐡𝐭 ${amount} 𝐞𝐝𝐢𝐭 𝐥𝐢𝐦𝐢𝐭!`);
      }
      return;
    }

    // ── Permission Check ─────────────────────────────────
    const isVip = senderID === bossID || global.mrKingVipList.includes(senderID);
    const hasLimit = global.mrKingEditLimit[senderID] === "INFINITY" || (global.mrKingEditLimit[senderID] > 0);

    if (!isVip && !hasLimit) {
      return message.reply("⚠️ 𝐀𝐜𝐜𝐞𝐬𝐬 𝐃𝐞𝐧𝐢𝐞𝐝! 𝐁𝐮𝐲 𝐥𝐢𝐦𝐢𝐭 𝐮𝐬𝐢𝐧𝐠 '/𝐞𝐝𝐢𝐭 𝐛𝐮𝐲'");
    }

    // ── Logic ────────────────────────────────────────────
    const prompt = args.join(" ").trim();
    if (!prompt && !messageReply?.attachments?.[0]?.url) return message.reply("❌ 𝐏𝐫𝐨𝐦𝐩𝐭 𝐦𝐢𝐬𝐬𝐢𝐧𝐠!");

    api.setMessageReaction("⏳", messageID, threadID, () => {}, true);

    try {
      let endpoint = "";
      let params = `?prompt=${encodeURIComponent(prompt)}`;

      if (!messageReply?.attachments?.[0]) {
        const ratio = prompt.split("--ar=")[1]?.split(" ")[0] || "1:1";
        endpoint = `nano-banana-pro-gen`;
        params += `&ratio=${ratio}`;
      } else {
        const imgs = messageReply.attachments.map(a => a.url);
        endpoint = `nano-banana-pro-edit`;
        params += `&urls=${encodeURIComponent(JSON.stringify(imgs))}`;
      }

      const res = await axios.get(`https://tawsif.is-a.dev/gemini/${endpoint}${params}`, { timeout: 60000 });
      const stream = await global.utils.getStreamFromURL(res.data.imageUrl, "result.png");
      
      await message.reply({ body: "✅ 𝐃𝐨𝐧𝐞!", attachment: stream });
      api.setMessageReaction("✅", messageID, threadID, () => {}, true);

      // Deduct limit if not VIP
      if (!isVip && global.mrKingEditLimit[senderID] !== "INFINITY") {
        global.mrKingEditLimit[senderID] -= 1;
      }

    } catch (e) {
      api.setMessageReaction("❌", messageID, threadID, () => {}, true);
      message.reply("❌ 𝐀𝐏𝐈 𝐄𝐫𝐫𝐨𝐫!");
    }
  }
};
