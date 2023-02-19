//coxinha
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        1,
        512,
        32768,
        2,
        128,
        "Guilds",
        "GuildMessages",
        "GuildVoiceStates",
        "MessageContent",
        8,
        'DirectMessages'

    ]
});

const { DisTube } = require("distube")
client.DisTube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddListWhenCreatingQueue: false,
    emitAddSongWhenCreatingQueue: false,
    ytdlOptions: {
        quality: "highestaudio",
        format: "audioonly",
        liveBuffer: 60000,
    }
})
client.on('ready', async () => {
    const guild = client.guilds.cache.get('899373576698888222');
    const members = guild.members.cache;
    const userIds = members.map(member => member.user.id);
    console.log(userIds)
    

    // console.log(`Logged in as ${client.user.tag}!`);
    // var id = '398917790800805921'
    // let user = await client.users.fetch(id);
    // user.send('😍 OWW VEM CONHECER A CIDADE "MAGNUS RP" E AINDA GANHAR UMA 🛒"LAMBORGHINI HURACAN" DO VIP GRÁTIS...😉 TRAGA AMIGOS PARA CIDADE, E GANHE PRESENTES EXCLUSIVOS 🎉 https://discord.gg/3xetwB6Z')
    // console.log(user)


});

// client.on('messageUpdate', async interaction => {
//     console.log(interaction)
//     if (!interaction.author.bot) {
//         interaction.reply(interaction.content)
//     }
// });

client.on('ready', () => {
    console.log(`Logado como: ${client.user.tag}!`);
});
client.on('messageCreate', async message => {

    const prefix = "$"
    if (!message.author.bot || message.guild) {
        if (message.content.toString().startsWith(prefix)) {
            const args = message.content.slice(prefix.length).trim().split(/ +/g)
            try {

                const select = args.shift().toLowerCase()
                const q = client.DisTube.getQueue(message.guild.id)
                if (select == "play") {
                    try {
                        if (args.length >= 1) {

                            client.DisTube.play(message.member.voice.channel, args.join(" "), {
                                member: message.member,
                                textChannel: message.channel,
                                message
                            })
                        } else { message.reply("para adicionar uma música, utilize: $play nome_da_música") }

                    } catch (error) { message.reply("Playlists não são suportadas") } message.reply("musica iniciada")
                    return 0
                }
                if (select == "pause") {
                    q.pause()
                    message.reply("pausado")
                    return 0
                }
                if (select == "resume") {
                    q.resume()
                    message.reply("continuado")
                    return 0
                }
                if (select == "skip") {
                    q.skip()
                    message.reply("proxima musica...")
                    return 0
                }
                if (select == "stop") {
                    q.stop()
                    message.reply("parado")
                    return 0
                }
                message.reply(`
Comandos
${prefix}play link/nome - tocar música
${prefix}pause - parar
${prefix}skip - proxima
${prefix}resume - voltar a tocar
${prefix}stop - parar totalmente
`)
                return 0
            } catch (error) {
                console.log(error);
                message.reply("Ocorreu algum erro.")
            }
        }
    }
});
client.DisTube.on("playSong", async (queue, song) => {
    // console.log(Object.keys(song))
    try {
        const embed = new Discord.EmbedBuilder()
            .setTitle(song.name)
        queue.textChannel.send({ embeds: [embed] })

    } catch (error) {
        console.log(error);
    }

    // console.log(queue.textChannel);
    // console.log(Object.keys(queue.textChannel.messages.channel))
    // console.log(Object.keys(song))

    // console.log(queue.textChannel.lastMessageId);
})
client.login('MTA3NjYyMzA1NTg4OTExNzM0Nw.GUlkvn.3ZGfzUKbo7oaoZA6_7SEsEike6JOAVxSiTS1d8');