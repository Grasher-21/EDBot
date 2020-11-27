const Discord = require('discord.js');
const bot = new Discord.Client();

const userAdmin = '101462082016260096';
const botId = '779689202245828608';

const eliteDangerousChannelId = '577875159596400660';
const botLogChannelId = '779695530514448384';

const botCommand = '!';
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

    if (message.channel.id == eliteDangerousChannelId && message.content.startsWith(botCommand) && message.author.id != botId) {
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

            case '!bgs':
                bgs(message);
                break;

            case '!bgs_advanced':
                bgsAdvanced(message);
                break;

            case '!engineer':
            case '!engineers':
                engineers(message);
                break;

            case '!exploration':
                exploration(message);
                break;

            case '!guardian':
            case '!guardians':
                guardians(message);
                break;

            case '!heart':
            case '!hearts':
                hearts(message);
                break;

            case '!mat':
            case '!mats':
            case '!material':
            case '!materials':
                materials(message);
                break;

            case '!mining':
                mining(message);
                break;

            case '!price':
            case '!prices':
                prices(message);
                break;

            case '!rank':
            case '!ranks':
                ranks(message);
                break;

            case '!scanner':
            case '!scanners':
                scanners(message);
                break;

            case '!ship':
            case '!ships':
                ships(message);
                break;

            case '!site':
            case '!sites':
                sites(message);
                break;

            case '!synthesis':
                synthesis(message);
                break;

            case '!thargoid':
            case '!thargoids':
                thargoids(message);
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
!bgs
!bgs_advanced
!engineers
!exploration
!guardians
!hearts
!materials
!mining
!prices
!ranks
!scanners
!ships
!sites
!synthesis
!thargoids
${messageQuote}
`)
};

function bgs(message) {
    message.reply(`${messageQuote}
Background Simulator is the algorithm behind all Factions. As a player, you can fight for a Faction and increase the Influence (INF) of a Faction in a system as well as your Reputation (REP) within that Faction. The maximum number of Factions in a system is 7, however it can have temporarily 8 if certain conditions are met.

INFLUENCE:
- When a Faction has 75% or more INF in a system, that Faction will expand to another system that is within 20 LY range.
- Expansion takes a total of 10 days to happen: 5 days of expansion preparation and other 5 days of on going expansion.
- When a Faction has 2.5% or less INF in a system, they will be removed from that system.
- All Factions have a Native system and they will never leave that system even if INF is 2.5% or less.
- The system where the Faction will expand to is the one that is closest, however there are ways of "forcing" a Faction to expand to a specific system within those 20 LY range.
- The Faction will expland to the closest system that has 6 or less Factions. If all systems within 20 LY range have 7 Factions, then it will invade against a non-native Faction in a system where that non-native is the lowest influence anywhere within 20 LY range. That target Faction must NOT be in a conflict or in cooldown from one (1 day).
- Conflicts will be decided in a "Best Of 7 Days". Whoever reaches 4 daily wins, stays in the system while the other one gets removed.
- When in a war, INF of both Factions are locked until the war ends, meaning missions will not have an impact on INF.
${messageQuote}`);

    message.reply(`${messageQuote}
- There are several system "states" that will make INF easier or harder to obtain for a Faction, for example:
--- When the Faction is in a state of "Public Holiday" in the system X, INF will increase faster per mission than the usual in that same system, however it will not happen in other systems where that Faction is present.
--- Same principle applies when the Faction is in a state of "Infrastructure Failure" in the system X. INF will be harder to increase, in fact, it will automatically drop 1% INF per day which can be countered by player's actions or by the RNG from the BGS for that Faction's actions.

REPUTATION:
- REP within a Faction depends on the Faction, meaning you will have the same REP level no matter the system you are at.
- When you have high REP within a Faction, better missions and better rewards will be available.
- REP will affect the cost of certain station services.
- When you have Hostile Reputation, if that Faction is controlling the station, you will not be able to dock and they will be aggressive. They will try to kill you.

SUPER POWERS:
- Alliance, Federation and Empire are Factions but in a "large scale".
- Federation and Empire have internal Ranks. When you reach maximum level of a Rank, you will be able to do a "special mission" which will make you advance in their Ranks. You will be able to buy some ships according to the Rank you have.${messageQuote}
https://lh4.googleusercontent.com/i_8EozvWpZ55ACzR_3OTKu4SQ5b3ge9lG1K4GrdexmKPy_Y3qjytwHfXc_-QqDV9FAe8xj-KjkKUEw=w1920-h937-rw`);
}

function bgsAdvanced(message) {
    message.reply(`${messageQuote}
- There is a cap of INF that is resetted every day at server tick +/- at 17:00 UTC.
- Various activities contribute to the total work done for a Faction in a system. If there is no opposition, you will get a positive influence increase at tick for that Faction.
- There are processes that convert these various activities into "points" at tick. These calculations make some attempt to balance the different activities against each other so that a fair comparison can be done between trade, cartography and bounty hunting as well as mission INF+ points.

All activities are subject to diminishing returns.
A "made up" example of this:
- The 1st commander does enough work to earn 4 points in bounty hunting.
- The 2nd commander does a similar amount but earns only 3 points by bounty hunting.
- The 3rd commander gets only 2 points for their effort.
- The 4th commander works just as hard but only improves the situation by 1 point.
- Any commanders beyond this earn only partial points for doing the same effort.
- All that bounty hunting, earns only 10 and a bit points towards the daily total.

- Another group of commanders earn their daily points by profitable trade into the station.
- The first earns 4 points, the 2nd gets 3. You know the drill by now. A total of 10 more BGS points earned by trade.
- A pair of dedicated mission runners do an insane amount of work for the day. 
- Their work is also broken down to 4 + 3 + 2 + 1 = 10 more points.

- A single commander drops several months worth of exploration data.
- This is way past the soft cap, so gets the 10 points plus an additional 2.
- Points for the day are 10 + 10 + 10 + 10 plus a bonus 2 for 42 in total. That is a good amount and should gain close to the maximum expected influence for the day.

Unfortunately, another group of commanders are also working for a lower Faction in the system.
1st commander does 4 points worth of bounty hunting.
Another 4 points of trade.
They worked hard at missions and did 9 points worth.
They dropped only a modest amount of cartographics, not enough to earn full points, so only get 2.

Their daily total after fairly casual effort by only a few commanders is 19. Their relatively modest effort has undone almost half of the 42. The Faction you worked for still increased their INF but in a modest way.
${messageQuote}`);
}

function engineers(message) {
    message.reply(`${messageQuote}
engineers is under construction :D
${messageQuote}`);
}

function exploration(message) {
    message.reply(`${messageQuote}
Exploration can be a good way to get some money and mark yourself in the Galaxy by discovering systems and planets that no one ever saw. Remember, this game has billions of systems and only **0.05%** of the Galaxy has been explored by commanders...

Recommended outfitting for Exploration:
----- Hardpoints -----
Beam Laser (one is enough and engineer it with lightweight)
Multi-Cannon (one is enough and engineer it with lightweight)

These are optional although strongly recommended. You may wanna try shooting something and it is known that some "Points of Interest" actually requires Beam Lasers or Multi-Cannons to interact with.

----- Core Internal -----
Frame Shift Drive (rating A, also engineer it with Increased FSD Range and Mass Manager experimental)

Use rating D on all other Core modules for less mass which improves your jump range

----- Optional Internal -----
Fuel Scoop (the best you can get)
Guardian Frame Shift Driver Booster (having the class 5H it will boost your jump range by 10.5 LY)
Shield Generator (optional)
Corrosion Resistant Cargo Rack or Cargo Rack (16T should be fine)
Auto Field-Maintenance Unit (the more the merrier)
Planetary Vehicle Hangar (don't forget to buy the SRV)
Repair Limpet Controller (one is enough)
Detailed Surface Scanner

PS: have some synthesis materials for limpets in case you need. More information in !synthesis

Credits you can get when you deliver Cartographics to stations by discovering planets:${messageQuote}
https://drive.google.com/file/d/1d1wNWVBJKBSO9ufvDxmcZ_D1gxcX4kX-/view?usp=sharing `);
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
##### Guardian Materials (Best Spot) #####${messageQuote}NGC 2451A SECTOR IR-W D1-77     AB 1 A     (Distance from Sol: 803 LY)
${messageQuote}cs
##### Guardian Weapons & Materials #####${messageQuote}SYNUEFE EU-Q C21-10     A 3     (Distance from Sol: 790 LY)
${messageQuote}cs
##### Guardian Beacon #####${messageQuote}HIP 36823     (Distance from Sol: 667 LY)`)
};

function hearts(message) {
    message.reply(`${messageQuote}
hearts is under construction :D
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

function mining(message) {
    message.reply(`${messageQuote}cs
##### Laser Mining (Painite) #####${messageQuote}
${messageQuote}----- Hardpoints -----
Mining Lasers (the more the merrier)

----- Optional Internal -----
Collector Limpet Controller (the more the merrier)
Prospector Limpet Controller (1 prospector only)
Refinery
Detailed Surface Scanner
Cargo Racks -> 100T+ cargo space

----- Quick Tips -----
1) Use the prospect on asteroids before using the mining laser for better yield
2) Go to http://eddb.io to find where to get the modules or write !sites${messageQuote}

${messageQuote}cs
##### Deep Core Mining (Void Opals or Low Temperature Diamonds) #####${messageQuote}
${messageQuote}----- Hardpoints -----
Seismic Charge Launcher
Sub-Surface Displacement Missile
Abrasion Blaster

----- Utility -----
Pulse Wave Analyser

----- Optional Internal -----
Collector Limpet Controller (the more the merrier)
Prospector Limpet Controller (1 prospector only)
Refinery
Detailed Surface Scanner
Cargo Racks (100T+ cargo space)

----- Quick Tips -----
1) Use pulse wave analyser and look for really bright yellow asteroids
2) Use prospector limpet on the asteroid to see if it has a core
3) Use seismic charge launcher on the asteroid's fissures
4) Go AWAY from the asteroid and detonate the charges when the graphic reaches the "good" range
5) When the asteroid breaks, use abrasion blaster on the surface to release the minerals from the asteroid
${messageQuote}
For mining prices check with !prices`);
}

function prices(message) {
    message.reply(`${messageQuote}cs
##### Mining Prices List #####${messageQuote}${messageQuote}Alexandrite                       2,171,870
Bauxite                              10,770
Benitoite                         1,493,210
Bertrandite                         187,300
Bromellite                          304,220
Coltan                               60,500
Cryolite                            121,200
Gallite                             117,960
Goslarite                            59,470
Grandidierite                     1,971,980
Indite                              112,850
Jadeite                             423,720
Lepidolite                            7,090
Lithium Hydroxide                    56,730
Low Temperature Diamonds          1,062,880
Methane Clathrate                    16,490
Methanol Monohydrate Crystals        24,770
Moissanite                          248,250
Monazite                          2,009,220
Musgravite                        1,985,210
Painite                             529,850
Pyrophyllite                        114,680
Rhodplumsite                      1,176,880
Rutile                               19,970
Serendibite                       1,726,290
Taaffeite                           520,770
Uraninite                            28,650
Void Opal                         1,352,140${messageQuote}`);
}

function ranks(message) {
    message.reply(`${messageQuote}cs
##### Ranks for: Combat, Exploration, Trade, CQC, Federal and Imperial #####
${messageQuote}<https://drive.google.com/file/d/1lmjWRO1JiiIsdleG7tmnUSzg5nEs244w>`);
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

function ships(message) {
    message.reply(`${messageQuote}cs
###### Ship List #####${messageQuote}<https://coriolis.io/>`);
}

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

function synthesis(message) {
    message.reply(`${messageQuote}
synthesis is under construction :D
${messageQuote}`);
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