var z = null; // z is damage output
var damageLimit = 10000 // this is the maximum damage allowed

function attack(x,y) // x is attacker, y is defender
{
	// var baseDamage = ((str*str*str+(str*str*2)) / 88) + str;
	// damage calculation needs work to include defence
	
	if (z < damageLimit) { // this is the damage limit
		return Math.floor(z);
	}
	else {
		
		return (damageLimit -1);
	};
};

function showInfo()
{
	var text = spaceSSH.highlightKeyWords( spaceSSH.INPUT.val() );	
    
	var newLine = "<p>&nbsp;>&nbsp;"+text+"</p>";
  	  
	$( newLine ).appendTo( spaceSSH.SCREEN );
    
	spaceSSH.updateScroll();
    
	spaceSSH.INPUT.val("");
};

	updateScroll : function()
{
    spaceSSH.SCREEN[0].scrollTop = spaceSSH.SCREEN[0].scrollHeight;
};