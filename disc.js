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

const { DisTube, objectKeys } = require("distube")
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

    // const guild = await client.guilds.fetch('1027899438091468810')
    const guild = await client.guilds.fetch('899373576698888222')
    const members = await guild.members.fetch() // returns Collection
    // console.log(members.map(pao => {
    //     return pao.user.id

    // }))

    console.log(`Logged in as ${client.user.tag}!`);
    var id = '553640538209779713'
    let user = await client.users.fetch(id);
    user.send('Estou Online !!! ❤')
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

    if (!message.author.bot && message.content.startsWith("%%%%%%")) {
        // const guild = await client.guilds.fetch('1027899438091468810')
        const guild = await client.guilds.fetch('899373576698888222')
        const members = await guild.members.fetch() // returns Collection
        members.map(async pao => {
            let user = await client.users.fetch(pao.user.id);

            user.send(message.content).catch(e => {
                console.log('Não foi possivel enviar para:', pao.user.username)
            })
            console.log('enviado para :', pao.user.username)




            return pao.user.id

        })
    }






});
client.on('messageCreate', async message => {


    const prefix = "$"
    if (!message.author.bot || message.guild) {
        if (message.content.toString().startsWith(prefix)) {
            console.log(message.author.username, "#", message.author.discriminator, ":")
            console.log(message.content)
            const args = message.content.slice(prefix.length).trim().split(/ +/g)
            try {

                const select = args.shift().toLowerCase()
                const q = client.DisTube.getQueue(message.guild.id)
                if (select == "play") {
                    if (args.length >= 1 && message.member.voice.channel && message.channel) {

                        client.DisTube.play(message.member.voice.channel, args.join(" "), {
                            member: message.member,
                            textChannel: message.channel,
                            message
                        }).catch(r => message.reply("Não é possivel adicionar playlist brother <3 "))
                    } else { message.reply("para adicionar uma música, utilize: $play nome_da_música") }

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
              
                message.reply("Ocorreu algum erro: "+ error.toString())
            }
        }
    }
});
client.DisTube.on("playSong", async (queue, song) => {
    // console.log(Object.keys(song))
    try {
        const embed = new Discord.EmbedBuilder()
            .setTitle(song.name)
            .setImage(song.thumbnail)
        queue.textChannel.send({ embeds: [embed] });
        console.log("musica:", song.name)
        console.log("link: ", song.url)


    } catch (error) {
        console.log(error);

    }

    // console.log(queue.textChannel);
    // console.log(Object.keys(queue.textChannel.messages.channel))
    // console.log(Object.keys(song))

    // console.log(queue.textChannel.lastMessageId);
})
client.login('MTA3Njg1MTU5NDMyNDM0OTA0OQ.GsQku9.35flTrt6U70vFbz1EEy49jKQDN_2oJxKYUzYFQ');