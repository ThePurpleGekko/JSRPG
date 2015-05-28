function Mob(name, HP, MP, atk, atkdef, magic, magdef, accuracy, evasion, speed) {
	this.name = name;
	this.HP = HP;
	this.MP = MP;
	this.atk = atk;
	this.atkdef = atkdef;
	this.magic = magic;
	this.magdef = magdef;
	this.accuracy = accuracy;
	this.evasion = evasion;
	this.speed = speed;
};

player.prototype = new Mob();
enemy.prototype = new Mob();

var warrior = new Player("Warrior",200000,60,200,200,50,125,150,60,90);
var mage = new Player("Mage",150000,200,50,100,200,200,50,200,110);
var ranger = new Player("Ranger",100000,100,50,100,80,100,200,150,200);

var rat = new Player	("Dire Rat",80000,5,60,50,10,20,50,20,40);
var goblin = new Player	("Goblin",1100000,5,80,90,30,40,60,0,60);
var blight = new Player	("Tree Blight",3200000,35,120,160,60,140,100,0,80);