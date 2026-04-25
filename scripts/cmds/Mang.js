const axios = require("axios");

module.exports = {
  config: {
    name: "mang",
    version: "2.5.0",
    author: "Mr.King",
    countDown: 2,
    role: 1, // Admin & Bot Admin only
    category: "fun",
    guide: {
      en: "{p}mang @mention or reply | {p}mang off",
      bn: "{p}mang @মেনশন অথবা রিপ্লাই দিন | বন্ধ করতে {p}mang off লিখুন"
    }
  },

  onStart: async function ({ api, event, args, usersData }) {
    const { threadID, messageID, senderID, messageReply, mentions } = event;
    const myID = "100012686563429"; // আপনার ইউআইডি

    // Permission Check
    const threadInfo = await api.getThreadInfo(threadID);
    const isGroupAdmin = threadInfo.adminIDs.some(admin => admin.id == senderID);
    const isBotAdmin = senderID == myID;

    if (!isGroupAdmin && !isBotAdmin) {
      return api.sendMessage("🚷 এই চরম কমান্ড শুধু অ্যাডমিনরাই ব্যবহার করতে পারবে!", threadID, messageID);
    }

    // Off System
    if (args[0] === "off") {
      if (global.mangInterval && global.mangInterval[threadID]) {
        clearInterval(global.mangInterval[threadID]);
        delete global.mangInterval[threadID];
        return api.sendMessage("✅ Ja tor e xoda sas. Tor aids hoy gese🥵!", threadID);
      }
      return api.sendMessage("⚠️ আগে তো শুরু কর ভাই!", threadID);
    }

    // Target Selection
    let targetID, targetName;
    if (messageReply) {
      targetID = messageReply.senderID;
      targetName = (await usersData.get(targetID)).name;
    } else if (Object.keys(mentions).length > 0) {
      targetID = Object.keys(mentions)[0];
      targetName = mentions[targetID].replace("@", "");
    } else {
      return api.sendMessage("🪶 কাকে গালি দিবি? মেনশন বা রিপ্লাই দে!", threadID, messageID);
    }

    // 40 Jogonno Galis
    const galis = [
      `${targetName}, এই খানকির পোলা তোর মারে চুদি! 💩🔥`,
      `${targetName}, তোর মারে জিগা তোর আসল আব্বা কেডা? 🔞😂`,
      `${targetName}, তোরে চুদি চাউর নাতি! 🤮💦`,
      `${targetName}, মাং মরাণীর ছেলে, তোর গুষ্টি চুদবো আজকে! 👙🥵`,
      `${targetName}, তোর মার ভোদায় কি মরিচ বাটা দিবো খানকির পোলা? 🌶️🍑`,
      `${targetName}, তোর বোনরে গিয়া বল Mr.King ডাকছে, বিছানায় রেডি থাকতে! 🌚💦`,
      `${targetName}, তোর চৌদ্দ গুষ্টির গুদে বাঁশ ঢুকিয়ে দিবো শয়তানের বাচ্চা! 🎋🔥`,
      `${targetName}, তোর মারে তো কাল রাতে রাস্তার কুত্তা দিয়ে চুদাইছি! 🐕🤣`,
      `${targetName}, খানকির পোলা, তোর ভোদায় কি কারেন্ট আছে নাকি রে? ⚡👅`,
      `${targetName}, তোর মার গুদ দিয়ে রকেট পাঠাবো মঙ্গলে! 🚀💩`,
      `${targetName}, তোর বাপের বিচি কি পচে গেছে নাকি রে বেজন্মা? 🥚💨`,
      `${targetName}, তোর বোন কি এখনো রাতে Mr.King এর লুঙ্গি ধরে টানে? 😴👑`,
      `${targetName}, তোর গুদ মারতে মারতে একদম ত ত ত বানাইয়া দিমু খানকির পোলা! 🥊💥`,
      `${targetName}, তোর মার ভোদায় কি এখন তালা লাগানো থাকে নাকি রে দালালের বাচ্চা? 🔒🔑`,
      `${targetName}, তোর গুষ্টিরে এক লাইনে খাড়া করায়ে সবডিকে একসাথে পুন্দাবো! 🚂🔥`,
      `${targetName}, নিজের মার লগে কাম সারিস আর এখানে এসে ভাব দেখাস? 💩💦`,
      `${targetName}, তোর পাছা তো এখন পাবলিক টয়লেট হয়ে গেছে রে টোকাই! 🚽🤡`,
      `${targetName}, তোর মারে চুদে গর্ত বানাইয়া ফেলছি, এখন ওখানে চাষ কর! 🚜🌾`,
      `${targetName}, তোর বোনরে জিগাইস কাল রাতে Mr.King এর সাথে কেমন ছিল? 🫦💅`,
      `${targetName}, তোর পাছায় বট গাছ ঢুকিয়ে দিবো Mr.King পাছায়! 🫦🫩🫩`,
      `${targetName}, শালা নিজের বোনকে নিজেই চুদে টোকাই! 💩🤣`,
      `${targetName}, সারাদিন মোবাইলে জুয়া খেলে রাতে নিজের বোনকে লাগাতে যাস খানকির পোলা! 💩😁`,
      `${targetName}, তোর গুষ্টির মুখে মুইতা দিমু আমি Mr.King! 👑💦`,
      `${targetName}, তোর বোন কি এখনো আমার লাইগা পাগল? 🌚💦`,
      `${targetName}, তোর গুদ ফেটে রক্ত বের না হওয়া পর্যন্ত থামবো না! 🩸🔪`,
      `${targetName}, তোর বংশের সবকটা মেয়েছেলেকে দিয়ে বেশ্যাবৃত্তি করাবো! 👙🔥`,
      `${targetName}, তোর পাছার চামড়া তুলে নুন মাখিয়ে দিবো! 🧂🥊`,
      `${targetName}, তোর মারে চুদতে চুদতে ল্যাংড়া বানায় দিমু দাড়া! 🦵🥊`,
      `${targetName}, এই হিজড়া তোর মার ভোদায় কি কারেন্ট নাই? ⚡🤮`,
      `${targetName}, তোর মারে আজকে কুত্তা দিয়া খাওয়াবো খানকির পোলা! 🐕🔥`,
      `${targetName}, তোর বোনের গুদ দিয়া রক্ত বের করমু আজকে! 🩸💦`,
      `${targetName}, তোর চৌদ্দ গুষ্টির গুদে বাঁশ দিমু আমি Mr.King! 🎋👑`,
      `${targetName}, তোর মারে আজকে উল্টা করে চুদমু শয়তানের নাতি! 🤸‍♂️💥`,
      `${targetName}, তোর বোনরে বলিস Mr.King এর প্যান্টের চেইন খোলা আছে! 🤐💦`,
      `${targetName}, তুই কি মানুষের বাচ্চা নাকি ড্রেন থেকে কুড়ানো ময়লা? 🗑️🤢`,
      `${targetName}, তোর মার গুদে কি এখন ঘাস গজাইছে নাকি রে আবাল? 🌿😂`,
      `${targetName}, তোর গুষ্টির মারে এক সাথে চুদি দাড়া! 👨‍👩‍👧‍👦🔥`,
      `${targetName}, তোর বোনের পাছায় আজকে লাথি মারমু খানকির পোলা! 🦶🍑`,
      `${targetName}, তোর মারে চুদতে চুদতে বাংলাদেশ পার করায় দিমু! 🇧🇩✈️`,
      `${targetName}, তোর গুদ মারা শেষ হলে তোর বাপের বিচি কাটমু! ✂️🥚`, 
      `${targetName}, তোর মারে আজকে কুত্তা দিয়া খাওয়াবো খানকির পোলা! 🐕🔥`,
      `${targetName}, তোর বোনের গুদ দিয়া রক্ত বের করমু আজকে! 🩸💦`,
      `${targetName}, তোর চৌদ্দ গুষ্টির গুদে বাঁশ দিমু আমি Mr.King! 🎋👑`,
      `${targetName}, তোর মারে আজকে উল্টা করে চুদমু শয়তানের নাতি! 🤸‍♂️💥`,
      `${targetName}, তোর বোনরে বলিস Mr.King এর প্যান্টের চেইন খোলা আছে! 🤐💦`,
      `${targetName}, তুই কি মানুষের বাচ্চা নাকি ড্রেন থেকে কুড়ানো ময়লা? 🗑️🤢`,
      `${targetName}, তোর মার গুদে কি এখন ঘাস গজাইছে নাকি রে আবাল? 🌿😂`,
      `${targetName}, তোর গুষ্টির মারে এক সাথে চুদি দাড়া! 👨‍👩‍👧‍👦🔥`,
      `${targetName}, তোর বোনের পাছায় আজকে লাথি মারমু খানকির পোলা! 🦶🍑`,
      `${targetName}, তোর মারে চুদতে চুদতে বাংলাদেশ পার করায় দিমু! 🇧🇩✈️`,
      `${targetName}, তোর গুদ মারা শেষ হলে তোর বাপের বিচি কাটমু! ✂️🥚`,
      `${targetName}, তোর মারে আজকে ফ্রিতে লাইনে খাড়া করামু বেশ্যা মাগী! 💃🤮`,
      `${targetName}, তোর গুষ্টির সবডিকে একসাথে পুন্দায়া লাল কইরা দিমু! 🔴🔥`,
      `${targetName}, তোর মারে জিগা কাল রাতে কার লুঙ্গি রাইখা আইছে? 🩳🤣`,
      `${targetName}, তোর বোনরে বলিস আগামী মাসে ওর বাচ্চা হওয়ার চান্স আছে! 🤰💦`,
      `${targetName}, তোর পাছার ফুটা দিয়া আজকে রকেট ঢুকাবো শালার পুত! 🚀💥`,
      `${targetName}, তোর মারে চুদতে চুদতে একদম তক্তা বানায় দিমু! 🪵🥊`,
      `${targetName}, তোর গুষ্টির গুদে বিষাক্ত সাপের কামড় দেওয়ামু! 🐍🔥`,
      `${targetName}, তোর মারে চুদতে চুদতে একদম ফানা ফানা কইরা দিমু! 💥💦`,
      `${targetName}, তোর মতন জন্মগত ভুলরে চুদতেও রুচিতে বাধে রে দালালের নাতি! 🤮🚮`
    ];

    api.sendMessage("🔥 তোরে আজক এক্সোদসি...", threadID);

    if (!global.mangInterval) global.mangInterval = {};
    if (global.mangInterval[threadID]) clearInterval(global.mangInterval[threadID]);

    let index = 0;
    global.mangInterval[threadID] = setInterval(() => {
      if (index < galis.length) {
        api.sendMessage({
          body: galis[index],
          mentions: [{ tag: targetName, id: targetID }]
        }, threadID);
        index++;
      } else {
        clearInterval(global.mangInterval[threadID]);
        delete global.mangInterval[threadID];
        api.sendMessage(`🏁 জা তরে খোদা শেষ তোর AIDS হয়ে গেছে 👙👙🥵\n\n• 𝐌𝐫.𝐊𝐢𝐧𝐠 𝐒𝐲𝐬𝐭𝐞𝐦🐉`, threadID);
      }
    }, 3000); // ৩ সেকেন্ড পরপর গালি
  }
};