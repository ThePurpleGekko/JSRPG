var player = {
name:"",hp:75,mp:10,
strength:9,defense:7,
magic:8,mdefense:6,
speed:9,accuracy:7,evasion:6
};

function getName() {
    player.name = document.getElementById("myText").value;
    document.getElementById("demo").innerHTML = player.name + " has " + player.hp + " HP";
};