console.log("Hello, World!");
turn = document.getElementById("turn");
won = document.getElementById("won");
const map = [
    '#', '#', '#', '#', '#',
    '#', '#', '#', '#', '#',
    '#', '#', '#', '#', '#',
    '#', '#', '#', '#', '#',
    '#', '#', '#', '#', '#',
    '#'
];
let rand = 3;
let value = "";
let fost = 0;
let if_won = false;
let contra_select = false;
let location_place = 0;
let img_place = "";
let multi_select = false;
let multi_won = false;
let skin_red_name = "red.png";
let skin_blue_name = "blue.png";
let firebaseRef = firebase.database().ref();
let multi_map1 = new Array(5);
let multi_map2 = new Array(5);
let multi_map3 = new Array(5);
let multi_map4 = new Array(5);
let multi_map5 = new Array(5);
let index = 1;

reset();
change_multi();
reset();


window.setInterval(function(){
    if(multi_won == false && multi_select == true){ load(); }
}, 500);

function block(button) {
    img = document.getElementById("pic" + button);
    if(multi_select == false && contra_select == false){
        if (img.src == "https://x-x.now.sh/images/X/blank.png") {
            if (rand == 1 && img.src != "https://x-x.now.sh/images/X/" + skin_red_name) {
                img.src = "https://x-x.now.sh/images/X/" + skin_blue_name;
                turn.innerHTML = "Red";
                rand = 2;
            } else if (rand == 2 && img.src != "https://x-x.now.sh/images/X/" + skin_blue_name) {
                img.src = "https://x-x.now.sh/images/X/" + skin_red_name;
                turn.innerHTML = "Blue";
                rand = 1;
            }
        }
    }else if(multi_select == true && contra_select == false){
        firebase.database().ref("turn").on("value", (snap) => {
            let value3 = snap.val();
            console.log(value3);
            rand = value3;
        });
        console.log(rand);
        

        img  = document.getElementById("pic" + button);
        fost = rand;
        if (img.src == "https://x-x.now.sh/images/X/blank.png") {
            if (rand == 1) {
                turn.innerHTML = "Red";
                rand = 2;
                firebase.database().ref("turn").set(rand);
            } else if (rand == 2) {
                turn.innerHTML = "Blue";
                rand = 1;
                firebase.database().ref("turn").set(rand);
            }
        }
        load();
        console.log(button);
        console.log(rand);
        
        if(button <= 5 && multi_map1[button] == "#"){ multi_map1[button] = rand.toString(); }else if(button <= 5 && multi_map1[button] != "#"){ firebase.database().ref("turn").set(fost); }
        else if(button <= 10 && button > 5 && multi_map2[button-5] == "#"){ multi_map2[button-5] = rand.toString(); }else if(button <= 10 && button > 5 && multi_map2[button-5] != "#"){ firebase.database().ref("turn").set(fost); }
        else if(button <= 15 && button > 10 && multi_map3[button-10] == "#"){ multi_map3[button-10] = rand.toString(); }else if(button <= 15 && button > 10 && multi_map3[button-10] != "#"){ firebase.database().ref("turn").set(fost); }
        else if(button <= 20 && button > 15 && multi_map4[button-15] == "#"){ multi_map4[button-15] = rand.toString(); }else if(button <= 20 && button > 15 && multi_map4[button-15] != "#"){ firebase.database().ref("turn").set(fost); }
        else if(button <= 25 && button > 20 && multi_map5[button-20] == "#"){ multi_map5[button-20] = rand.toString(); }else if(button <= 25 && button > 20 && multi_map5[button-20] != "#"){ firebase.database().ref("turn").set(fost); }
        console.log(multi_map1);
        console.log(multi_map2);
        console.log(multi_map3);
        console.log(multi_map4);
        console.log(multi_map5);
        update_database();
        load();

    }else if(contra_select == true && multi_select == false){
        img  = document.getElementById("pic" + button);
        if (rand == 2 && img.src == "https://x-x.now.sh/images/X/blank.png") {
            if (img.src != "https://x-x.now.sh/images/X/" + skin_red_name) {
                img.src = "https://x-x.now.sh/images/X/" + skin_blue_name;
                if(if_won == false){
                    rand = 1;
                    console.log(if_won);
                    check();
                }
                if(if_won == false){
                    do{
                        location_place = Math.floor(Math.random() * 25) + 1;
                        img_place = document.getElementById("pic" + location_place);
                        console.log(img_place.src);
                    }while(img_place.src == "https://x-x.now.sh/images/X/blue.png" || img_place.src == "https://x-x.now.sh/images/X/red.png");
                    //console.log(img_place);
                    img_place.src = "https://x-x.now.sh/images/X/" + skin_red_name;
                    rand = 2;
                    console.log(if_won);
                    check();
                }
                console.log(if_won);
            }
        }
    }
    change_map();
    check();
    console.log(if_won + " : " + rand);
}

function load(){
    change_multi();
    for(let j = 1; j <= 5; j++){
        img = document.getElementById("pic" + j);
        if(multi_map1[j] == "2"){
            img.src = "https://x-x.now.sh/images/X/" + skin_blue_name;
        }else if(multi_map1[j] == "1"){
            img.src = "https://x-x.now.sh/images/X/" + skin_red_name;
        }else if(multi_map1[j] == "0"){
            img.src = "https://x-x.now.sh/images/X/blank.png";
        }
    }
    for(let j = 5; j <= 10; j++){
        img = document.getElementById("pic" + j);
        if(multi_map2[j-5] == "2"){
            img.src = "https://x-x.now.sh/images/X/" + skin_blue_name;
        }else if(multi_map2[j-5] == "1"){
            img.src = "https://x-x.now.sh/images/X/" + skin_red_name;
        }else if(multi_map2[j-5] == "0"){
            img.src = "https://x-x.now.sh/images/X/blank.png";
        }
    }
    for(let j = 10; j <= 15; j++){
        img = document.getElementById("pic" + j);
        if(multi_map3[j-10] == "2"){
            img.src = "https://x-x.now.sh/images/X/" + skin_blue_name;
        }else if(multi_map3[j-10] == "1"){
            img.src = "https://x-x.now.sh/images/X/" + skin_red_name;
        }else if(multi_map3[j-10] == "0"){
            img.src = "https://x-x.now.sh/images/X/blank.png";
        }
    }
    for(let j = 10; j <= 15; j++){
        img = document.getElementById("pic" + j);
        if(multi_map3[j-10] == "2"){
            img.src = "https://x-x.now.sh/images/X/" + skin_blue_name;
        }else if(multi_map3[j-10] == "1"){
            img.src = "https://x-x.now.sh/images/X/" + skin_red_name;
        }else if(multi_map3[j-10] == "0"){
            img.src = "https://x-x.now.sh/images/X/blank.png";
        }
    }
    for(let j = 15; j <= 20; j++){
        img = document.getElementById("pic" + j);
        if(multi_map4[j-15] == "2"){
            img.src = "https://x-x.now.sh/images/X/" + skin_blue_name;
        }else if(multi_map4[j-15] == "1"){
            img.src = "https://x-x.now.sh/images/X/" + skin_red_name;
        }else if(multi_map4[j-15] == "0"){
            img.src = "https://x-x.now.sh/images/X/blank.png";
        }
    }
    for(let j = 20; j <= 25; j++){
        img = document.getElementById("pic" + j);
        if(multi_map5[j-20] == "2"){
            img.src = "https://x-x.now.sh/images/X/" + skin_blue_name;
        }else if(multi_map5[j-20] == "1"){
            img.src = "https://x-x.now.sh/images/X/" + skin_red_name;
        }else if(multi_map5[j-20] == "0"){
            img.src = "https://x-x.now.sh/images/X/blank.png";
        }
    }
}

function single() {
    multi_select = false; reset(); reset(); rand = 1;
    document.getElementById("menu").style.display = "none";
    document.getElementById("board").style.display = "block";
}

function change_multi(){
    firebase.database().ref("1").on("value", (snap) => {
        let string = snap.val().split(" ");
        for(let i = 1; i <= string.length; i++){
            multi_map1[i] = string[i-1];
        }
    });
    firebase.database().ref("2").on("value", (snap) => {
        let string = snap.val().split(" ");
        for(let i = 1; i <= string.length; i++){
            multi_map2[i] = string[i-1];
        }
    });
    firebase.database().ref("3").on("value", (snap) => {
        let string = snap.val().split(" ");
        for(let i = 1; i <= string.length; i++){
            multi_map3[i] = string[i-1];
        }
    });
    firebase.database().ref("4").on("value", (snap) => {
        let string = snap.val().split(" ");
        for(let i = 1; i <= string.length; i++){
            multi_map4[i] = string[i-1];
        }
    });
    firebase.database().ref("5").on("value", (snap) => {
        let string = snap.val().split(" ");
        for(let i = 1; i <= string.length; i++){
            multi_map5[i] = string[i-1];
        }
    });
}

function multi() {
    change_multi(); console.log("Multiplayer");
    multi_select = true; load();
    firebase.database().ref("turn").on("value", (snap) => {
        let value3 = snap.val();
        console.log(value3);
        rand = value3;
    });
    document.getElementById("menu").style.display = "none";
    document.getElementById("board").style.display = "block";
}

function contra() {
    contra_select = true; rand = 2;
    document.getElementById("menu").style.display = "none";
    document.getElementById("board").style.display = "block";
}

function change(){
    var color = document.getElementById("color").value;
    var skin = document.getElementById("image").value;
    console.log(color);
    console.log(skin);
    if(color == "Red"){
        switch(skin){
            case "default":
                skin_red_name = "red.png";
                break;
            case "star":
                skin_red_name = "red_star.png";
                break;
            case "mega-star":
                skin_red_name = "red_mega-star.png";
                break;
            case "israel":
                skin_red_name = "red_israel-star.png";
                break;
            case "fulg":
                skin_red_name = "red_fulg.png";
                break;
        }
    }else if(color == "Blue"){
        switch(skin){
            case "default":
                skin_blue_name = "blue.png";
                break;
            case "star":
                skin_blue_name = "blue_star.png";
                break;
            case "mega-star":
                skin_blue_name = "blue_mega-star.png";
                break;
            case "israel":
                skin_blue_name = "blue_israel-star.png";
                break;
            case "fulg":
                skin_blue_name = "blue_fulg.png";
                break;
        }
    }
    console.log(skin_blue_name);
    console.log(skin_red_name);
    

    document.getElementById("blue").src = "images/X/" + skin_blue_name;
    document.getElementById("red").src = "images/X/" + skin_red_name;
}

function update_database(){
    let rand1 = "";
    let rand2 = "";
    let rand3 = "";
    let rand4 = "";
    let rand5 = "";
    for(let i = 1; i <= 5; i++){
        rand1 += multi_map1[i]; rand1 += " ";
        rand2 += multi_map2[i]; rand2 += " ";
        rand3 += multi_map3[i]; rand3 += " ";
        rand4 += multi_map4[i]; rand4 += " ";
        rand5 += multi_map5[i]; rand5 += " ";
    }
    firebase.database().ref("1").set(rand1);
    firebase.database().ref("2").set(rand2);
    firebase.database().ref("3").set(rand3);
    firebase.database().ref("4").set(rand4);
    firebase.database().ref("5").set(rand5);
}

function exit_skin(){
    document.getElementById("menu").style.display = "block";
    document.getElementById("skins").style.display = "none";
}

function reset() {
    rand = 1;
    if_won = false;
    console.log(multi_select + " { " + if_won + " } " + contra_select + ";");
    firebase.database().ref("turn").set(1);
    won.style.display = "none";
    turn.innerHTML = "Blue";
    for (let i = 1; i <= 25; i++) {
        pos = document.getElementById("pic" + i.toString());
        pos.src = "https://x-x.now.sh/images/X/blank.png";
        map[i] = "#";
    }
    if(multi_select == true && contra_select == false){ 
        firebase.database().ref("turn").set(1);
        for(let i = 1; i <= 5; i++){
            multi_map1[i] = "#";
            multi_map2[i] = "#";
            multi_map3[i] = "#";
            multi_map4[i] = "#";
            multi_map5[i] = "#";
        }
        update_database();
        load();
    }
}

function skins(){
    document.getElementById("menu").style.display = "none";
    document.getElementById("skins").style.display = "block";
}

function back() {
    contra_select = false; multi_select = false;
    document.getElementById("menu").style.display = "block";
    document.getElementById("board").style.display = "none";
    document.getElementById("skins").style.display = "none";
}


function check() {
    if (map[1] == "X" && map[2] == "X" && map[3] == "X" && map[4] == "X" && map[5] == "X") {
        if (rand == 1) {
            won.style.display = "block"; won.innerHTML = "Red Won!!";  if_won = true; if(multi_select == true){ multi_won = true; }
        } else {
            won.style.display = "block"; won.innerHTML = "Blue Won!!"; if_won = true; won = true; if(multi_select == true){ multi_won = true; }
        }
        for (let j = 1; j <= 5; j++) {
            img = document.getElementById("pic" + j.toString());
            img.src = "https://x-x.now.sh/images/Lines/drept.png";
        }
    } else if (map[6] == "X" && map[7] == "X" && map[8] == "X" && map[9] == "X" && map[10] == "X") {
        if (rand == 1) {
            won.style.display = "block"; won.innerHTML = "Red Won!!";  if_won = true; if(multi_select == true){ multi_won = true; }
        } else {
            won.style.display = "block"; won.innerHTML = "Blue Won!!"; if_won = true; won = true; if(multi_select == true){ multi_won = true; }
        }
        for (let j = 6; j <= 10; j++) {
            img = document.getElementById("pic" + j.toString());
            img.src = "https://x-x.now.sh/images/Lines/drept.png";
        }
    } else if (map[11] == "X" && map[12] == "X" && map[13] == "X" && map[14] == "X" && map[15] == "X") {
        if (rand == 1) {
            won.style.display = "block"; won.innerHTML = "Red Won!!";  if_won = true; if(multi_select == true){ multi_won = true; }
        } else {
            won.style.display = "block"; won.innerHTML = "Blue Won!!"; if_won = true; won = true; if(multi_select == true){ multi_won = true; }
        }
        for (let j = 11; j <= 15; j++) {
            img = document.getElementById("pic" + j.toString());
            img.src = "https://x-x.now.sh/images/Lines/drept.png";
        }
    } else if (map[16] == "X" && map[17] == "X" && map[18] == "X" && map[19] == "X" && map[20] == "X") {
        if (rand == 1) {
            won.style.display = "block"; won.innerHTML = "Red Won!!";  if_won = true; if(multi_select == true){ multi_won = true; }
        } else {
            won.style.display = "block"; won.innerHTML = "Blue Won!!"; if_won = true; won = true; if(multi_select == true){ multi_won = true; }
        }
        for (let j = 16; j <= 20; j++) {
            img = document.getElementById("pic" + j.toString());
            img.src = "https://x-x.now.sh/images/Lines/drept.png";
        }
    } else if (map[21] == "X" && map[22] == "X" && map[23] == "X" && map[24] == "X" && map[25] == "X") {
        if (rand == 1) {
            won.style.display = "block"; won.innerHTML = "Red Won!!";  if_won = true; if(multi_select == true){ multi_won = true; }
        } else {
            won.style.display = "block"; won.innerHTML = "Blue Won!!"; if_won = true; won = true; if(multi_select == true){ multi_won = true; }
        }
        for (let j = 21; j <= 25; j++) {
            img = document.getElementById("pic" + j.toString());
            img.src = "https://x-x.now.sh/images/Lines/drept.png";
        }
    } else if (map[1] == "X" && map[6] == "X" && map[11] == "X" && map[16] == "X" && map[21] == "X") {
        if (rand == 1) {
            won.style.display = "block"; won.innerHTML = "Red Won!!";  if_won = true; if(multi_select == true){ multi_won = true; }
        } else {
            won.style.display = "block"; won.innerHTML = "Blue Won!!"; if_won = true; won = true; if(multi_select == true){ multi_won = true; }
        }
        for (let j = 1; j <= 21; j = j + 5) {
            img = document.getElementById("pic" + j.toString());
            img.src = "https://x-x.now.sh/images/Lines/sus.png";
        }
    } else if (map[2] == "X" && map[7] == "X" && map[12] == "X" && map[17] == "X" && map[22] == "X") {
        if (rand == 1) {
            won.style.display = "block"; won.innerHTML = "Red Won!!";  if_won = true; if(multi_select == true){ multi_won = true; }
        } else {
            won.style.display = "block"; won.innerHTML = "Blue Won!!"; if_won = true; won = true; if(multi_select == true){ multi_won = true; }
        }
        for (let j = 2; j <= 22; j = j + 5) {
            img = document.getElementById("pic" + j.toString());
            img.src = "https://x-x.now.sh/images/Lines/sus.png";
        }
    } else if (map[3] == "X" && map[8] == "X" && map[13] == "X" && map[18] == "X" && map[23] == "X") {
        if (rand == 1) {
            won.style.display = "block"; won.innerHTML = "Red Won!!";  if_won = true; if(multi_select == true){ multi_won = true; }
        } else {
            won.style.display = "block"; won.innerHTML = "Blue Won!!"; if_won = true; won = true; if(multi_select == true){ multi_won = true; }
        }
        for (let j = 3; j <= 23; j = j + 5) {
            img = document.getElementById("pic" + j.toString());
            img.src = "https://x-x.now.sh/images/Lines/sus.png";
        }
    } else if (map[4] == "X" && map[9] == "X" && map[14] == "X" && map[19] == "X" && map[24] == "X") {
        if (rand == 1) {
            won.style.display = "block"; won.innerHTML = "Red Won!!";  if_won = true; if(multi_select == true){ multi_won = true; }
        } else {
            won.style.display = "block"; won.innerHTML = "Blue Won!!"; if_won = true; won = true; if(multi_select == true){ multi_won = true; }
        }
        for (let j = 4; j <= 24; j = j + 5) {
            img = document.getElementById("pic" + j.toString());
            img.src = "https://x-x.now.sh/images/Lines/sus.png";
        }
    } else if (map[5] == "X" && map[10] == "X" && map[15] == "X" && map[20] == "X" && map[25] == "X") {
        if (rand == 1) {
            won.style.display = "block"; won.innerHTML = "Red Won!!";  if_won = true; if(multi_select == true){ multi_won = true; }
        } else {
            won.style.display = "block"; won.innerHTML = "Blue Won!!"; if_won = true; won = true; if(multi_select == true){ multi_won = true; }
        }
        for (let j = 5; j <= 25; j = j + 5) {
            img = document.getElementById("pic" + j.toString());
            img.src = "https://x-x.now.sh/images/Lines/sus.png";
        }
    } else if (map[5] == "X" && map[9] == "X" && map[13] == "X" && map[17] == "X" && map[21] == "X") {
        if (rand == 1) {
            won.style.display = "block"; won.innerHTML = "Red Won!!";  if_won = true; if(multi_select == true){ multi_won = true; }
        } else {
            won.style.display = "block"; won.innerHTML = "Blue Won!!"; if_won = true; won = true; if(multi_select == true){ multi_won = true; }
        }
        for (let j = 5; j <= 21; j = j + 4) {
            img = document.getElementById("pic" + j.toString());
            img.src = "https://x-x.now.sh/images/Lines/diagonal1.png";
        }
    } else if (map[1] == "X" && map[7] == "X" && map[13] == "X" && map[19] == "X" && map[25] == "X") {
        if (rand == 1) {
            won.style.display = "block"; won.innerHTML = "Red Won!!";  if_won = true; if(multi_select == true){ multi_won = true; }
        } else {
            won.style.display = "block"; won.innerHTML = "Blue Won!!"; if_won = true; won = true; if(multi_select == true){ multi_won = true; }
        }
        for (let j = 1; j <= 25; j = j + 6) {
            img = document.getElementById("pic" + j.toString());
            img.src = "https://x-x.now.sh/images/Lines/diagonal2.png";
        }
    }
}

function change_map() {
    for (let i = 1; i <= 25; i++) {
        pos = document.getElementById("pic" + i.toString());
        if (pos.src != "https://x-x.now.sh/images/X/blank.png") {
            map[i] = "X";
        }else{
            map[i] = "#";
        }
        
    }
}