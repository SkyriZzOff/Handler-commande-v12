const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const {TOKEN, PREFIX} = require("./config.js");
const { Client, Collection} = require("discord.js"),
colors = require('colors'),
supportGuildId = ('860566584953929739'),
supportGuildLogChannelId = ('861370579374178335');
client.commands = new Collection()
const { MessageEmbed } = require("discord.js")
const rawEmb = () => {
return new MessageEmbed()
.setColor(colors.info);
}
module.exports = { rawEmb }
client.on('guildCreate', async guild => {
let supGuild = await client.guilds.resolve(supportGuildId)
let channel = await supGuild.channels.resolve(supportGuildLogChannelId)
let emb = rawEmb().setTitle('Gravity Ways Vient de Rejoindre un serveur ').setColor(colors.success).setDescription(guild.name) .addField(`**Id du Serveur**` , (guild.id)) .addField(`**Nombre de Membres**` , (guild.memberCount))
channel.send(emb).catch(() => { })

})

client.login(TOKEN);

client.commands = new Discord.Collection();
fs.readdir("./Commandes/", (error, f) => {
  if(error) console.log(error);

  let commandes = f.filter(f => f.split(".").pop() === "js");
  if(commandes.length <= 0) return console.log("aucune commande trouvé dans le dossier");

  commandes.forEach((f) => {
    let commande = require(`./Commandes/${f}`);
    console.log(`${f} commande chargée !`);
    client.commands.set(commande.help.name, commande);

  });
});

fs.readdir("./Events/", (error, f) => {
  if(error) console.log(error);
  console.log(`${f.length} events en chargement`);

  f.forEach((f) => {
      const events = require(`./Events/${f}`);
      const event = f.split(".")[0];

    client.on(event, events.bind(null, client));
  });

});
client.snipes = new Map()
client.on('messageDelete', function(message, channel){

  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })

})
