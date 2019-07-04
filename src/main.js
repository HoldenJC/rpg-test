import $ from 'jquery';
import './styles.css';
import {
  Player,
  Role,
  Area,
  AreaMap
} from './rpg-primary';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let player1 = new Player();
let map = new AreaMap();

let caveArea = new Area("https://i.redd.it/lhowjn1ycgv01.gif", `You awake in a dark cave, alone and confused.`, "You look around the cave and find a <strong>sword</strong> resting behind an old rock. There appears to be a way out of the cave to the east, made aware to you by light beams shining in.", "sword");
let streamArea = new Area("https://i.gifer.com/1ynd.gif", `You head east, leaving the cave, arriving in a peaceful stream.`, "You look around the stream and the general area around you.  In every direction there is something green and alive.  To the north you see a dear, and hidden within the waters ahead there appears to be an interesting looking <strong>staff</strong>.  Off in the distance you can barely make out what looks to be a house.", "ancient staff");
let houseArea = new Area("https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/b6cd3560094321.5a834e827a8f6.gif", "You arrive at the house after journeying for a significant bit of time. You notice smoke leaving the chimney and light coming through the house's windows.", "You slowly approach the house, heading inside.  The house is filled with cobwebs and mounds of dust, but appears to have been recently occupied due to the fresh logs in the fireplace. On a bookshelf to the right of the entrance, one particular text titled \"<strong>Book of Wisdom</strong>\" catches your eye.", "Book of Wisdom");
// let cliffArea = new Area("cliff", "Near the edge of the cliff rests a peculiar <strong>stone</strong>.", "sight stone");

map.setAreaMap(caveArea);
map.setAreaMap(streamArea);
map.setAreaMap(houseArea);
// map.setAreaMap(cliffArea);

function updateJourney(playerName) {
  $("#journeyStart").html(player1.currentArea.fleeToArea);
  $("#journeyStart").delay(1200).fadeIn();
   
  // $("#bg").css('transition', 'background', '1s', 'linear');
  // setTimeout(function(){
  //   $("#bg").css('background-image', 'url('+player1.currentArea.areaBg+')');
  // }, 2000);
    
}

function checkCommand(command) {
  let commandLocal = command.toLowerCase();
  let name = "";
  switch (commandLocal) {
  case "look":
    $("#journeyStart").html(player1.currentArea.lookArea);
    break;
  case "inventory":
    $("#journeyStart").html("You are currently carrying: " + (player1.inventory).join(", "));
    break;
  case "stats":
    name = player1.role.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    $("#journeyStart").html("Role: <span class=\"roleStyle\">" + name + "</span><br>Strength: " + player1.role.strength + "<br>Intelligence: " + player1.role.intelligence + "<br>Agility: " + player1.role.agility);
    break;
  case "flee":
    if (player1.areaCount === 3) {
      $("#journeyStart").html("You walk outside of the house and are immediately confronted by a pack of wolves. You try to fight them off, but you're outnumbered 5 to 1. They eat you alive.  <strong>Game Over.</strong>");
    } else {
      player1.setArea(map);
      $("#journeyStart").html(player1.currentArea.fleeToArea);
      $("#bg").css('background-image', 'url('+player1.currentArea.areaBg+')');
    }
    break;
  case "fight":
    // value = 10;
    break;
  case "take":
    player1.setInventory(player1.currentArea.itemsArea);
    $("#journeyStart").html("You take the " + player1.currentArea.itemsArea);
    player1.currentArea.itemsArea = "";
    break;
  default:
    $("#journeyStart").html("\"" + command + "\"" + " is not a valid command. Please enter a valid command");
  }
}

function buttonListeners() {

  $("#commandCheck").click(function () {
    checkCommand($("#playerCommand").val());
    $("#playerCommand").val("");
  });

  $("#playerCommand").keyup(function (event) {
    if (event.keyCode === 13) {
      checkCommand($("#playerCommand").val());
      $("#playerCommand").val("");
    }
  });
  $("#legendToggle").click(function(){
    $("#commandLegend").slideToggle();
  });
}

$(document).ready(function () {

  $("#legendToggle").hide();
  buttonListeners();

  $("#userPlayer").submit(function (event) {
    event.preventDefault();

    $("#userPlayer, .jumbotron").fadeOut(600);
    $(".jumbotron").fadeOut(600);
    $("#gameArea, #commandLegend, #legendToggle").delay(600).fadeIn();
    $("#playerCommandDiv").delay(1800).fadeIn();
    player1.name = $("#userName").val();
    console.log(player1);

    player1.setRole($("#roleSelect").val());
    console.log(player1);

    player1.setArea(map);

    updateJourney(player1.name);

  });
});