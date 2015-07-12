var jsrpg =
{
	HERO : null,
	ENEMY : null,
	HBOX : null,
	EBOX : null,
	FEED : null,
	FOOT : null,
	ACTOR : false,
	TARGETS : null,
	TARGET : null,
	ACTION : null,
	MAGIC : null,
	ABOX : null,
	TBOX : null,

	init : function()
	{
		var hCount = 3;
		var eCount = 4;

		jsrpg.HERO = [];
		jsrpg.ENEMY = [];
		jsrpg.HBOX = [];
		jsrpg.EBOX = [];
		
		for (var i = 0; i < hCount; i++) {jsrpg.HERO[i] =
			{a : heroRoster[i], HP : heroRoster[i].getHP(), MP : heroRoster[i].getMP(), stock : 0, berserk : 0, spd : rn(50), KO : false};};
		for (var i = 0; i < eCount; i++) {var r = rn(enemyRoster.length); jsrpg.ENEMY[i] =
			{a : enemyRoster[r], HP : enemyRoster[r].getHP(), MP : enemyRoster[r].getMP(), stock : 0, berserk : 0, spd : rn(50), KO : false};};

		for (var i = 0; i < hCount; i++) {jsrpg.HBOX[i] = document.getElementById("hero" + i);};
		for (var i = 0; i < eCount; i++) {jsrpg.EBOX[i] = document.getElementById("enemy" + i);};

		jsrpg.FEED = document.getElementById("feed");
		jsrpg.FOOT = document.getElementById("footer");
		jsrpg.update();
		jsrpg.tick();
	},

	tick : function()
	{
		do
		{
			jsrpg.speedCheck();
			jsrpg.speedInc();
		} while (jsrpg.ACTOR == false);

		if (jsrpg.ACTOR == jsrpg.HERO[0] || jsrpg.ACTOR == jsrpg.HERO[1] || jsrpg.ACTOR == jsrpg.HERO[2])
		{
			jsrpg.mainMenu();
		}
		else if (jsrpg.ACTOR.a == fireElemental)
		{
			jsrpg.FOOT.innerHTML = "<p>" + jsrpg.ACTOR.a.name + "'s turn</p>";
			setTimeout(function(){jsrpg.cast(rn(heroRoster.length),0)},3000);
		}
		else if (jsrpg.ACTOR.a == electricElemental)
		{
			jsrpg.FOOT.innerHTML = "<p>" + jsrpg.ACTOR.a.name + "'s turn</p>";
			setTimeout(function(){jsrpg.cast(rn(heroRoster.length),3)},3000);
		}
		else if (jsrpg.ACTOR.a == darkGiant)
		{
			jsrpg.FOOT.innerHTML = "<p>" + jsrpg.ACTOR.a.name + "'s turn</p>";
			if(rn(2)==2) {setTimeout(function(){jsrpg.cast(rn(heroRoster.length),4)},3000);}
			else {setTimeout(function(){jsrpg.attack(rn(heroRoster.length))},3000);};
		}
		else if (jsrpg.ACTOR.a == lightGiant)
		{
			jsrpg.FOOT.innerHTML = "<p>" + jsrpg.ACTOR.a.name + "'s turn</p>";
			if(rn(2)==2) {setTimeout(function(){jsrpg.cast(rn(heroRoster.length),5)},3000);}
			else {setTimeout(function(){jsrpg.attack(rn(heroRoster.length))},3000);};
		}
		else
		{
			jsrpg.FOOT.innerHTML = "<p>" + jsrpg.ACTOR.a.name + "'s turn</p>";
			setTimeout(function(){jsrpg.attack(rn(heroRoster.length))},3000);
		};
	},

	speedCheck : function()
	{
		var isTurn = false;
		var spdMod = 305;
		for ( var i = 0; i < jsrpg.HERO.length; i++ )
		{
			if (jsrpg.HERO[i].spd > spdMod && jsrpg.HERO[i].KO == false)
			{
				jsrpg.ACTOR = jsrpg.HERO[i];
				jsrpg.ABOX = jsrpg.HBOX[i];
				isTurn = true;
			};
		};
		for ( var i = 0; i < jsrpg.ENEMY.length; i++ )
		{
			if (jsrpg.ENEMY[i].spd > spdMod && jsrpg.ENEMY[i].KO == false)
			{
				jsrpg.ACTOR = jsrpg.ENEMY[i];
				jsrpg.ABOX = jsrpg.EBOX[i];
				isTurn = true;
			};
		};
		if (isTurn)
		{
			jsrpg.ABOX.className = "turn";
		};
	},
	
	speedInc : function()
	{		
		for ( var i = 0; i < jsrpg.HERO.length; i++ ) { jsrpg.HERO[i].spd++; };
		for ( var i = 0; i < jsrpg.ENEMY.length; i++ ) { jsrpg.ENEMY[i].spd++; };
	},

	update : function()
	{
		var heroStats = [];
		var enemyStats = [];
		for (var i = 0; i < jsrpg.HERO.length; i++)
		{
			heroStats[i] = "<p>" + jsrpg.HERO[i].a.name + "<br>" +
			jsrpg.HERO[i].HP + "/" + jsrpg.HERO[i].a.MaxHP + " HP<br>" +
			jsrpg.HERO[i].MP + "/" + jsrpg.HERO[i].a.MaxMP + " MP</p>";
			jsrpg.HBOX[i].innerHTML = heroStats[i];
		};
		for (var i = 0; i < jsrpg.ENEMY.length; i++)
		{
			enemyStats[i] = "<p>" + jsrpg.ENEMY[i].a.name + "<br>" +
			jsrpg.ENEMY[i].HP + "/" + jsrpg.ENEMY[i].a.MaxHP + " HP<br>" +
			jsrpg.ENEMY[i].MP + "/" + jsrpg.ENEMY[i].a.MaxMP + " MP</p>";
			jsrpg.EBOX[i].innerHTML = enemyStats[i];
		};
	},

	attack : function(x)
	{
		jsrpg.TNUM = x;
		if (jsrpg.ACTOR == jsrpg.HERO[0] || jsrpg.ACTOR == jsrpg.HERO[1] || jsrpg.ACTOR == jsrpg.HERO[2])
		{
			jsrpg.TARGET = jsrpg.ENEMY[x];
			jsrpg.TBOX = jsrpg.EBOX[x];
		}
		else
		{
			jsrpg.TARGET = jsrpg.HERO[x];
			jsrpg.TBOX = jsrpg.HBOX[x];
		};
		var damage = atkDamage();
                damage = isNaN( damage ) ? 0 : damage;
		jsrpg.TARGET.HP = jsrpg.TARGET.HP - damage;
		jsrpg.FEED.innerHTML = "<p>" + jsrpg.ACTOR.a.name + " hit " + jsrpg.TARGET.a.name + " for " + damage + " damage</p><hr>";
		jsrpg.checkKO();
		jsrpg.update();
		jsrpg.ACTOR.spd = jsrpg.ACTOR.a.getSPD();
		jsrpg.ABOX.className = "mob";
		jsrpg.ACTOR = false;
		jsrpg.tick();
	},
	
	cast : function(x,magNum)
	{
		if (jsrpg.ACTOR == jsrpg.HERO[0] || jsrpg.ACTOR == jsrpg.HERO[1] || jsrpg.ACTOR == jsrpg.HERO[2])
		{
			jsrpg.TARGET = jsrpg.ENEMY[x];
			jsrpg.TBOX = jsrpg.EBOX[x];
		}
		else
		{
			jsrpg.TARGET = jsrpg.HERO[x];
			jsrpg.TBOX = jsrpg.HBOX[x];
		};
		var damage = magDamage(bMagic[magNum]);
		jsrpg.TARGET.HP = jsrpg.TARGET.HP - damage;
		jsrpg.FEED.innerHTML = "<p>" + jsrpg.ACTOR.a.name + " cast " + bMagic[magNum].name + " on " + jsrpg.TARGET.a.name + " for " + damage + " damage</p><hr>";
		jsrpg.checkKO();
		jsrpg.ACTOR.MP = jsrpg.ACTOR.MP - bMagic[magNum].cost;
		jsrpg.ACTOR.spd = jsrpg.ACTOR.a.getSPD();
		jsrpg.ABOX.className = "mob";
		jsrpg.ACTOR = false;
		jsrpg.update();
		jsrpg.tick();
	},
	
	checkKO : function()
	{
		if (jsrpg.TARGET.HP < 1)
		{
			jsrpg.TARGET.HP = 0;
			jsrpg.TARGET.KO = true;
			jsrpg.TBOX.className = "ko";
		};
	},
	
	magList : function(mag)
	{
		var html = "<p>" + jsrpg.ACTOR.a.name + "'s turn</p><menu><ul>";
		for (var i = 0; i < mag.length; i++)
		{
			html = html + "<li id='mag" + i + "' onClick='jsrpg.magTarget(" + i + ")'>" + mag[i].name + "</li>";
		};
		html = html + "<li id=\"back\" onClick=\"jsrpg.back()\">Back</li></ul></menu>";
		jsrpg.FOOT.innerHTML = html;
	},
	
	magTarget : function(magNum)
	{
		if (jsrpg.ACTOR.MP >= bMagic[magNum].cost)
		{
			jsrpg.TARGETS = [jsrpg.ENEMY[0], jsrpg.ENEMY[1], jsrpg.ENEMY[2], jsrpg.ENEMY[3]]; // needs sorting out when dead targets get removed (create array with for loop using targets.length)
			var html = "<p>" + jsrpg.ACTOR.a.name + "'s turn</p><menu><ul>";
			for (var i = 0; i < jsrpg.TARGETS.length; i++)
			{
				html = html + "<li id='targ" + i + "' onClick='jsrpg.cast(" + i + "," + magNum + ")'>" + jsrpg.TARGETS[i].a.name + "</li>";
			};
			html = html + "<li id=\"back\" onClick=\"jsrpg.back()\">Back</li></ul></menu>";
			jsrpg.FOOT.innerHTML = html;
		}
		else
		{
			jsrpg.FEED.innerHTML = "<p>" + jsrpg.ACTOR.a.name + " does not have enough MP to cast " + bMagic[magNum].name + "!</p><hr>";
		};
	},
	
	itemList : function(x)
	{
		var html = "<p>" + jsrpg.ACTOR.a.name + "'s turn</p><menu><ul>";
		for (var i = 0; i < x.length; i++)
		{
			html = html + "<li>" + x[i].name + "</li>"; // lists the menu buttons (ie, the contents of the array)
		};
		html = html + "<li id=\"back\" onClick=\"jsrpg.back()\">Back</li></ul></menu>";
		jsrpg.FOOT.innerHTML = html;
	},
	
	targetList : function() // need to make this function change HBOXs and EBOXs  to be clickable
	{
		jsrpg.TARGETS = [jsrpg.ENEMY[0], jsrpg.ENEMY[1], jsrpg.ENEMY[2], jsrpg.ENEMY[3]];
		var html = "<p>Choose your target</p><menu><ul>";
		for (var i = 0; i < jsrpg.TARGETS.length; i++)
		{
			html = html + "<li id='targ" + i + "' onClick='jsrpg.attack(" + i + ")'>" + jsrpg.TARGETS[i].a.name + "</li>";
		};
		html = html + "<li id=\"back\" onClick=\"jsrpg.back()\">Back</li></ul></menu>";
		jsrpg.FOOT.innerHTML = html;
	},

	back : function()
	{
		jsrpg.mainMenu();
	},
	
	skip : function()
	{
		jsrpg.ACTOR.spd = jsrpg.ACTOR.a.getSPD();
		if (jsrpg.ACTOR.stock >= 3)
		{
			jsrpg.ACTOR.trance = true;
		}
		else
		{
			jsrpg.ACTOR.stock++;
		};
		jsrpg.ACTOR = false;
		jsrpg.tick();
	},

	mainMenu : function()
	{
		jsrpg.FOOT.innerHTML = "<p>" + jsrpg.ACTOR.a.name + "'s turn</p><menu><ul>" +
			"<li id=\"attack\" onClick=\"jsrpg.targetList()\">Attack</li>"+
			"<li id=\"bmagic\" onClick=\"jsrpg.magList(bMagic)\">Black Magic</li>"+
			"<li id=\"wmagic\" onClick=\"jsrpg.magList(wMagic)\">White Magic (coming soon!)</li>"+
			"<li id=\"item\" onClick=\"jsrpg.itemList(item)\">Items (coming soon!)</li>"+
			"<li id=\"skip\" onClick=\"jsrpg.skip()\">Skip Turn</li>"+
			"</ul></menu>";
	}
};

$( document ).ready( function(){ jsrpg.init(); } );