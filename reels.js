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
}

let postSaved = [];
let postslikes = [];
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

function loadLocalStorage() {
	let postsAsText = localStorage.getItem("posts");
	let postslikesAsText = localStorage.getItem("postsLikes");
	let postSavedAsText = localStorage.getItem("postSaved");

	if (postsAsText) {
		posts = JSON.parse(postsAsText);
	}

	if (postslikesAsText) {
		postslikes = JSON.parse(postslikesAsText);
	}

	if (postSavedAsText) {
		postSaved = JSON.parse(postSavedAsText);
	}
}

loadLocalStorage();
renderReels();

function renderReels() {
	loadLocalStorage();
	let reelsContainer = document.getElementById("reelsContainer");
	reelsContainer.innerHTML = "";

	for (let i = posts.length - 1; i >= 0; i--) {
		const post = posts[i];
		if (post.hasOwnProperty("video")) {
			reelsContainer.innerHTML += /*html*/ `
			${loadReels(post, i)}
				`;
			if (postslikes.includes(post.name)) {
				document.getElementById(`heartSaved${i}`).classList.add("d-none");
				document
					.getElementById(`heart-fillSaved${i}`)
					.classList.remove("d-none");
			}

			let commentContent = document.getElementById(`comments${i}`);

			for (let j = 0; j < post["comments"].length; j++) {
				const comment = post["comments"][j];
				commentContent.innerHTML += /*html*/ `<div>${comment}  <a class="delete-comment">delete</a></div>`;
			}
		}
	}
}

function loadReels(post, i) {
	return /*html*/ `
	<div class="reel-container">
				<div class="card-headline">
					<img class="card-icon" src="${post["image"]}" alt="image">
					<div>
						<h4>${post["name"]} <small>${post.date}</small></h4>
						<small>${post["location"]}</small>
					</div>
				</div>
				<div class="card-body">
				<video class="reel" controls>
					<source src="${post.video}">
				Your browser does not support the video tag.
				</video>
				<div class="post-icons">
					<div class="icons-left">
						<img id="heartSaved${i}" src="./img/icon/heart.svg" alt="heart">
						<img id="heart-fillSaved${i}" src="./img/icon/heart-fill.svg" alt="heart-fill" class="heart-fill d-none" >
						<img src="./img/icon/chat.svg" alt="chat">
						<img src="./img/icon/send.svg" alt="send">
					</div>
					<div class="icons-right">
						<img id="save${i}" src="./img/icon/bookmark.svg" alt="save">
						
					</div>
				</div>
				<div id="likes-quantity${i}" class="likes-quantity">${post["likes"]} likes</div>
				</div>
				<div class="description">${post["description"]}</div>
				<div class="container-comment-postSaved">
					<div id="comments${i}" class="comments"></div>
					<div class="buttons-comments">
						<input type="text" id="inputAddComment${i}" placeholder="comment something"><button>comment</button>
					</div>
				</div>
			</div>	
		</div>	
	`;
}

function saveLocalStorage() {
	let postsAsText = JSON.stringify(posts);
	localStorage.setItem("posts", postsAsText);

	let postslikesAsText = JSON.stringify(postslikes);
	localStorage.setItem("postsLikes", postslikesAsText);

	let postSavedAsText = JSON.stringify(postSaved);
	localStorage.setItem("postSaved", postSavedAsText);
}
