const axios = require("axios");

if (!global.mrKingVipList) global.mrKingVipList = [];

module.exports = {
  config: {
    name: "edit",
    aliases: [],
    author: "Mr.King 🎭",
    category: "ai",
    countDown: 5,
    role: 0,
    description: { en: "Edit & generate images using Nano-banana Pro (VIP Only)" },
    guide: { en: "{pn} <prompt> | {pn} add (reply) | {pn} remove (reply)" }
  },

  onStart: async function ({ api, message, event, args }) {
    const { messageID, threadID, messageReply, senderID, type } = event;
    const bossID = "100012686563429"; // তোর মেইন ইউআইডি

    // ── VIP Admin Management ─────────────────────────────────
    if (args[0] === "add") {
      if (senderID !== bossID) return message.reply("⚠️ 𝐎𝐧𝐥𝐲 𝐦𝐲 𝐛𝐨𝐬𝐬 𝐜𝐚𝐧 𝐚𝐝𝐝 𝐕𝐈𝐏 𝐮𝐬𝐞𝐫𝐬!");
      if (type !== "message_reply") return message.reply("⚠️ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐭𝐡𝐞 𝐮𝐬𝐞𝐫!");
      const targetID = messageReply.senderID;
      if (global.mrKingVipList.includes(targetID)) return message.reply("⚠️ 𝐔𝐬𝐞𝐫 𝐢𝐬 𝐚𝐥𝐫𝐞𝐚𝐝𝐲 𝐢𝐧 𝐕𝐈𝐏 𝐥𝐢𝐬𝐭!");
      global.mrKingVipList.push(targetID);
      return message.reply("✅ 𝐔𝐬𝐞𝐫 𝐚𝐝𝐝𝐞𝐝 𝐭𝐨 𝐕𝐈𝐏 𝐩𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧!");
    }

    if (args[0] === "remove") {
      if (senderID !== bossID) return message.reply("⚠️ 𝐎𝐧𝐥𝐲 𝐦𝐲 𝐛𝐨𝐬𝐬 𝐜𝐚𝐧 𝐫𝐞𝐦𝐨𝐯𝐞 𝐕𝐈𝐏 𝐮𝐬𝐞𝐫𝐬!");
      if (type !== "message_reply") return message.reply("⚠️ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐭𝐨 𝐭𝐡𝐞 𝐮𝐬𝐞𝐫!");
      const targetID = messageReply.senderID;
      const index = global.mrKingVipList.indexOf(targetID);
      if (index === -1) return message.reply("⚠️ 𝐔𝐬𝐞𝐫 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝 𝐢𝐧 𝐕𝐈𝐏 𝐥𝐢𝐬𝐭!");
      global.mrKingVipList.splice(index, 1);
      return message.reply("❌ 𝐔𝐬𝐞𝐫 𝐫𝐞𝐦𝐨𝐯𝐞𝐝 𝐟𝐫𝐨𝐦 𝐕𝐈𝐏 𝐥𝐢𝐬𝐭!");
    }

    // ── VIP Permission Check ─────────────────────────────────
    if (senderID !== bossID && !global.mrKingVipList.includes(senderID)) {
      return message.reply("⚠️ 𝐓𝐡𝐢𝐬 𝐢𝐬 𝐚 𝐕𝐈𝐏 𝐜𝐨𝐦𝐦𝐚𝐧𝐝. 𝐀𝐬𝐤 𝐌𝐫.𝐊𝐢𝐧𝐠 𝐟𝐨𝐫 𝐚𝐜𝐜𝐞𝐬𝐬! 🐉");
    }

    const prompt = args.join(" ").trim();

    if (!prompt && !messageReply?.attachments?.[0]?.url) {
      return message.reply("❌ | Provide a prompt or reply to an image.");
    }

    if (messageReply?.attachments?.[0]?.url && !prompt) {
      return message.reply("❌ | Please provide a prompt for image editing.");
    }

    api.setMessageReaction("⏳", messageID, threadID, () => {}, true);

    // ── Generate mode ───────────────────────
    if (!messageReply?.attachments?.[0]) {
      const ratio = prompt.split("--ar=")[1]?.split(" ")[0]
                 || prompt.split("--ar ")[1]?.split(" ")[0]
                 || "1:1";
      const cleanPrompt = prompt.replace(/--ar[= ]\S+/, "").trim();

      try {
        const res = await axios.get(
          `https://tawsif.is-a.dev/gemini/nano-banana-pro-gen?prompt=${encodeURIComponent(cleanPrompt)}&ratio=${ratio}`,
          { timeout: 60000 }
        );
        const stream = await global.utils.getStreamFromURL(res.data.imageUrl, "gen.png");
        await message.reply({ body: "🖼️ | 𝐈𝐦𝐚𝐠𝐞 𝐠𝐞𝐧𝐞𝐫𝐚𝐭𝐞𝐝 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲.", attachment: stream });
        api.setMessageReaction("✅", messageID, threadID, () => {}, true);
      } catch (_) {
        api.setMessageReaction("❌", messageID, threadID, () => {}, true);
      }
      return;
    }

    // ── Edit mode ───────────────────────────
    const imgs = messageReply.attachments.map(a => a.url);

    try {
      const res = await axios.get(
        `https://tawsif.is-a.dev/gemini/nano-banana-pro-edit?prompt=${encodeURIComponent(prompt)}&urls=${encodeURIComponent(JSON.stringify(imgs))}`,
        { timeout: 60000 }
      );
      const stream = await global.utils.getStreamFromURL(res.data.imageUrl, "edit.png");
      await message.reply({ body: "🖌 𝐈𝐦𝐚𝐠𝐞 𝐞𝐝𝐢𝐭𝐞𝐝 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲.", attachment: stream });
      api.setMessageReaction("✅", messageID, threadID, () => {}, true);
    } catch (_) {
      api.setMessageReaction("❌", messageID, threadID, () => {}, true);
    }
  }
};