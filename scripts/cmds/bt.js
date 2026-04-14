const fs = require("fs-extra");
const path = __dirname + "/cache/bt_replies.json";

module.exports = {
  config: {
    name: "bt",
    version: "5.0.0",
    author: "Mr.King",
    countDown: 0,
    role: 0,
    shortDescription: { en: "Auto bold reply with Boss protection" },
    category: "fun",
    guide: { en: "{pn} add \"keyword\" : \"reply\"" }
  },

  onStart: async function ({ api, event, args, message }) {
    if (!fs.existsSync(path)) fs.writeJsonSync(path, {});
    let data = fs.readJsonSync(path);

    if (args[0] === "add") {
      const content = args.slice(1).join(" ");
      const regex = /"(.*?)"\s*:\s*(.*)/;
      const match = content.match(regex);

      if (match) {
        const key = match[1].toLowerCase().trim();
        const reply = match[2].trim();

        
        function makeBold(text) {
          const fonts = {
            a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦",
            n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳",
            A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌",
            N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐐"
          };
          return text.split('').map(char => fonts[char] || char).join('');
        }

        data[key] = makeBold(reply);
        fs.writeJsonSync(path, data, { spaces: 2 });
        return message.reply(`𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐚𝐝𝐝𝐞𝐝 𝐛𝐨𝐥𝐝 𝐫𝐞𝐩𝐥𝐲 𝐟𝐨𝐫: ${key} ⚔️👑`);
      } else {
        return message.reply(`𝐔𝐬𝐞: /𝐛𝐭 𝐚𝐝𝐝 "𝐭𝐞𝐱𝐭" : "𝐫𝐞𝐩𝐥𝐲" 🖋️`);
      }
    }
  },

  onChat: async function ({ api, event, message }) {
    if (!event.body) return;
    if (!fs.existsSync(path)) fs.writeJsonSync(path, {});
    
    const data = fs.readJsonSync(path);
    const { body, senderID, messageID } = event;
    const input = body.toLowerCase().trim();
    const myBoss = "61588626550420"; // 👑 Mr.King's UID

    // 🛡️ Boss Protection System
    if (body.includes(myBoss) || input.includes("tawhid") || input.includes("mr king")) {
      if (senderID !== myBoss) {
        api.setMessageReaction("😘", messageID, () => {}, true);
        return message.reply("Boss amay update Korte besto!");
      }
    }

    
    const autoReplies = {
      "allah hafiz": "𝐓𝐚 𝐭𝐚 𝐚𝐛𝐫 𝐚𝐬𝐢𝐨 𝐩𝐫𝐢𝐲𝐨 🕊️👋",
      "allah hafiz all": "𝐓𝐚 𝐭𝐚 𝐚𝐛𝐫 𝐚𝐬𝐢𝐨 𝐩𝐫𝐢𝐲𝐨 🕊️👋",
      "ki koro": "𝐀𝐢 𝐭𝐨 𝐭𝐮𝐦𝐚𝐫 𝐤𝐨𝐭𝐡𝐚 𝐯𝐚𝐛𝐢 𝐬𝐨𝐧𝐚 🌷💞",
      "tawhid": "𝐬𝐞 𝐚𝐦𝐚𝐲 𝐮𝐩𝐝𝐚𝐭𝐞 𝐤𝐨𝐫𝐭𝐞 𝐛𝐞𝐬𝐭𝐨 𝐚𝐬𝐞 🐒🥶",
      "হাসান": "𝐨𝐲 𝐭𝐨 𝐚𝐤𝐭𝐚 𝐥𝐮𝐜𝐜𝐡𝐚 𝐨𝐤𝐞 𝐝𝐚𝐤𝐢 𝐨 𝐧𝐚 𝐚𝐦𝐚র 𝐛𝐨𝐬𝐬 𝐓𝐚𝐰𝐡𝐢𝐝 𝐫𝐞 𝐝𝐚𝐤𝐨",
      "shahadat": "𝐞 𝐭𝐨 𝐧𝐢𝐣𝐞𝐫 𝐛𝐨𝐮 𝐫𝐞 𝐯𝐨𝐲 𝐩𝐚𝐢𝐭𝐞 𝐩𝐚𝐢𝐭𝐞 𝐝𝐢𝐧 𝐤𝐚𝐭𝐚𝐜𝐜𝐡𝐞", 
      "idk": "𝐣𝐚𝐧𝐢𝐬𝐡 𝐭𝐚 𝐤𝐢",
      "arafat": "𝐯𝐚𝐢 𝐚𝐦𝐫 𝐛𝐨𝐫𝐨 𝐥𝐨𝐤 𝐦𝐚𝐧𝐮𝐬𝐡 𝐬𝐨𝐛𝐚𝐲𝐤𝐞 𝐭𝐢𝐦𝐞 𝐝𝐢𝐭𝐞 𝐩𝐚𝐫𝐛𝐞 𝐧𝐚",
      "hi": "𝐇𝐞𝐥𝐥𝐨 𝐛𝐛𝐲, 𝐤𝐞𝐦𝐨𝐧 𝐚𝐜𝐡𝐨? ✨",
      "hello": "𝐇𝐢 𝐛𝐚𝐛𝐲, 𝐤𝐢 𝐤𝐨𝐫𝐨? 💞",
      "ki koros": "𝐓𝐨𝐦𝐚র 𝐤𝐨𝐭𝐡𝐚 𝐯𝐚𝐛𝐭𝐞𝐬𝐢 𝐛𝐨𝐬𝐬 👑",
      "love you": "𝐋𝐨𝐯𝐞 𝐲𝐨𝐮 𝐭𝐨𝐨 𝐣𝐚𝐚𝐧 💖🥀",
      "ki khabar": "𝐀𝐥𝐡𝐚𝐦𝐝𝐮𝐥𝐢𝐥𝐥𝐚𝐡 𝐛𝐡𝐚𝐥𝐨, 𝐭𝐨𝐦𝐚𝐫 𝐤𝐢 𝐨𝐛𝐨𝐬𝐭𝐡𝐚? 😊",
      "admin k": "𝐀𝐦𝐚𝐫 𝐛𝐨𝐬𝐬 𝐡𝐨𝐥𝐨 𝐌𝐫. 𝐊𝐢𝐧𝐠 ⚔️👑"
    };

    const allReplies = { ...autoReplies, ...data };

    if (allReplies[input]) {
      api.setMessageReaction("👑", messageID, () => {}, true);
      return message.reply(allReplies[input]);
    }
  }
};