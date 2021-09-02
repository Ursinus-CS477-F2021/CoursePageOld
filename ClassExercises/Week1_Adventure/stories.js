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
