//require('dotenv').config()

const {Telegraf} = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)
require('dotenv')
// const {Markup} = require('telegraf/markup')
/*   const {Markup} = require('telegraf')
 bot.start((ctx) =>
     ctx.reply('Вітаю ' + ctx.message.from.first_name + '! ' +
    'Оберіть, що Вам потрібно', Markup
     .keyboard([
        ['Молоко', 'Сметана'],
        ['Сир', 'Інше']
        ]).extractContents()
    )) */

const gameOption = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Текст кнопки', callback_data: 'sgfgfr'}]
        ]
    })
}

// bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.on ('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text === '/game') {

    }
})
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
console.log('Бот стартував')