const Discord = require('discord.js');
const bot = new Discord.Client();

const userAdmin = '101462082016260096';
const botId = '779689202245828608';

const eliteDangerousChannelIdRandomStuff = '577875159596400660';
const eliteDangerousChannelIdChillGroup = '789535469523828756';
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

    if ((message.channel.id == eliteDangerousChannelIdRandomStuff && message.content.startsWith(botCommand) && message.author.id != botId) ||
        (message.channel.id == eliteDangerousChannelIdChillGroup && message.content.startsWith(botCommand) && message.author.id != botId)) {
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

            case '!combat':
                combat(message);
                break;

            case '!activities':
            case '!credits':
                credits(message);
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

            case '!influence':
                influence(message);
                break;

            case '!mat':
            case '!mats':
            case '!material':
            case '!materials':
                materials(message);
                break;

            case '!mineral':
            case '!minerals':
                minerals(message);
                break;

            case '!mining':
                mining(message);
                break;

            case '!module':
            case '!modules':
                modules(message);
                break;

            case '!passenger':
            case '!passengers':
                passengers(message);
                break;

            case '!path':
            case '!paths':
                paths(message);
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

            case '!stationRepair':
            case '!stationsRepair':
                stationRepair(message);
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
!activities
!bgs
!combat
!credits
!engineers
!exploration
!guardians
!hearts
!influence
!materials
!minerals
!mining
!modules
!passengers
!paths
!ranks
!scanners
!ships
!sites
!stationRepair
!synthesis
!thargoids
${messageQuote}
`)
};

function bgs(message) {
    message.reply(`${messageQuote}
Background Simulator is the algorithm behind all Factions. As a player, you can fight for a Faction and increase the Influence (INF) of a Faction in a system as well as your Reputation (REP) within that Faction. The maximum number of Factions in a system is 7, however the system can have 8 Factions if certain conditions are met for a small period of time.

INFLUENCE:
- When a Faction has 75% or more INF in a system, that Faction will expand to another system that is within 20 LY range.
- Expansion takes a total of 10 days to happen: 5 days of expansion preparation and other 5 days of on going expansion.
- When a Faction has 2.5% or less INF in a system, they will be removed from that system.
- All Factions have a Native system and they will never leave that system even if INF is 2.5% or less.
- The system where the Faction will expand to is the one that is closest, however there are ways of "forcing" a Faction to expand to a specific system within those 20 LY range. 
- The Faction will expand to the closest system that has 6 or less Factions. If all systems within 20 LY range have 7 Factions, then it will invade against a non-native Faction in a system where that non-native is the lowest influence anywhere within 20 LY range. That target Faction must NOT be in a conflict or in cooldown from one (1 day).
- Conflicts will be decided in a "Best Of 7". Whoever reaches 4 daily wins, stays in the system while the other one gets removed.
- When in a war, INF of both Factions are locked until the war ends, meaning missions will not have an impact on INF.
- Cartographics will only help the Faction that controls the station and if that Faction is in a war, it won't help increasing INF for that Faction.
- Combat Bonds / Bounties will not help the Faction increase INF if it's in a war.
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
- Federation and Empire have internal Ranks. When you reach maximum level of a Rank, you will be able to do a "special mission" which will make you advance in their Ranks. You will be able to buy some ships according to the Rank you have.

You can see the Super Power ranks here: ${messageQuote}<https://drive.google.com/file/d/1lmjWRO1JiiIsdleG7tmnUSzg5nEs244w>
For more information on how INFLUENCE works -> **!influence**`);
}

function combat(message) {
    message.reply(`${messageQuote}
There are several different ways of combat:
- NPC human ships
- Thargoid interceptors

Combat gives you Credits for taking down the opponent (when they're marked as **Wanted**):
- Combat Bonds are obtained in Conflict Zones by shooting ships of a Faction **after picking a side** to fight for.
- Combat Bounties are obtained when killing **Wanted** ships in Navigation Beacons, Resource Extraction Sites, etc. Using a Kill Warrant Scanner will, sometimes, make "Clean Ships" be marked as wanted. Using the same scanner it may also increase the payout of a target.

For NPC human ships, one of the recommended ships is the Federal Corvette. It has a lot of hardpoints, utility and optional modules.
For Thargoid interceptos Krait MK II and Alliance Chieftain are considered the best ships${messageQuote}`);
}

function credits(message) {
    message.reply(`${messageQuote}
Elite Dangerous have several different activities. You can do Exploration, Trading / Hauling, Combat, Missions, Mining, etc.
To earn Credits, you will need to do one of those. The table below shows the average Credit per Hour per Activity.

Activity ---------------- Average Units Per Hour -------- Credits Earned Per Hour
Exploration               20 - 30 Systems                 15,000,000
Combat (Human Ships)      n/a                             n/a
Thargoid (Cyclops)        4 - 5 kills                     36,000,000
Thargoid (Basilisk)       4 kills                         96,000,000
Laser Mining              250 +/- Painite                 60,000,000
Laser Mining              550 +/- Platinum                162,000,000
Deep Core Mining          90 Minerals                     63,000,000
Passenger Missions        5 - 6 Trips back and forth      90,000,000
Trading / Hauling         Bauxite and Gallite between     80,000,000
                          systems Bandizel and Gauna${messageQuote}`)
}

function engineers(message) {
    message.reply(`${messageQuote}
After getting the best modules for your ship, what is left is the Engineering. This will boost the advantages of those modules and even add extra effects. However, it does have some downsides as well, for example: you may boost your shield generator to withstand more damage with the cost of using more power in return.

Almost all modules can be engineered, and from those, almost all of them can also have experimental effects. There's no "best engineering" for a module, it all depends on the purpose of what you want or need, for example: if you want exploration, you may want to engineer your modules as light-weight, if you want for combat, you may want to engineer them for integrity or other kind of upgrades, and so on.

There are in total 25 engineers (for now). Most of them are located within the bubble, although some are in the Colonia region, basically 20,000 LY away.
All Engineers have "meeting requirements" and "unlocking requirements".

Meeting Requirements:
- what you need to do to know about the existence of the Engineer

Unlocking Requirements:
- what you need to do for the Engineer, let's say some kind of mission or task, in order for you to be able to upgrade your modules

In other words: upgrade your module to level 5 (if possible for that module) and then add the Experimental Effect (if possible for that module).${messageQuote}`);

    message.reply(`${messageQuote}
----- Quick Tips -----
1) Almost all Engineers accept Cartographics Data to increase the access levels as well as selling materials
2) Upgrading your modules at the Engineer's site will increase the access levels, while upgrading remotely will not, so make sure to do remote upgrades only after you're already at full access
3) To do remote upgrades, you must pin the blueprint. Then you can access it when you're docked anywhere else. You can only pin ONE blueprint per Engineer, no matter what type of modules
4) You can't add an "Experimental Effect" to a module remotely. You have to travel the Engineer's site for that. There are multiple Engineers that can upgrade the same kind of module, however not all Engineers can upgrade those modules to the max level of 5. But for the Experimental Effects, any Engineer that works with that module will be able to add the Experimental Effect.
5) You do not need to have the module at the maxed level to add the Experimental Effect, you can do it right at beginning after you start Engineering a module. With this said, it's wise for you to see which Engineers work with the modules you want to upgrade and try to go to the Engineer that works with most of them. That way you will be able to add multiple Experimental Effects at the same Engineer even if they do not upgrade them to max level.${messageQuote}You can check the full Engineer list here <https://inara.cz/galaxy-engineers/> along with the systems they're located at, meeting and unlocking requirements`);
}

function exploration(message) {
    message.reply(`${messageQuote}
Exploration can be a good way to get some Credits and mark yourself in the Galaxy by discovering systems and planets that no one ever saw. Remember, this game has billions of systems and only **0.05%** of the Galaxy has been explored by commanders...

Recommended outfitting for Exploration:
----- Hardpoints -----
Beam Laser (one is enough and engineer it with lightweight)
Multi-Cannon (one is enough and engineer it with lightweight)

These are optional although strongly recommended. You may wanna try shooting something and it is known that some "Points of Interest" actually requires Beam Lasers or Multi-Cannons to interact with.

----- Core Internal -----
Frame Shift Drive (rating A, also engineer it with Increased FSD Range and Mass Manager experimental)

Use rating D on all other modules for less mass which improves your jump range and if possible engineer everything you can with lightweight to reduce mass

----- Optional Internal -----
Fuel Scoop (the best you can get)
Guardian Frame Shift Driver Booster (having the class 5H it will boost your jump range by 10.5 LY)
Shield Generator (optional although recommended)
Corrosion Resistant Cargo Rack or Cargo Rack (16T should be fine and if needed, you can synthesize limpets)
Auto Field-Maintenance Unit (the more the merrier)
Planetary Vehicle Hangar (don't forget to buy the SRV)
Repair Limpet Controller (one is enough)
Detailed Surface Scanner

PS: have some synthesis materials for limpets in case you need. More information in !synthesis${messageQuote}`);

    message.reply(`${messageQuote}
Cartographics is the data from what you have explored, scanned and mapped. Space stations pays quite well for this data.

If you die, all your data is lost, meaning all your Cartographics is lost. If you mapped a system or a planet for the first time and you died before delivering the Cartographics, your name won't be in the "First Discovered by" nor "First Mapped by". Only when you deliver the data it will display your name in such systems.

This link shows how much Credits you can earn just by delivering Cartographic data:${messageQuote}<https://drive.google.com/file/d/1d1wNWVBJKBSO9ufvDxmcZ_D1gxcX4kX->`);
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

function influence(message) {
    message.reply(`${messageQuote}
Influence (INF) measures the "power" of a Faction within a system. Players can make Factions increase or decrease their INF by doing missions, trading cargo, delivering cartographics and delivering combat bonds and bounties.

This is how INF works:
- There is a daily cap of how much INF a player can increase/decrease for a Faction. That cap is resetted at server tick +/- at 14:00 UTC (this time may change)
- Various activities contribute to the total work done for a Faction in a system. If there is no opposition, you will get a positive influence increase at server tick for that Faction.
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
- Their work is also broken down to 4 + 3 + 2 + 1 = 10 more points.${messageQuote}
`);

    message.reply(`${messageQuote}
- A single commander drops several months worth of exploration data.
- This is way past the soft cap, so gets the 10 points plus an additional 2.
- Points for the day are 10 + 10 + 10 + 10 plus a bonus 2 for 42 in total. That is a good amount and should gain close to the maximum expected influence for the day.

Unfortunately, another group of commanders are also working for another Faction in the system.
- 1st commander does 4 points worth of bounty hunting.
- Another 4 points of trade.
- They worked hard at missions and did 9 points worth.
- They dropped only a modest amount of cartographics, not enough to earn full points, so only get 2.
- Their daily total after fairly casual effort by only a few commanders is 19. Their relatively modest effort has undone almost half of the 42. The Faction you worked for still increased their INF but in a modest way.
${messageQuote}`);
}

function materials(message) {
    message.reply(`${messageQuote}
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

PS: Filter the galaxy map in order to show State and Allegiance systems${messageQuote}`);

    message.reply(`${messageQuote}
For better grind find a High Grade Emission (HGE) that has a timer above 10 minutes, the more the merrier. Once you pick all materials in that HGE, close the game (go to the Desktop) and open it again. Enter in supercruise and the closest signal should be the HGE signal. You might need to make a 180 degree turn to go into the HGE. Pick the materials and repeat the process${messageQuote}Check this URL for more information on Materials <https://docs.google.com/spreadsheets/d/1BpkIh8lLR4TaOs_IP8C-jutvlmWaEN6A8Zj4m4xQn6c>`);
}

function minerals(message) {
    message.reply(`${messageQuote}cs
##### Max price Fleet Carriers can purchase the Minerals #####${messageQuote}${messageQuote}Alexandrite                       2,171,870
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
Void Opal                         1,352,140${messageQuote}Stations can pay more than the Max price from Fleet Carriers but it's unsure when and which Station will do that. It all depends on the system state, security, etc.
Check <https://edtools.cc/miner?c=83&s=Sol&mp=1> to see the current price of a certain mineral or <https://inara.cz/galaxy-commodities/> and pick a mineral to see their price`);
}

function mining(message) {
    message.reply(`${messageQuote}cs
##### Laser Mining #####${messageQuote}${messageQuote}----- Hardpoints -----
Mining Lasers (the more the merrier)

----- Optional Internal -----
Collector Limpet Controller (the more the merrier)
Prospector Limpet Controller (1 prospector only)
Refinery
Detailed Surface Scanner
Cargo Racks -> 100T+ cargo space

----- Quick Tips -----
1) Use the prospect on asteroids before using the mining laser for better yield
2) One of the best spots for Laser Mining is in: HYADES SECTOR DB-X D1-112     2
${messageQuote}

${messageQuote}cs
##### Deep Core Mining #####${messageQuote}${messageQuote}----- Hardpoints -----
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
6) All ringed planets may be good for deep core mining${messageQuote}Go to <http://eddb.io> to find where to get the modules or write **!sites**
A lot of Credits can be made from mining. Type **!minerals** for more information`);
}

function modules(message) {
    message.reply(`Go to <http://eddb.io> to find where to get the modules`);
}

function passengers(message) {
    message.reply(`${messageQuote}
One of the best methods to earn Credits is Passenger Missions at Robigo. The best ship for this is a Python.

----- Core Internal -----
Frame Shift Drive (rating 5 A if possible, no need to engineer it for this)

----- Optional Internal -----
- 6D Business Class Passenger Cabin
- 6D Business Class Passenger Cabin
- 6D Business Class Passenger Cabin
- 5E Economy Class Passenger Cabin
- 5E Economy Class Passenger Cabin
- 4E Economy Class Passenger Cabin
- 3E Economy Class Passenger Cabin
- 3E Economy Class Passenger Cabin
- 2E Economy Class Passenger Cabin
- 1? Fit whatever you think it's best, Fuel Scoop, perhaps or Auto-Docking assist ... -.-'

----- System & Station -----
System: Robigo
Station: Robigo Mines

----- Quick Tips -----
1) Pick all Passenger Missions you can get that goes to "Sirius Atmosphere" tourist site.
2) Scan the beacon (it takes like 5 - 10 seconds)
3) Head back to Robigo Mines and complete the mission
4) This build has NO SHIELDS meaning every small impact will damage your hull. Passengers won't be happy with this and your paycut will be reduced
5) Don't go over 100% heat, Passengers will not be happy either. Use a Heatsink Launcher if you need${messageQuote}`);
}

function paths(message) {
    message.reply(`${messageQuote}
Steam Shortcut: steam://rungameid/359320
Epic Shortcut: com.epicgames.launcher://apps/9c203b6ed35846e8a4a9ff1e314f6593?action=launch&silent=true
${messageQuote}`);
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
###### Laser mining hotspots & market data #####${messageQuote}<https://edtools.cc/miner?c=83&s=Hyades%20Sector%20DB-X%20d1-112>
${messageQuote}cs
###### Engineers #####${messageQuote}<https://inara.cz/galaxy-engineers/>
${messageQuote}cs
###### Materials for Engineering #####${messageQuote}<https://docs.google.com/spreadsheets/d/1BpkIh8lLR4TaOs_IP8C-jutvlmWaEN6A8Zj4m4xQn6c/>
${messageQuote}cs
###### Fleet Carriers #####${messageQuote}<https://cmdrs-toolbox.com/fleet-carrier-calculator/>`);
}

function stationRepair(message) {
    message.reply(`${messageQuote}cs
##### Station Repair #####${messageQuote}${messageQuote}Thargoids often invade systems. When that happens, the system will be with the state of "Infested". If an insufficient number of Thargoid ships are destroyed in a certain period of time, the system will enter the state of "Incursion". When this happens, space stations will be damaged, services in the stations won't be operational and the only missions available are the ones to rescue passengers, transporting them from the space station to a megaship. Anti-Xeno Conflict Zones will appear in the system and for each week the AXCZs remain, another station in the same system is attacked.

To start repairing the space stations, the Infested state must mention "No Thargoid Presence". Damaged stations can be re-attacked before repairs are complete, which voids all repair work done prior to the new attack. Thus, it is not recommended to start repairing a station until the Incursion has been cleared. Only then the Background Simulator will start with the repair. Commanders may help by delivering the commodities that station requires.

When in the Infested state, these are the severity levels:
- Massive Thargoid Presence
- Significant Thargoid Presence
- Moderate Thargoid Presence
- Marginal Thargoid Presence
- No Thargoid Presence${messageQuote}`);
}

function synthesis(message) {
    message.reply(`${messageQuote}
synthesis is under construction :D
${messageQuote}`);
}

function thargoids(message) {
    message.reply(`${messageQuote}cs
##### Thargoid Barnacles (Big Forest) #####${messageQuote}${messageQuote}HYADES SECTOR AQ-Y D81     C 2     (Hotspot 3)     (Distance from Sol: 271 LY)${messageQuote}
${messageQuote}cs
##### Thargoid Sensors #####${messageQuote}${messageQuote}LTT 1935     6 A     (Distance from Sol: 71 LY)     (Sensor per relog: 1)
HIP 17403     A 4 A     (Distance from Sol: 411 LY)     (Sensor per relog: 3)${messageQuote}
${messageQuote}cs
##### Thargoid Structure (Active) #####${messageQuote}${messageQuote}PLEIADES SECTOR MC-V C2-0     1 A     (Distance from Sol: 383 LY)${messageQuote}
${messageQuote}cs
##### Thargoid Combat #####${messageQuote}${messageQuote}PLEIADES SECTOR HR-W D1-79     (Distance from Sol: 382 LY)     (Pleiades Nebula)
MUSCA DARK REGION PJ-P B6-1     (Distance from Sol: 520 LY)     (Musca Nebula)
HIP 23759     (Distance from Sol: 891 LY)     (Witch Head Nebula)${messageQuote}
${messageQuote}cs
##### Others #####${messageQuote}${messageQuote}- Non Human Signal Sources (NHSS) might have Thargoids. Sometimes it can only be Scouts. However, all NHSS with the Salvage Icon is a 100% guarantee that a Thargoid will be there
- Thargoid Probes can be found in NHSS. Look for NHSS Threat Level 5 or 7 for better spawn rates of the Thargoid Probe
- Thargoid Links, Resin, Biological Matter and Technology Sample can be found in Thargoid Structures${messageQuote}
${messageQuote}cs
##### More Commands for Thargoids #####${messageQuote}${messageQuote}!hearts
!stationRepair${messageQuote}`);
}