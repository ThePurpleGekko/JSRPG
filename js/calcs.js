var damageLimit = 99999 // this is the maximum damage allowed

function rn(x)
{
	y = Math.floor(Math.random()*x);
	return y;
};

function atkDamage() // x is attacking Mob, y is defending Mob
{
	var x = jsrpg.ACTOR.a.getSTR();
	var y = jsrpg.TARGET.a.getDEF();
	var z = (((x*x*x*20) + (rn(x*x*0.7))) / (y*y)) + rn(x);
	
	if (z >= damageLimit)
	{
		return (damageLimit);
	}
	else
	{
		return Math.floor(z);
	};
};

function magDamage(m) // x is attacking Mob, y is defending Mob, m is magic
{
	var xMAG = jsrpg.ACTOR.a.getMAG();
	var ySPR = jsrpg.TARGET.a.getSPR();
	var z = ((((xMAG*xMAG*xMAG*m.power*7) + rn(xMAG)) / (ySPR*ySPR)) * elementMod(m.elem,jsrpg.TARGET.a.armour.elem));
	
	if (z >= damageLimit)
	{
		return (damageLimit);
	}
	else
	{
		return Math.floor(z);
	};
};

function elementMod(x,y)
{
	var z = 1;
	var mp = 1.5;
	if (x == "fire")
	{
		if (y == "fire")
		{
			z = -1;
		}
		else if (y == "ice")
		{
			z = mp;
		};
	}
	else if (x == "ice")
	{
		if (y == "fire")
		{
			z = mp;
		}
		else if (y == "ice")
		{
			z = -1;
		};
	}
	else if (x == "water")
	{
		if (y == "water")
		{
			z = -1;
		}
		else if (y == "electric")
		{
			z = mp;
		};
	}
	else if (x == "electric")
	{
		if (y == "water")
		{
			z = mp;
		}
		else if (y == "electric")
		{
			z = -1;
		};
	}
	else if (x == "light")
	{
		if (y == "light")
		{
			z = -1;
		}
		else if (y == "dark")
		{
			z = mp;
		};
	}
	else if (x == "dark")
	{
		if (y == "light")
		{
			z = mp;
		}
		else if (y == "dark")
		{
			z = -1;
		};
	};
	return z;
};