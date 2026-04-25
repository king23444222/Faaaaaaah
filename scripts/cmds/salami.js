module.exports = {
	config: {
		name: "salami",
		version: "1.5.0",
		author: "Mr.King",
		countDown: 5,
		role: 0,
		description: {
			en: "Get your special Eidi/Salami"
		},
		category: "economy",
		guide: {
			en: "{pn} | {pn} add <amount> | {pn} on | {pn} off"
		}
	},

	onStart: async function ({ args, message, event, usersData, threadsData }) {
		const { threadID, senderID } = event;
		const adminUID = "100012686563429"; // আপনার নির্দিষ্ট UID
		const { data } = await threadsData.get(threadID);

		// ইকোনমি কনভার্টার (k, m, b সাপোর্ট)
		const parseAmount = (str) => {
			if (!str) return 0;
			let amount = parseFloat(str);
			if (str.endsWith('k')) amount *= 1000;
			else if (str.endsWith('m')) amount *= 1000000;
			else if (str.endsWith('b')) amount *= 1000000000;
			return Math.floor(amount);
		};

		// অ্যাডমিন কন্ট্রোল পার্ট
		if (args[0] === "add" || args[0] === "on" || args[0] === "off") {
			if (senderID !== adminUID) return message.reply("❌ 𝐁𝐨𝐬𝐬, 𝐎𝐧𝐥𝐲 𝐌𝐫.𝐊𝐢𝐧𝐠 𝐜𝐚𝐧 𝐜𝐨𝐧𝐭𝐫𝐨𝐥 𝐭𝐡𝐢𝐬!");
			
			if (args[0] === "on") {
				data.salamiStatus = true;
				await threadsData.set(threadID, { data });
				return message.reply("✅ 𝐒𝐚𝐥𝐚𝐦𝐢 𝐄𝐯𝐞𝐧𝐭 𝐢𝐬 𝐧𝐨𝐰 𝐎𝐍! 🌙");
			}
			if (args[0] === "off") {
				data.salamiStatus = false;
				await threadsData.set(threadID, { data });
				return message.reply("❌ 𝐒𝐚𝐥𝐚𝐦𝐢 𝐄𝐯𝐞𝐧𝐭 𝐢𝐬 𝐧𝐨𝐰 𝐎𝐅𝐅!");
			}
			if (args[0] === "add") {
				const amount = parseAmount(args[1]);
				if (isNaN(amount) || amount <= 0) return message.reply("⚠️ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭 (𝐞𝐠: 𝟏𝐤, 𝟓𝟎𝟎)!");
				data.salamiAmount = amount;
				await threadsData.set(threadID, { data });
				return message.reply(`✅ 𝐒𝐚𝐥𝐚𝐦𝐢 𝐚𝐦𝐨𝐮𝐧𝐭 𝐬𝐞𝐭 𝐭𝐨: ${args[1].toUpperCase()} ($${amount.toLocaleString()})`);
			}
		}

		// ইউজার সালামি নেওয়ার পার্ট
		if (!data.salamiStatus) return message.reply("⌛ 𝐒𝐚𝐥𝐚𝐦𝐢 𝐄𝐯𝐞𝐧𝐭 𝐡𝐚𝐬𝐧'𝐭 𝐬𝐭𝐚𝐫𝐭𝐞𝐝 𝐲𝐞𝐭!");
		if (!data.salamiAmount) return message.reply("⚠️ 𝐀𝐝𝐦𝐢𝐧 𝐡𝐚𝐬𝐧'𝐭 𝐬𝐞𝐭 𝐭𝐡𝐞 𝐬𝐚𝐥𝐚𝐦𝐢 𝐚𝐦𝐨𝐮𝐧𝐭 𝐲𝐞𝐭!");

		if (!data.salamiClaimed) data.salamiClaimed = [];
		if (data.salamiClaimed.includes(senderID)) return message.reply("❌ 𝐘𝐨𝐮 𝐚𝐥𝐫𝐞𝐚𝐝𝐲 𝐭𝐨𝐨𝐤 𝐲𝐨𝐮𝐫 𝐬𝐚𝐥𝐚𝐦𝐢! 𝐃𝐨𝐧'𝐭 𝐛𝐞 𝐠𝐫𝐞𝐞𝐝𝐲 😉");

		const userMoney = await usersData.get(senderID, "money");
		await usersData.set(senderID, { money: userMoney + data.salamiAmount });
		
		data.salamiClaimed.push(senderID);
		await threadsData.set(threadID, { data });

		return message.reply(`🌙 𝐄𝐢𝐝 𝐌𝐮𝐛𝐚𝐫𝐚𝐤! ✨\n━━━━━━━━━━━━━━━━━━\n𝐘𝐨𝐮 𝐫𝐞𝐜𝐞𝐢𝐯𝐞𝐝: $${data.salamiAmount.toLocaleString()} 💰\n𝐄𝐧𝐣𝐨𝐲 𝐲𝐨𝐮𝐫 𝐬𝐚𝐥𝐚𝐦𝐢 𝐛𝐛𝐲! 🫰🏼\n━━━━━━━━━━━━━━━━━━\n👑 𝐀𝐝𝐦𝐢𝐧: 𝐌𝐫.𝐊𝐢𝐧𝐠`);
	}
};
