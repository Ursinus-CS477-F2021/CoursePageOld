let stories = {};
stories["Alexa/Manning"] = {"start":"swings",
                            "end":"WaterFountain",
                            "slide":{"description":"meant to go down, but more fun to run up", "next":["merryGoRound", "WaterFountain"]},
                            "seesaw": {"description":"grab a friend and bounce up and down","next":["monkey bars", "slide"]},
                            "monkey bars": {"description":"experience the life of a primate jumping from tree to tree","next":["swings", "seesaw"]},
                            "swings": {"description":"Soar through the air", "next":["seesaw", "monkey bars", "merryGoRound"]},
                            "merryGoRound": {"description":"warning beware of dizziness","next":["seesaw", "monkey bars", "WaterFountain"]},
                            "WaterFountain": {"description":"take a refreshing drink"}
};

stories["Mike K / Jeremy"] = {"start":"main",
                    "end":"commons",
                    "main": {"description":"Where you enter campus. Hmm, I want coffee.", "next":["library", "wismer", "pfahler", "north"]}, 
                    "pfahler": {"description":"For the musuem and math stuff. The desire for coffee grows stronger.", "next":["library", "ritter"]},
                    "wismer": {"description":"A place to have lunch. You want more exciting coffee than the coffee from wismer.", "next":["library", "north", "commons"]},
                    "library": {"description":"Books and reading. Ironically, you find a book about coffee.", "next":["wismer", "pfahler", "commons"]},
                    "ritter": {"description":"Pretty cool place but not the commons.", "next":["wismer", "pfahler"]},
                    "north": {"description":"I think I want to go to the commons.", "next":["wismer", "commons"]},
                    "commons": {"description":"Yay, you finally got coffee!"}
                };

stories["Mike L / Tom S"] = {
    "start":"ticket booth",
    "ticket booth": {"description":"place where you buy tickets", "next":["rollercoaster park", "water park"]},
    "water park": {"description":"a place to enjoy water slides and pools", "next":["ticket booth"]},
    "rollercoaster park": {"description":"place filled with rides and games", "next":["ticket booth"]}
};

stories["John"] = {
    "start":"Entrance",
    "end":"Penguins",
    "Entrance": {"description":"The entrance to the zoo.", "next":["Tigers", "Elephants"]},
    "Tigers": {"description":"You've reached the tiger exhibit.", "next":["Elephants", "Penguins"]},
    "Elephants": {"description":"You've reached the elephant exhibit.", "next":["Penguins"]},
    "Penguins": {"description":"You've reached the penguin exhibit. They are adorable."}
};

stories["Kevin / Jon"] = {
    "start":"Master Bedroom",
        "Master Bedroom": {"description":"You just woke up. Your phone tells you its 11:00 AM and you are were supposed to arrive at 9:00 AM to work. Find your keys!!", "next":["Master Bathroom", "Hallway"]},
        "Master Bathroom": {"description":"Doesn't look like you left your keys here. You see yourself in the mirror. You look hideous", "next":["Master Bedroom"]},
        "Hallway": {"description":"Looks empty. There's a few locations you can check from here", "next":["Kitchen","Outside", "Master Bedroom"]},
        "Kitchen": {"description":"Nothing here. Clean up this place, its rough  in here", "next":["Hallway"]},
        "Outside": {"description":"You found the keys! How did you forget them here. Congrats, now get to work.", "next":["Hallway"]}
};

stories["Jeff / Matt"] = {"start":"Office",
                         "end":"Outside",
                         "Office": {"description": "The place you spent way too much time in over the past year",
                         "next": ["Bathroom", "Kitchen"]},
                         "Bathroom": {"description": "Yes", "next": ["Office"]},
                        "Kitchen": {"description": "Food Place", "next": ["Office", "Upstairs Bedroom", "Outside"]},
                        "Upstairs Bedroom": {"description": "Sleep place", "next": ["Kitchen"]},
                        "Outside": {"description": "Not in the house", "next": ["Kitchen"]}};

stories["Julian / Vincent"] = {
          "start":"Dorm",
          "end":"ROOM 107",
          "Dorm":{"description":"You are in your dorm which is the start!", "next":["Hallway","Window"]},
          "Hallway":{"description":"There can only do so much here... like walk and more walk", "next":["Bathroom","Outdoors"]},
          "Window":{"description":"If you jump out you'll die", "next":["Dorm"]},
          "Bathroom":{"description":"You do your daily bathroom routine. Use the toilet, brush your teeth and then use the bathroom again", "next":["Hallway"]},
          "Outdoors":{"description":"You head outside and the sun is beaming on you. You feel like Jesus is watching over you", "next":["Pfahler","Reimert"]},
          "Pfahler":{"description":"The best building in town and where dreams are made of", "next":["ROOM 107"]},
          "Reimert":{"description":"HEY YOU SHOULDN'T BE HERE RIGHT NOW", "next":["Outdoors"]},
          "ROOM 107":{"description":"Welcome to your utopia of CS 477!"}
        }


stories["Tom B / Rich"] = {
    "start":"room",
    "room":{"description":"this is the place that i sleep XD", "next":["bathroom", "wismer", "class", "gym", "bomberger"]},
    "bathroom":{"description":"this is the sacred palace", "next":["room", "wismer", "class", "gym",  "bomberger"]},
    "wismer":{"description":"this is where i get to eat some food", "next":["room", "gym", "bomberger"]},
    "class":{"description":"i hope to learn here", "next":["gym",  "bomberger"]},
    "gym":{"description":"GET BUFF man, LIFT", "next":["bomberger", "room"]},
    "bomberger":{"description":"the place where me and my friends sing to all of the greatest christmas hits ever heard", "next":["room"]}
}


const adventureMenu = document.getElementById("adventureMenu");
const nextMenu = document.getElementById("nextMenu");
function setupMenu() {
    // Step 1: Setup note number chooser
    for (let team in stories) {
        const option = document.createElement("Option");
        option.setAttribute("value", team);
        option.innerHTML = team;
        adventureMenu.appendChild(option);
    }
}
const locationTxt = document.getElementById("location");
const descriptionTxt = document.getElementById("description");


function populateState() {
    if (state in story) {
        locationTxt.innerHTML = state;
        descriptionTxt.innerHTML = story[state].description;
        nextMenu.innerHTML = "";
        for (let i = 0; i < story[state].next.length; i++) {
            const option = document.createElement("Option");
            const place = story[state].next[i];
            option.setAttribute("value", place);
            option.innerHTML = place;
            nextMenu.appendChild(option);
        }
    }
}

function goToNext() {
    state = nextMenu.value;
    if (state == story.end) {
        alert("You made it!");
        locationTxt.innerHTML = state;
        descriptionTxt.innerHTML = story[state].description;
        nextMenu.innerHTML = "";
    }
    else {
        populateState();
    }
}

function startStory() {
    story = stories[adventureMenu.value];
    state = story.start;
    populateState();
}


setupMenu();
let story = {};
let state = "";
