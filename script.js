"use strict";
// buttons
const moon = document.querySelector(".moon");
const dark = document.querySelector(".dark");
const sun = document.querySelector(".sun");
const light = document.querySelector(".light");
const root = document.documentElement.style;
const contentBox = document.querySelector(".content-conteiner")
const secondBox = document.querySelector(".second-box");
const logo = document.querySelector(".logo");
const logos = document.querySelectorAll(".logos");
const search = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-click");
const avatar = document.querySelector(".user-image");
const name = document.querySelector(".user-text-headline");
const tagName = document.querySelector(".user-text-hashtag");
const joinDate = document.querySelector(".user-text-date");
const bio = document.querySelector(".content-conteiner-text");
const repos = document.querySelector(".repository-numbers");
const followers = document.querySelector(".followers-numbers");
const following = document.querySelector(".following-numbers");
const locationBox = document.querySelector(".location");
const twitterBox = document.querySelector(".twitter");
const githubBox = document.querySelector(".github");
const companyBox = document.querySelector(".company");
const locationText = document.querySelector(".location-text");
const twitter = document.querySelector(".twitter-txt");
const github = document.querySelector(".github-text");
const company = document.querySelector(".company-text");
//count for change theame
let theameCount = 0;

// take out string shorter version
function getSubstring(str, char1, char2) {
    return str.substring(
      str.indexOf(char1) + 1,
      str.lastIndexOf(char2)
    );
}

// octacat user fetch
fetch('https://api.github.com/users/octocat')
	.then((res) => res.json())
	.then((data) => update(data));

    searchButton.addEventListener("click", getUserInfo);

// fetch user with input text
function getUserInfo() {
	fetch(`https://api.github.com/users/${search.value}`)
		.then((res) => res.json())
		.then((data) => update(data))
}

// user information
function update(date) {
    avatar.src = date.avatar_url;
    name.innerHTML = date.name;
    if(name.innerHTML == "undefined") {
        search.value = "";
        search.placeholder= "No results"
        root.setProperty("--placeholder", "#F74646");
        contentBox.style.display = "none";   
    }
    if(name.innerHTML !== "undefined") {
        contentBox.style.display = "block";
        search.placeholder= "Search Github username..."
        root.setProperty("--placeholder", "#4b6a9b");
    }
    twitter.innerHTML = "";
    company.innerHTML == "";
    locationText.innerHTML == "";
    locationBox.classList.remove("not-availible");
    companyBox.classList.remove("not-availible");
    twitterBox.classList.remove("not-availible");
    tagName.innerHTML = `@${date.login}`;
    const str2 = date.created_at;
    const substr2 = getSubstring(str2, '', 'T');
    joinDate.innerHTML = `joined 2${substr2}`;
    bio.innerHTML = date.bio;
    if(bio.innerHTML == "") {
        bio.innerHTML = `${search.value} bio is empty`;
    }
    repos.innerHTML = date.public_repos;
    followers.innerHTML = date.followers;
    following.innerHTML = date.following;
    locationText.innerHTML = date.location;
    if(locationText.innerHTML == "") {
        locationBox.classList.add("not-availible");
        locationText.innerHTML = "Not Available";
        locationBox.href= "#";
    }
    github.innerHTML = "Github Link";
    github.href = date.html_url;
    if(github.innerHTML == "") {
        githubBox.classList.add("not-availible");
        github.innerHTML = "Not Available";
        githubBox.href= "#";
    }
    twitter.innerHTML = date.twitter_username;
    twitter.href = `https://twitter.com/${date.twitter_username}`;
    if(twitter.innerHTML == "") {
        twitterBox.classList.add("not-availible");
        twitter.innerHTML = "Not Available";
        twitterBox.href= "#";
    }
    company.innerHTML = date.company;
    if(company.innerHTML == "") {
        companyBox.classList.add("not-availible");
        company.innerHTML = "Not Available";
        companyBox.href= "#";
    }
}

//theme listener
secondBox.addEventListener("click", () => {
    theameCount++; 
    if(theameCount%2==1) {
        darkMode();
    }
    else {
        lightMode();
    }
})

// dark theame
function darkMode() {
    root.setProperty("--body-color", "#141D2F");
    root.setProperty("--logo-background", "#ffffff");
    root.setProperty("--content", "#1E2A47");
    root.setProperty("--text", "#FFFFFF");
    root.setProperty("--black-text", "#ffffff");
    root.setProperty("--shadow", "--remove-shadow");
    root.setProperty("--date", "#ffffff");
    root.setProperty("--user-background", "#141D2F");
    root.setProperty("--logos", "invert(100%) sepia(96%) saturate(14%) hue-rotate(235deg) brightness(1104%) contrast(102%)");
    moon.classList.add("hidden");
    sun.classList.remove("hidden");
    dark.classList.add("hidden");
    light.classList.remove("hidden");
}

// light theame
function lightMode() {
    root.setProperty("--body-color", "#f6f8ff");
    root.setProperty("--logo-background", "#222731");
    root.setProperty("--content", "#fefefe");
    root.setProperty("--text", "#4b6a9b");
    root.setProperty("--shadow", "0px 16px 30px -10px rgba(70, 96, 187, 0.2)");
    root.setProperty("--black-text", "#2b3442");
    root.setProperty("--date", "#697C9A");
    root.setProperty("--user-background", "#F6F8FF");
    root.setProperty("--logos", "");
    moon.classList.remove("hidden");
    sun.classList.add("hidden");
    dark.classList.remove("hidden");
    light.classList.add("hidden");
}