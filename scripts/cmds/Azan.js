const axios = require("axios");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "azan",
    version: "2.0.0",
    author: "Mr.King",
    countDown: 0,
    role: 0,
    shortDescription: { en: "Auto Azan & Namaz Reminder" },
    category: "islam",
    guide: { en: "{pn} on | {pn} off" }
  },

  onStart: async function ({ api, event, args, threadsData, message }) {
    const { threadID, senderID } = event;
    const adminUID = "61588626550420"; // 👑 আপনার নির্দিষ্ট UID
    const threadData = await threadsData.get(threadID);
    const data = threadData.data || {};

    if (args[0] === "on") {
      if (senderID !== adminUID) return message.reply("𝐇𝐨𝐩 𝐛𝐜, 𝐊𝐧𝐨𝐰 𝐲𝐨𝐮𝐫 𝐩𝐥𝐚𝐜𝐞. 𝐎𝐧𝐥𝐲 𝐌𝐫. 𝐊𝐢𝐧𝐠 𝐜𝐚𝐧 𝐨𝐧 𝐭𝐡𝐢𝐬! 👑⚔️");
      data.azanStatus = true;
      await threadsData.set(threadID, { data });
      return message.reply("✅ 𝐀𝐳𝐚𝐧 & 𝐍𝐚𝐦𝐚𝐳 𝐑𝐞𝐦𝐢𝐧𝐝𝐞𝐫 𝐢𝐬 𝐧𝐨𝐰 𝐎𝐍! 🕌✨");
    }

    if (args[0] === "off") {
      if (senderID !== adminUID) return message.reply("𝐇𝐨𝐩 𝐛𝐜, 𝐊𝐧𝐨𝐰 𝐲𝐨𝐮𝐫 𝐩𝐥𝐚𝐜𝐞. 𝐎𝐧𝐥𝐲 𝐌𝐫. 𝐊𝐢𝐧𝐠 𝐜𝐚𝐧 𝐨𝐟𝐟 𝐭𝐡𝐢𝐬! 👑⚔️");
      data.azanStatus = false;
      await threadsData.set(threadID, { data });
      return message.reply("❌ 𝐀𝐳𝐚𝐧 𝐑𝐞𝐦𝐢𝐧𝐝𝐞𝐫 𝐢𝐬 𝐧𝐨𝐰 𝐎𝐅𝐅!");
    }

    // Manual Time Check
    try {
      const res = await axios.get("https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=2");
      const timings = res.data.data.timings;
      const msg = `🕌 𝐏𝐑𝐀𝐘𝐄𝐑 𝐓𝐈𝐌𝐄𝐒 (𝐃𝐇𝐀𝐊𝐀) 🕌\n──────────────────\n🌅 𝐅𝐚𝐣𝐫: ${timings.Fajr}\n☀️ 𝐃𝐡𝐮𝐡𝐫: ${timings.Dhuhr}\n🌇 𝐀𝐬𝐫: ${timings.Asr}\n🌆 𝐌𝐚𝐠𝐡𝐫𝐢𝐛: ${timings.Maghrib}\n🌃 𝐈𝐬𝐡𝐚: ${timings.Isha}\n──────────────────\n🕊️ 𝐒𝐞𝐧𝐭 𝐛𝐲 𝐌𝐢𝐬𝐬_𝐐𝐮𝐞𝐞𝐧 👑`;
      return message.reply(msg);
    } catch (e) {
      return message.reply("❌ 𝐂𝐨𝐮𝐥𝐝 𝐧𝐨𝐭 𝐟𝐞𝐭𝐜𝐡 𝐩𝐫𝐚𝐲𝐞𝐫 𝐭𝐢𝐦𝐞𝐬.");
    }
  },

  onLoad: async function ({ api }) {
    if (!global.azanInterval) {
      global.azanInterval = setInterval(async () => {
        const currentTime = moment.tz("Asia/Dhaka").format("HH:mm");
        
        try {
          const res = await axios.get("https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=2");
          const timings = res.data.data.timings;
          
          const prayerNames = {
            Fajr: "𝐅𝐚𝐣𝐫 (ফজর)",
            Dhuhr: "𝐃𝐡𝐮𝐡𝐫 (যোহর)",
            Asr: "𝐀𝐬𝐫 (আসর)",
            Maghrib: "𝐌𝐚𝐠𝐡𝐫𝐢𝐛 (মাগরিব)",
            Isha: "𝐈𝐬𝐡𝐚 (এশা)"
          };

          for (const [key, value] of Object.entries(prayerNames)) {
            if (timings[key] === currentTime) {
              const allThreads = await api.getThreadList(100, null, ["INBOX"]);
              const msg = `🔔 𝐀𝐙𝐀𝐍 𝐀𝐋𝐄𝐑𝐓! 🔔\n──────────────────\n🕌 𝐈𝐭'𝐬 𝐭𝐢𝐦𝐞 𝐟𝐨𝐫 ${value}!\n🕋 𝐒𝐨𝐛𝐚𝐢 𝐧𝐚𝐦𝐚𝐳 𝐩𝐨𝐫𝐭𝐞 𝐣𝐚𝐨, 𝐛𝐛𝐲𝐬!\n──────────────────\n"𝐍𝐚𝐦𝐚𝐳 𝐢𝐬 𝐛𝐞𝐭𝐭𝐞𝐫 𝐭𝐡𝐚𝐧 𝐬𝐥𝐞𝐞𝐩"\n👑 𝐀𝐝𝐦𝐢𝐧: 𝐌𝐫. 𝐊𝐢𝐧𝐠`;

              allThreads.forEach(async (thread) => {
                // Check if the thread has azanStatus ON (Optional logic)
                api.sendMessage(msg, thread.threadID);
              });
            }
          }
        } catch (err) {
          console.log("Azan Error: ", err);
        }
      }, 60000); // প্রতি ১ মিনিটে চেক করবে
    }
  }
};