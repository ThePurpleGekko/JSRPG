function Mob(name, stats, weapon, armour, accessory, bMagic, wMagic, orientation)
{
	this.name = name;
	this.stats = stats;
	this.weapon = weapon;
	this.armour = armour;
	this.accessory = accessory;
	this.bMagic = bMagic;
	this.wMagic = wMagic;
	this.orientation = orientation;
};

function Hero(name, stats, weapon, armour, accessory, bMagic, wMagic, orientation)
{
	this.name = name;
	this.stats = stats;
	this.MaxHP = this.getHP();
	this.MaxMP = this.getMP();
	this.weapon = weapon;
	this.armour = armour;
	this.accessory = accessory;
	this.bMagic = bMagic;
	this.wMagic = wMagic;
	this.orientation = orientation;
};

function Enemy(name, stats, weapon, armour, accessory, bMagic, wMagic, orientation)
{
	this.name = name;
	this.stats = stats;
	this.MaxHP = this.getHP();
	this.MaxMP = this.getMP();
	this.weapon = weapon;
	this.armour = armour;
	this.accessory = accessory;
	this.bMagic = bMagic;
	this.wMagic = wMagic;
	this.orientation = orientation;
};

Hero.prototype = new Mob();
Enemy.prototype = new Mob();

Hero.prototype.getHP = function(){return Math.floor((this.stats.phys+10)*(this.stats.ment+5)*1.5);};
Enemy.prototype.getHP = function(){return Math.floor((this.stats.phys+10)*(this.stats.ment+10)*10);};
Mob.prototype.getMP = function(){return Math.floor(this.stats.ment*12);};
Mob.prototype.getSTR = function(){return Math.floor((this.stats.phys*0.6) + (this.stats.driv*0.4));};
Mob.prototype.getDEF = function(){return Math.floor((this.stats.phys*0.4) + (this.stats.resi*0.6));};
Mob.prototype.getMAG = function(){return Math.floor((this.stats.ment*0.6) + (this.stats.driv*0.4));};
Mob.prototype.getSPR = function(){return Math.floor((this.stats.ment*0.4) + (this.stats.resi*0.6));};
Mob.prototype.getACC = function(){return Math.floor((this.stats.ment*0.1) + (this.stats.driv*0.2) + (this.stats.agil*0.4) + (this.stats.luck*0.3));};
Mob.prototype.getEVA = function(){return Math.floor((this.stats.phys*0.1) + (this.stats.resi*0.2) + (this.stats.agil*0.4) + (this.stats.luck*0.3));};
Mob.prototype.getSPD = function(){return Math.floor((this.stats.agil*0.8) + (this.stats.driv*0.2));};
Mob.prototype.getLCK = function(){return Math.floor(this.stats.luck);};

function Equipment(name, HP, MP, phys, ment, driv, resi, elem)
{
	this.name = name;
	this.HP = HP;
	this.MP = MP;
	this.phys = phys;
	this.ment = ment;
	this.driv = driv;
	this.resi = resi;
	this.elem = elem;
};

var none = new Equipment("None",0,0,0,0,0,0,"none");
var ironSword = new Equipment("Iron Sword",0,0,10,0,0,0,"none");
var fireSword = new Equipment("Fire Sword",0,0,0,0,0,0,"fire");
var woodStaff = new Equipment("Wood Staff",0,0,0,10,0,0,"none");
var guardsUniform = new Equipment("Guard's Uniform",0,0,10,0,0,0,"none");
var eqFire = new Equipment("eqFire",0,0,0,0,0,0,"fire");
var eqElectric = new Equipment("eqElectric",0,0,0,0,0,0,"electric");
var eqLight = new Equipment("eqFire",0,0,0,0,0,0,"light");
var eqDark = new Equipment("eqFire",0,0,0,0,0,0,"dark");
var charm = new Equipment("Charm",10,10,0,0,0,0,"none");

var allWeapons = [ironSword,fireSword,woodStaff];
var allArmour = [guardsUniform];
var allAccessories = [charm];

var warrior = new Hero("Warrior",
	{phys:80,ment:25,driv:80,resi:80,agil:50,luck:10},
	fireSword,guardsUniform,none,null,null,null,null,false,null,false);

var mage = new Hero("Mage",
	{phys:25,ment:80,driv:80,resi:60,agil:60,luck:10},
	woodStaff,none,charm,null,null,null,null,false,null,false);

var ranger = new Hero("Ranger",
	{phys:70,ment:40,driv:80,resi:70,agil:70,luck:10},
	none,guardsUniform,none,null,null,null,null,false,null,false);

var wraith = new Enemy("Wraith",
	{phys:25,ment:15,driv:40,resi:35,agil:50,luck:1},
	none,eqDark,none,null,null,null,null,false,null,false);

var goblin = new Enemy("Goblin",
	{phys:30,ment:25,driv:40,resi:40,agil:60,luck:1},
	none,none,none,null,null,null,null,false,null,false);

var zombie = new Enemy("Zombie",
	{phys:35,ment:30,driv:50,resi:45,agil:40,luck:1},
	none,eqDark,none,null,null,null,null,false,null,false);

var fireElemental = new Enemy("Fire Elemental",
	{phys:20,ment:60,driv:50,resi:50,agil:40,luck:1},
	none,eqFire,none,null,null,null,null,false,null,false);

var electricElemental = new Enemy("Electric Elemental",
	{phys:20,ment:60,driv:50,resi:55,agil:40,luck:1},
	none,eqElectric,none,null,null,null,null,false,null,false);

var darkGiant = new Enemy("Dark Giant",
	{phys:50,ment:40,driv:60,resi:60,agil:20,luck:1},
	none,eqDark,none,null,null,null,null,false,null,false);

var lightGiant = new Enemy("Light Giant",
	{phys:40,ment:50,driv:60,resi:65,agil:20,luck:1},
	none,eqLight,none,null,null,null,null,false,null,false);
	
var heroRoster = [warrior,mage,ranger];
var enemyRoster = [wraith,goblin,zombie,fireElemental,electricElemental,darkGiant,lightGiant];
var allMobs = heroRoster + enemyRoster;


function Magic(name, cost, power, elem, effect) {
	this.name = name;
	this.cost = cost;
	this.power = power;
	this.elem = elem;
	this.effect = effect;
};

// make an object containing all black magic to use instead of the array? (or as well as?)
var fire = new Magic("fire", 4, 8, "fire", 0);
var ice = new Magic("ice", 4, 8, "ice", 0);
var water = new Magic("water", 4, 8, "water", 0);
var electric = new Magic("electric", 4, 8, "electric", 0);
var dark = new Magic("dark", 6, 10, "dark", 0);

// make an object containing all white magic to use instead of the array? (or as well as?)
var heal = new Magic("heal", 6, 12, "light", 0);
var cure = new Magic("cure", 6, 12, "light", 0);
var light = new Magic("light", 16, 20, "light", 0);

function Item(name, HP, MP, power, elem, effect) {
	this.name = name;
	this.HP = HP;
	this.MP = MP;
	this.power = power;
	this.elem = elem;
	this.effect = effect;
};

var sPotion = new Item("standard potion", 500, 0, 1, "light", 0);
var mPotion = new Item("mega potion", 2000, 0, 1, "light", 0);
var xPotion = new Item("X-potion", 99999, 0, 1, "light", 0);
var mCocktail = new Item("mana cocktail", 0, 100, 1, "light", 0);
var grenade = new Item("Grenade", -1200, 0, 1, "normal", 0);


var bMagic = [fire,ice,water,electric,dark,light];
var wMagic = [heal,cure];
var item = [sPotion,mPotion,xPotion,mCocktail,grenade];

var num = [0,1,2,3,4,5,6,7,8,9]