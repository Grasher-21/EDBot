const Discord = require('discord.js');
const bot = new Discord.Client();

const userAdmin = '101462082016260096';

const botId = '779689202245828608';
const botLogChannelId = '779695530514448384';
const botCommand = '!';

const generalChannelId = '208640671924486144';

const messageQuote = `\`\`\``;

bot.login(process.env.BOT_TOKEN);

bot.on('ready', () => {
   bot.channels.cache.get(botLogChannelId).send('*is back online*');
});

bot.on('message', message => {
    // User administrator commands
    if (message.author.id == userAdmin && message.content.startsWith(botCommand)) {
        var command = message.content.split(' ');

        switch (command[0]) {
            case '!del': // Delete messages: command = !del X messages
            case '!delete':
                if (command.length == 3 && command[1] > 0 && (command[2] == 'message' || command[2] == 'messages')) {
                    var messagesToDelete = Number(command[1]) + 1;

                    async function deleteMessages() {
                        message.channel.bulkDelete(messagesToDelete).catch(console.error);
                    }

                    deleteMessages();
                }
                break;
        }
    }

     if (message.channel.id == generalChannelId && message.content.startsWith(botCommand) && message.author.id != botId) {
    //if (message.channel.id == botLogChannelId && message.content.startsWith(botCommand) && message.author.id != botId) {
        logCommandRequest(message);

        var command = message.content.split(' ');

        switch (command[0]) {
            case '!roll': // Generating a random number: command = !roll 5
                if (command.length == 2 && !isNaN(command[1]) && command[1] > 1) {
                    var rng = Math.floor(Math.random() * command[1]) + 1;
                    message.reply(`rolled number between 1 and ${command[1]} --> **${rng}**`);
                }
                else {
                    invalidCommand(message);
                }
                break;

            case '!help':
                help(message);
                break;

            case '!site':
            case '!sites':
                sites(message);
                break;

            case '!ship':
            case '!ships':
                ships(message);
                break;

            case '!guardian':
            case '!guardians':
                guardians(message);
                break;

            case '!thargoid':
            case '!thargoids':
                thargoids(message);
                break;

            case '!scanner':
            case '!scanners':
                scanners(message);
                break;

            case '!mining':
                mining(message);
                break;

            case '!mat':
            case '!mats':
            case '!material':
            case '!materials':
                materials(message);
                break;

            case '!bgs':
                bgs(message);
                break;

            default:
                invalidCommand(message);
                break;
        }
    }
});

function logCommandRequest(message) {
    var nickname = 'n/a';

    if (message.member.nickname) {
        nickname = message.member.nickname;
    }

    bot.channels.cache.get(botLogChannelId).send(`${messageQuote}
Requested command: ${message.content}
Channel: ${message.channel.name}
Nickname: ${nickname}
Username: ${message.author.username}
Tag: ${message.author.tag}
UserID: ${message.author.id}
${messageQuote}`);
}

function invalidCommand(message) {
    message.reply('invalid command! Type **!help** for the possible commands').then(msg => {
        msg.delete({ timeout: 5000 });
    });

    message.delete({ timeout: 5000 });
}

function help(message) {
    message.reply(`these are the available commands:
${messageQuote}
!sites
!ships
!guardians
!thargoids
!scanners
!mining
!materials
!bgs
${messageQuote}
`)};

function sites(message) {
    message.reply(`${messageQuote}cs
###### Ship List #####${messageQuote}<https://coriolis.io/>
${messageQuote}cs
###### Nearest station with ships, modules, commodities #####${messageQuote}<https://eddb.io/>
${messageQuote}cs
###### Full details for commodities, market prices #####${messageQuote}<https://inara.cz/galaxy-nearest/>
${messageQuote}cs
###### Laser mining hotspots & market data #####${messageQuote}<https://edtools.cc/miner?c=83&s=Hyades%20Sector%20DB-X%20d1-112&mp=700000>
${messageQuote}cs
###### Engineers #####${messageQuote}<https://inara.cz/galaxy-engineers/>
${messageQuote}cs
###### Materials for Engineering #####${messageQuote}<https://docs.google.com/spreadsheets/d/1BpkIh8lLR4TaOs_IP8C-jutvlmWaEN6A8Zj4m4xQn6c/>
${messageQuote}cs
###### Fleet Carriers #####${messageQuote}<https://cmdrs-toolbox.com/fleet-carrier-calculator/>`);
}

function ships(message) {
    message.reply(`${messageQuote}cs
###### Ship List #####${messageQuote}<https://coriolis.io/>`);
}

function guardians(message) {
    message.reply(`${messageQuote}cs
##### Guardian Modules Blueprint #####${messageQuote}COL 173 SECTOR GS-J B25-4     D 2     (Distance from Sol: 980 LY)
${messageQuote}cs
##### Guardian Starship Blueprint #####${messageQuote}HIP 36781     A 6 B     (Distance from Sol: 710 LY)
${messageQuote}cs
##### Guardian FSD Blueprint #####${messageQuote}HD 63154     B 3 A     (Distance from Sol: 1009 LY)
${messageQuote}cs
##### Guardian Obelisks #####${messageQuote}SYNUEFE NL-N C23-4     B 3     (RUINS 2)     (Distance from Sol: 871 LY)
${messageQuote}cs
##### Guardian Weapons & Materials #####${messageQuote}SYNUEFE EU-Q C21-10     A 3     (Distance from Sol: 790 LY)
${messageQuote}cs
##### Guardian Beacon #####${messageQuote}HIP 36823     (Distance from Sol: 667 LY)`);
}

function thargoids(message) {
    message.reply(`${messageQuote}cs
##### Thargoid Barnacles (Big Forest) #####${messageQuote}HYADES SECTOR AQ-Y D81     C 2     (Hotspot 3)     (Distance from Sol: 271 LY)
${messageQuote}cs
##### Thargoid Sensors #####${messageQuote}LTT 1935     6 A     (Distance from Sol: 71 LY)     (Sensor per relog: 1)
HIP 17403     A 4 A     (Distance from Sol: 411 LY)     (Sensor per relog: 3)
${messageQuote}cs
##### Thargoid Structure (Active) #####${messageQuote}PLEIADES SECTOR MC-V C2-0     1 A     (Distance from Sol: 383 LY)
${messageQuote}cs
##### Thargoid Combat #####${messageQuote}PLEIADES SECTOR HR-W D1-79     (Distance from Sol: 382 LY)     (Pleiades Nebula)
MUSCA DARK REGION PJ-P B6-1     (Distance from Sol: 520 LY)     (Musca Nebula)
HIP 23759     (Distance from Sol: 891 LY)     (Witch Head Nebula)
${messageQuote}cs
##### More Commands for Thargoids #####${messageQuote}!hearts`);
}

function scanners(message) {
    message.reply(`${messageQuote}
Ship > Data Link Scanner - Scan for specific items in space
Ship > Composition Scanner - Scan specific items in space
Ship > Discovery Scanner (DS) - "Honk Scanner" getting orbits and number of planets in a system
Ship > Full Spectrum System Scanner (FSS) - Scan Planets by frequency
Ship > Detailed Surface Scanner (DSS) - Detailed aspects and mapping of a Planet

SRV > Wave Scanner - PoI, Skimmers, Data Points, Materials, Cargo Canisters
SRV > Data Link Scanner - Scan for specific items on land
SRV > Composition Scanner - Scan for specific items on land
${messageQuote}`);
}

function mining(message) {
    message.reply(`${messageQuote}cs
##### Laser Mining (Painite) #####${messageQuote}
${messageQuote}----- Hardpoints -----
Mining Lasers (the more the merrier)

----- Optional Internal -----
Collector Limpet Controller (the more the merrier)
Prospector Limpet Controller (1 prospector only)
Refinery
Cargo Racks -> 100T+ cargo space

----- Quick Tips -----
1) use the prospect on asteroids before using the mining laser for better yield
2) go to eddb.io to find where to get the modules or write !sites for more${messageQuote}

${messageQuote}cs
##### Deep Core Mining (Void Opals or Low Temperature Diamonds) #####${messageQuote}
${messageQuote}----- Hardpoints -----
Seismic Charge Launcher
Sub-Surface Displacement Missile
Abrasion Blaster

----- Utility -----
Pulse Wave Analyser

----- Optional Internal -----
Collector Limpet Controller (3+ collector limpets active)
Prospector Limpet Controller (1 prospector only)
Refinery
Detailed Surface Scanner
Cargo Racks (100T+ cargo space)

----- Quick Tips -----
1) Use pulse wave analyser and look for really bright yellow asteroids
2) Use prospector limpet on the asteroid to see if it has a core
3) Use seismic charge launcher on the asteroid's fissures
4) Detonate the placed charges when the graphic is in the "good" range
5) When the asteroid breaks, use abrasion blaster on the surface to release the minerals from the asteroid
${messageQuote}`);
}

function materials(message) {
    message.reply(`Check this URL for more information <https://docs.google.com/spreadsheets/d/1BpkIh8lLR4TaOs_IP8C-jutvlmWaEN6A8Zj4m4xQn6c/edit#gid=1798481633>
${messageQuote}
----- Raw Materials (Biological Sites Only) -----
Yttrium        OUTOTZ LS-K D8-3     B 5 A     (Distance from Sol: 1714 LY)
Polonium       HIP 36601            C 1 A     (Distance from Sol: 1599 LY)
Ruthenium      HIP 36601            C 1 D     (Distance from Sol: 1599 LY)
Tellurium      HIP 36601            C 3 B     (Distance from Sol: 1599 LY)
Technetium     HIP 36601            C 5 A     (Distance from Sol: 1599 LY)
Antimony       OUTOTZ HD-J D9-3     B 8 D     (Distance from Sol: 1505 LY)

----- Encoded Materials -----
HIP 12099     1 B     (Jameson Crash Site)     (Distance from Sol: 217 LY)

PS: Dock your ship near the crash site. Place the SRV in the middle of the 4 beacons. Scan all beacons and relog to repeat.

----- Manufactured Materials (High Grade Emissions) -----
Materials                       State              Allegiance            
Pharmaceutical Isolators        Outbreak           Any                   
Military Grade Alloys           War                Any                   
Military Supercapacitors        War                Any                   
Improvised Components           Civil Unrest       Independent           
Proto Radiolic Alloys           Boom               Alliance              
Proto Heat Radiators            Boom               Alliance              
Imperial Shielding              Boom               Empire                
Core Dynamic Composites         Boom               Federation            

PS: Filter the galaxy map in order to show State and Allegiance systems

PS: For better grind, once you pick all materials in a HGE, close the game and reopen it. You will login near the HGE. Enter in supercruise and the closest signal should be the HGE signal. Make a 180 degree loop and go into the HGE. Pick the materials and repeat
${messageQuote}`);
}

function bgs(message) {
    message.reply(`background simulator is still under construction :D`);
}