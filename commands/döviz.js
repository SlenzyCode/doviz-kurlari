const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: "döviz",
    description: "Döviz bilgilerini gösterir.",
    type: 1 ,
    options: [],
    run:async(client,interaction) => {
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: "Döviz" })
        .setDescription("Aşağıdaki __butonlardan__ döviz bilgilerine bakarsınız.\n\nBu proje [@slenzycode](https://discord.com/users/1070795507082985524) tarafından geliştirilmiştir.")
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
        interaction.reply({
            embeds: [embed],
            components: [button]
        })
    }
}