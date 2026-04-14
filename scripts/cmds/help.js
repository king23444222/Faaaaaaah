module.exports = {
  config: {
    name: "help",
    version: "1.0.0",
    author: "Mr. King",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Displays the list of available commands" },
    category: "system",
    guide: { en: "{pn} or {pn} <command name>" }
  },

  onStart: async function ({ api, event }) {
    const helpMessage = `╔══════════════╗
🔹 COMMAND LIST 🔹
╚══════════════╝

╭────────────⭓
│『 𝗨𝗧𝗜𝗟𝗜𝗧𝗬 』
│💠accept💠
╰────────⭓
╭────────────⭓
│『 𝗕𝗢𝗫 𝗖𝗛𝗔𝗧 』
│💠activemember💠
│💠adduser💠
│💠all💠
│💠antichangeinfobox💠
│💠onlyadminbox💠
╰────────⭓
╭────────────⭓
│『 𝗢𝗪𝗡𝗘𝗥 』
│💠addo💠
│💠file💠
╰────────⭓
╭────────────⭓
│『 𝗕𝗢𝗧 𝗠𝗔𝗡𝗔𝗚𝗘𝗠𝗘𝗡𝗧 』
│💠adminonly💠
│💠admins💠
╰────────⭓
╭────────────⭓
│『 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡 』
│💠admin💠
╰────────⭓
╭────────────⭓
│『 𝗜𝗠𝗔𝗚𝗘 』
│💠affect💠
╰────────⭓
╭────────────⭓
│『 𝗚𝗔𝗠𝗘𝗦 』
│💠akinator💠
╰────────⭓
╭────────────⭓
│『 𝗠𝗘𝗗𝗜𝗔 』
│💠album💠
│💠autodl💠
╰────────⭓
╭────────────⭓
│『 BOXCHAT 』
│💠antiout💠
╰────────⭓
╭────────────⭓
│『 𝗠𝗔𝗥𝗞𝗘𝗧 』
│💠apimarket💠
╰────────⭓
╭────────────⭓
│『 BOX CHAT 』
│💠autosetname💠
│💠badwords💠
│💠ban💠
│💠boxinfo💠
│💠busy💠
│💠count💠
│💠filteruser💠
│💠gay💠
│💠kick💠
│💠refresh💠
│💠rules💠
│💠sendnoti💠
│💠setname💠
│💠unsend💠
│💠warn💠
╰────────⭓
╭────────────⭓
│『 NO PREFIX 』
│💠audio💠
│💠fuck you💠
│💠noprefix💠
╰────────⭓
╭────────────⭓
│『 ADMIN 』
│💠autoseen💠
╰────────⭓
╭────────────⭓
│『 OWNER 』
│💠backupdata💠
│💠cmd💠
│💠eval💠
│💠event💠
│💠getfbstate💠
│💠hubble💠
│💠ignoreonlyad💠
│💠ignoreonlyadbox💠
│💠join💠
│💠jsontomongodb💠
│💠jsontosqlite💠
│💠loadconfig💠
│💠out💠
│💠setavt💠
│💠setlang💠
│💠setrankup💠
│💠thread💠
│💠update💠
│💠user💠
│💠whitelist💠
│💠whitelistthread💠
╰────────⭓
╭────────────⭓
│『 ECONOMY 』
│💠bal💠
│💠balance💠
│💠set💠
│💠top💠
│💠work💠
╰────────⭓
╭────────────⭓
│『 FUN 』
│💠ball💠
│💠beauty💠
│💠bol💠
│💠choose💠
│💠drip💠
│💠emojimix💠
│💠fight💠
│💠jail💠
│💠joke💠
│💠mark💠
│💠pickupline💠
│💠rip💠
│💠rps💠
│💠toilet💠
│💠train💠
│💠trump💠
│💠wholesome💠
│💠wishcard💠
│💠xl💠
╰────────⭓
╭────────────⭓
│『 TALK 』
│💠bby💠
╰────────⭓
╭────────────⭓
│『 MEME 』
│💠buttslap💠
│💠clown💠
│💠cry💠
│💠wanted💠
╰────────⭓
╭────────────⭓
│『 CONTACTS ADMIN 』
│💠callad💠
╰────────⭓
╭────────────⭓
│『 𝗕𝗢𝗫 』
│💠clear💠
╰────────⭓
╭────────────⭓
│『 OTHER 』
│💠coinflip💠
╰────────⭓
╭────────────⭓
│『 USER 』
│💠coverphoto💠
╰────────⭓
╭────────────⭓
│『 GAME 』
│💠daily💠
│💠guessnumber💠
│💠quiz💠
│💠ttt💠
│💠qz ramadan 💠
╰────────⭓
╭────────────⭓
│『 DATE-SYSTEM 』
│💠time💠
╰────────⭓
╭────────────⭓
│『 WIKI 』
│💠emojimean💠
╰────────⭓
╭────────────⭓
│『 FUN 』
│💠gf💠
│💠hug💠
╰────────⭓
╭────────────⭓
│『 MEDIA 』
│💠anime💠
│💠say💠
│💠say3💠
│💠sing💠
│💠song💠
╰────────⭓
╭────────────⭓
│『 FUNNY 』
│💠meme💠
╰────────⭓
╭────────────⭓
│『 AI 』
│💠midjourney💠
╰────────⭓
╭────────────⭓
│『 ADMIN 』
│💠owner💠
╰────────⭓
╭────────────⭓
│『 LOVE 』
│💠pair💠
│💠pair2💠
│💠pair3💠
│💠ship💠
│💠us💠
╰────────⭓
╭────────────⭓
│『 CONFIG 』
│💠prefix💠
│💠setalias💠
╰────────⭓
╭────────────⭓
│『 SEARCH 』
│💠qr💠
╰────────⭓
╭────────────⭓
│『 OTHER 』
│💠question💠
╰────────⭓
╭────────────⭓
│『 OWNER 』
│💠restart💠
╰────────⭓
╭────────────⭓
│『 CUSTOM 』
│💠setleave💠
│💠setwelcome💠
│💠shortcut💠
╰────────⭓
╭────────────⭓
│『 UTILITY 』
│💠shell💠
│💠translate💠
╰────────⭓
╭────────────⭓
│『 COMMAND 』
│💠snippet💠
╰────────⭓
╭────────────⭓
│『 TEXTPRO 』
│💠space💠
╰────────⭓
╭────────────⭓
│『 SOPHIA 』
│💠spam💠
╰────────⭓
╭────────────⭓
│『 𝗚𝗥𝗢𝗨𝗣 𝗠𝗔𝗡𝗔𝗚𝗘𝗠𝗘𝗡𝗧 』
│💠spamkick💠
╰────────⭓
╭────────────⭓
│『 SYSTEM 』
│💠autoDelete💠
│💠system💠
│💠uptime💠
╰────────⭓
╭────────────⭓
│『 TAG 』
│💠tag💠
╰────────⭓
╭────────────⭓
│『 GAME 』
│💠slot💠
│💠slot2💠
│💠duck💠
╰────────⭓
╭────────────⭓
│『 ARAFAT 』
│💠pen💠
╰────────⭓
𝗖𝘂𝗿𝗿𝗲𝗻𝘁𝗹𝘆, 𝘁𝗵𝗲 𝗯𝗼𝘁 𝗵𝗮𝘀 these 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝘁𝗵𝗮𝘁 𝗰𝗮𝗻 𝗯𝗲 𝘂𝘀𝗲𝗱

𝗧𝘆𝗽𝗲 /𝗵𝗲𝗹𝗽 𝗰𝗺𝗱𝗡𝗮𝗺𝗲 𝘁𝗼 𝘃𝗶𝗲𝘄 𝘁𝗵𝗲 𝗱𝗲𝘁𝗮𝗶𝗹𝘀 𝗼𝗳 𝘁𝗵𝗮𝘁 𝗰𝗼𝗺𝗺𝗮𝗻𝗱

🫧𝘽𝙊𝙏 𝙉𝘼𝙈𝙀🫧: 『 MISS QUEEN 👑』☁️🫧
🔹 𝘽𝙊𝙏 𝙊𝙒𝙉𝙀𝙍 🔹
 	 					
~𝙉𝘼𝙈𝙀:✰ 'Mr.King ' ✰
~𝙁𝘽: Tawhid islam　🐉

𝗠𝗮𝗱𝗲 𝗯𝘆 𝗠𝗿. 𝗞𝗶𝗻𝗴`;

    return api.sendMessage(helpMessage, event.threadID, event.messageID);
  }
};
