const TelegramApi = require('node-telegram-bot-api')

const token = '1365948294:AAFwA5x1oOUaRBB8OgJi07cI02bICraIx9I'

const bot = new TelegramApi(token, {polling: true})

const chats = {}
let result
////

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}],
        ]
    })
}

const start = () => {

    // start of connect to mongodb database
    const { MongoClient } = require('mongodb');

    async function main() {
        const uri = "mongodb+srv://dbUser:J59MHPcQqVy9dM89@cluster0.f5ibd.mongodb.net/VegFruDai?retryWrites=true&w=majority";
        // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const client = new MongoClient(uri);

        try {
            await client.connect();
            await findOneListByName(client, "Картопля")
//            return bot.sendMessage(chatId, 'Hello from mongo' + chatId + msg.from.result) // result !!!!

        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }

    main().catch(console.error);

    async function findOneListByName (client, nameOfListing){
        result = await client.db("VegFruDai").collection("Products")  // result !!!!!!
            .findOne({Name: nameOfListing});
        if (result) {
//            console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
            console.log(result);
//            return result;
        } else {
            console.log(`No listing found with the name '${nameOfListing}'`);
        }
    }

    async function listDatabases(client){
        const databasesList = await client.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach(db => {
            console.log(`- ${db.name}`);
        })
    }
// end of connect to mongodb database


    bot.setMyCommands([
        {command: '/start', description: 'Початкове привітання!'},
        {command: '/info', description: 'Отримати інформацію про користувача'},
        {command: '/game', description: 'game'}
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start'){
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/763/a77/763a770d-0962-37fc-baec-121bafeca64d/9.webp')
            return bot.sendMessage(chatId,'Вітаємо')
        }
        if (text === '/info'){
            return bot.sendMessage(chatId,'Тебе звати+13 ' + msg.result)
            //    return bot.sendMessage(chatId, 'Databases: ')
        }
//

        if (text === '/game') {
            await bot.sendMessage(chatId, 'загадую цифру від 0 до 9')
            const randomNumber = Math.floor(Math.random() *10)
            chats[chatId] = randomNumber;
            return bot.sendMessage(chatId,'Відгадуй', gameOptions);
        }

        return bot.sendMessage(chatId, 'Я тебе не розумію')

    })

    bot.on('callback_query', msg => {
        console.log(msg)
    })

}

start()