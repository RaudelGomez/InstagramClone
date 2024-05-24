/* import { loadHTMLPost } from "./htmltemplates"; */

let stories = [
	{
		image: "./img/cat.jpg",
		name: "cat",
	},
	{
		image: "./img/squirrel.jpg",
		name: "squirrel",
	},
	{
		image: "./img/dessert.jpg",
		name: "dessert",
	},
	{
		image: "./img/rose.jpg",
		name: "rose",
	},
	{
		image: "./img/flower-pink.jpg",
		name: "flower",
	},
	{
		image: "./img/castle.jpg",
		name: "castle",
	},
	{
		image: "./img/rose.jpg",
		name: "rose",
	},
	{
		image: "./img/flower-pink.jpg",
		name: "flower",
	},
	{
		image: "./img/castle.jpg",
		name: "castle",
	},
];

let posts = [
	{
		image: "./img/cat.jpg",
		name: "cat",
		location: "Munich",
		likes: 140,
		date: "03. May",
		description: "Beautiful cat 😺",
		comments: ["Sweeat Katty", "I want some like this"],
	},
	{
		image: "./img/angular-logo.png",
		video: "./img/test1.mp4",
		name: "Developer Akademie",
		location: "Munich",
		likes: 10000000,
		date: "07. May",
		description: "How to learn angular",
		comments: ["Amazing"],
	},
	{
		image: "./img/castle.jpg",
		name: "Castle",
		location: "Berlin",
		likes: 40,
		date: "01. May",
		description: "Wonderful castle 😺",
		comments: [],
	},
	{
		image: "./img/dessert.jpg",
		name: "Dessert",
		location: "Koln",
		likes: 99,
		date: "03. April",
		description: "Amazing dessert",
		comments: [],
	},
	{
		image: "./img/flower-pink.jpg",
		name: "Flower",
		location: "Hamburg",
		likes: 1400,
		date: "30. January",
		description: "Flower are always beautiful 💐",
		comments: [],
	},
	{
		image: "./img/rose.jpg",
		name: "Rose",
		location: "Frankfurt",
		likes: 49,
		date: "01. Feb",
		description: "Rose rose and more rose 🌹",
		comments: [],
	},
	{
		image: "./img/angular-logo.png",
		video: "./img/test2.mp4",
		name: "Developer Akademie2",
		location: "Munich",
		likes: 999,
		date: "07. May",
		description: "How to learn Typescript",
		comments: ["Krass"],
	},
	{
		image: "./img/squirrel.jpg",
		name: "Squirrel",
		location: "New York",
		likes: 999,
		date: "01.Dec",
		description: "That is so sweet 😺",
		comments: [],
	},
];

let suggestionsArray = [
	{
		image: "./img/user1.jpg",
		name: "Lili",
		hint: "Suggested for you",
		followed: false,
	},
	{
		image: "./img/user3.jpg",
		name: "Carmen",
		hint: "Follows you",
		followed: false,
	},
	{
		image: "./img/user2.jpg",
		name: "Paul",
		hint: "Follows you",
		followed: false,
	},
	{
		image: "./img/user4.jpg",
		name: "Peter",
		hint: "Suggest for you",
		followed: false,
	},
];

let postslikes = [];
let postSaved = [];

async function includeHTML() {
	let includeElements = document.querySelectorAll("[w3-include-html]");
	for (let i = 0; i < includeElements.length; i++) {
		const element = includeElements[i];
		file = element.getAttribute("w3-include-html"); // "includes/header.html"
		let resp = await fetch(file);
		if (resp.ok) {
			element.innerHTML = await resp.text();
		} else {
			element.innerHTML = "Page not found";
		}
	}
	render();
}

function render() {
	renderSories();
	renderPost();
	renderSuggestions();
}

function renderSories() {
	let allStories = document.getElementById("all-stories");
	allStories.innerHTML = "";

	for (let i = 0; i < stories.length; i++) {
		const story = stories[i];
		allStories.innerHTML += /*html*/ `
      <figure>
        <a href="#">
          <img src=${story["image"]} alt="story">
          <figcaption>${story["name"]}</figcaption>
          </a>
      </figure>
    `;
	}
}

function renderPost() {
	loadLocalStorage();
	let postsContent = document.getElementById("posts");
	postsContent.innerHTML = "";

	for (let i = posts.length - 1; i >= 0; i--) {
		const post = posts[i];

		if (post.hasOwnProperty("video")) {
			postsContent.innerHTML += /*html*/ `
			${loadReel(post, i)}
				`;
		} else {
			postsContent.innerHTML += /*html*/ `
			${loadHTMLPost(post, i)}
		`;
		}
		if (postslikes.includes(post.name)) {
			document.getElementById(`heart${i}`).classList.add("d-none");
			document.getElementById(`heart-fill${i}`).classList.remove("d-none");
		}
		if (searchingPost(i) != -1) {
			document.getElementById(`save${i}`).classList.add("d-none");
			document.getElementById(`unSave${i}`).classList.remove("d-none");
		}

		let commentContent = document.getElementById(`comments${i}`);

		for (let j = 0; j < post["comments"].length; j++) {
			const comment = post["comments"][j];
			commentContent.innerHTML += /*html*/ `<div>${comment}  <a class="delete-comment" onclick="deleteComment(${i}, ${j})
			">delete</a></div>`;
		}
	}
}

function addComment(i) {
	let inputComment = document.getElementById(`inputAddComment${i}`).value;
	posts[i]["comments"].push(inputComment);
	let indexElementPostSaved = postSaved.findIndex(
		(post) => post.name == posts[i].name
	);
	if (indexElementPostSaved !== -1) {
		postSaved[indexElementPostSaved].comments.push(inputComment);
	}
	saveLocalStorage();
	renderPost();
}

function deleteComment(i, j) {
	posts[i]["comments"].splice(j, 1);
	let indexElementPostSaved = postSaved.findIndex(
		(post) => post.name == posts[i].name
	);
	if (indexElementPostSaved !== -1) {
		postSaved[indexElementPostSaved].comments.splice(j, 1);
	}
	saveLocalStorage();
	renderPost();
}

function addLike(post, i) {
	postslikes.push(post);
	posts[i].likes++;
	let indexElementPostSaved = postSaved.findIndex(
		(post) => post.name == posts[i].name
	);
	if (indexElementPostSaved !== -1) {
		postSaved[indexElementPostSaved].likes++;
	}
	saveLocalStorage();
	renderPost();
}

function restLike(post, i) {
	let indexPhotoFound = postslikes.findIndex((photo) => photo == post);
	let indexElementPostSaved = postSaved.findIndex(
		(post) => post.name == posts[i].name
	);
	console.log(indexElementPostSaved);
	if (indexElementPostSaved !== -1) {
		postSaved[indexElementPostSaved].likes--;
	}
	posts[i].likes--;
	console.log(posts[i]);
	postslikes.splice(indexPhotoFound, 1);
	saveLocalStorage();
	renderPost();
}

function savePost(i) {
	postSaved.push(posts[i]);
	saveLocalStorage();
	renderPost();
}

function searchingPost(i) {
	let postIndexFounded = postSaved.findIndex(
		(post) => post.name == posts[i].name
	);
	return postIndexFounded;
}

function unSavePost(i) {
	let indexPhotoFound = postSaved.findIndex(
		(post) => post.name == posts[i].name
	);
	postSaved.splice(indexPhotoFound, 1);
	saveLocalStorage();
	renderPost();
}

function renderSuggestions() {
	loadLocalStorage();
	let suggestionsContainer = document.getElementById("suggestions");
	suggestionsContainer.innerHTML = "";

	for (let i = 0; i < suggestionsArray.length; i++) {
		const user = suggestionsArray[i];
		suggestionsContainer.innerHTML += /*html*/ `
			${loadFollower(user, i)}
		`;
		if (user.followed) {
			document.getElementById(`follow${i}`).classList.add("d-none");
			document.getElementById(`followed${i}`).classList.remove("d-none");
		}
	}
}

function follow(i) {
	suggestionsArray[i].followed = true;
	saveLocalStorage();
	renderSuggestions();
}

function followed(i) {
	suggestionsArray[i].followed = false;
	saveLocalStorage();
	renderSuggestions();
}

function saveLocalStorage() {
	let postsAsText = JSON.stringify(posts);
	localStorage.setItem("posts", postsAsText);

	let postslikesAsText = JSON.stringify(postslikes);
	localStorage.setItem("postsLikes", postslikesAsText);

	let suggestionsArrayAsText = JSON.stringify(suggestionsArray);
	localStorage.setItem("suggestionsArray", suggestionsArrayAsText);

	let postSavedAsText = JSON.stringify(postSaved);
	localStorage.setItem("postSaved", postSavedAsText);
}

function loadLocalStorage() {
	let postsAsText = localStorage.getItem("posts");
	let postslikesAsText = localStorage.getItem("postsLikes");
	let suggestionsArrayAsText = localStorage.getItem("suggestionsArray");
	let postSavedAsText = localStorage.getItem("postSaved");

	if (postsAsText) {
		posts = JSON.parse(postsAsText);
	}
	if (postslikesAsText) {
		postslikes = JSON.parse(postslikesAsText);
	}
	if (suggestionsArrayAsText) {
		suggestionsArray = JSON.parse(suggestionsArrayAsText);
	}
	if (postSavedAsText) {
		postSaved = JSON.parse(postSavedAsText);
	}
}
