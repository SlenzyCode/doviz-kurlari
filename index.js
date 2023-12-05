const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder, AuditLogEvent } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs")

const client = new Client({
    intents: Object.values(Discord.IntentsBitField.Flags),
    partials: Object.values(Partials),
});

const PARTIALS = Object.values(Partials);
const db = require("croxydb");
const config = require("./config.json");
const chalk = require("chalk");

global.client = client;
client.commands = (global.commands = []);
const { readdirSync } = require("fs");
const interactionCreate = require("./events/interactionCreate");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: false,
        type: 1
    });
    console.log(chalk.red`[COMMAND]` + ` ${props.name} komutu yüklendi.`)
});

readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(chalk.blue`[EVENT]` + ` ${name} eventi yüklendi.`)
});


client.login(config.bot.token)

process.on("unhandledRejection", (reason, p) => {
    console.log(chalk.blue(`${reason} ${p}`));
})

process.on("unhandledRejection", async (error) => {
    return console.log(chalk.red(`Bir hata oluştu!\n\n${error}`));
});

client.on("interactionCreate", async (interaction) => {
    const datas = await fetch("https://slenzy.metehanstudio.xyz/api/doviz?api_key=freekey")
    const data = await datas.json();
    if(interaction.customId === "geridön" + interaction.user.id) {
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: "Döviz" })
        .setDescription("Aşağıdaki __butonlardan__ döviz bilgilerine bakarsınız.")
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Dolar")
            .setEmoji("💵")
            .setStyle(ButtonStyle.Secondary)
            .setCustomId("dolar" + interaction.user.id),
            new ButtonBuilder()
            .setLabel("Euro")
            .setEmoji("💶")
            .setStyle(ButtonStyle.Secondary)
            .setCustomId("euro" + interaction.user.id),
            new ButtonBuilder()
            .setLabel("Sterlin")
            .setEmoji("💴")
            .setStyle(ButtonStyle.Secondary)
            .setCustomId("sterlin" + interaction.user.id),
            new ButtonBuilder()
            .setLabel("Kanada Dolar")
            .setEmoji("💰")
            .setStyle(ButtonStyle.Secondary)
            .setCustomId("kanada_dolar" + interaction.user.id),
            new ButtonBuilder()
            .setLabel("Mesajı Sil")
            .setEmoji("🗑️")
            .setStyle(ButtonStyle.Danger)
            .setCustomId("mesajsil" + interaction.user.id),
        )
        interaction.update({
            embeds: [embed],
            components: [button]
        })
    } else if(interaction.customId === "dolar" + interaction.user.id) {
        let dolar = data.dolar;
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: "Dolar 💵" })
        .setDescription(`**Doların fiyatı: ${dolar || "0"}**`)
        const geriDon = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Geri Dön")
            .setEmoji("⬅️")
            .setStyle(ButtonStyle.Secondary)
            .setCustomId("geridön" + interaction.user.id)
        )
        interaction.update({
            embeds: [embed],
            components: [geriDon]
        })
    } else if(interaction.customId === "euro" + interaction.user.id) {
        let euro = data.euro;
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: "Euro 💶" })
        .setDescription(`**Euro fiyatı: ${euro || "0"}**`)
        const geriDon = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Geri Dön")
            .setEmoji("⬅️")
            .setStyle(ButtonStyle.Secondary)
            .setCustomId("geridön" + interaction.user.id)
        )
        interaction.update({
            embeds: [embed],
            components: [geriDon]
        })
    } else if(interaction.customId === "sterlin" + interaction.user.id) {
        let sterlin = data.sterlin;
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: "Sterlin 💴" })
        .setDescription(`**Sterlin fiyatı: ${sterlin || "0"}**`)
        const geriDon = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Geri Dön")
            .setEmoji("⬅️")
            .setStyle(ButtonStyle.Secondary)
            .setCustomId("geridön" + interaction.user.id)
        )
        interaction.update({
            embeds: [embed],
            components: [geriDon]
        })
    } else if(interaction.customId === "kanada_dolar" + interaction.user.id) {
        let kanadaDolar = data.canada_dolar;
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: "Kanada Doları 💰" })
        .setDescription(`**Kanada Doları fiyatı: ${kanadaDolar || "0"}**`)
        const geriDon = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Geri Dön")
            .setEmoji("⬅️")
            .setStyle(ButtonStyle.Secondary)
            .setCustomId("geridön" + interaction.user.id)
        )
        interaction.update({
            embeds: [embed],
            components: [geriDon]
        })
    } else if(interaction.customId === "mesajsil" + interaction.user.id) {
        interaction.message.delete()
    }
}); 