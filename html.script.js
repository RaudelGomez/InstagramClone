function loadHTMLPost(post, i) {
	return /*html */ `
		<div class="card">
			<div class="card-headline">
				<img class="card-icon" src="${post["image"]}" alt="image">
				<div>
					<h4>${post["name"]} <small>${post.date}</small></h4>
					<small>${post["location"]}</small>
				</div>
			</div>
			<div class="card-body">
				<img class="post-img" src="${post["image"]}" alt="image">
				<div class="post-icons">
					<div class="icons-left">
						<img id="heart${i}" src="./img/icon/heart.svg" alt="heart" onclick='addLike("${post["name"]}", ${i})'>
						<img id="heart-fill${i}" src="./img/icon/heart-fill.svg" alt="heart-fill" class="heart-fill d-none" onclick='restLike("${post["name"]}", ${i})'>
						<img src="./img/icon/chat.svg" alt="chat">
						<img src="./img/icon/send.svg" alt="send">
					</div>
					<div class="icons-right">
						<img id="save${i}" src="./img/icon/bookmark.svg" alt="save" onclick='savePost(${i})'>
						<img id="unSave${i}" src="./img/icon/bookmark-fill.svg" alt="dont save" class="d-none" onclick='unSavePost(${i})'>
					</div>
				</div>
				<div id="likes-quantity${i}" class="likes-quantity">${post["likes"]} likes</div>
			</div>
			<div class="description">${post["description"]}</div>
			<div class="container-comment">
				<div id="comments${i}" class="comments"></div>
				<div class="buttons-comments">
					<input type="text" id="inputAddComment${i}" placeholder="comment something"><button onclick="addComment(${i})">comment</button>
				</div>
			</div>
	</div>`;
}

function loadReel(post, i) {
	return /*html*/ `
	<div class="card">
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
						<img id="heart${i}" src="./img/icon/heart.svg" alt="heart" onclick='addLike("${post["name"]}", ${i})'>
						<img id="heart-fill${i}" src="./img/icon/heart-fill.svg" alt="heart-fill" class="heart-fill d-none" onclick='restLike("${post["name"]}", ${i})'>
						<img src="./img/icon/chat.svg" alt="chat">
						<img src="./img/icon/send.svg" alt="send">
					</div>
					<div class="icons-right">
						<img id="save${i}" src="./img/icon/bookmark.svg" alt="save" onclick='savePost(${i})'>
						<img id="unSave${i}" src="./img/icon/bookmark-fill.svg" alt="dont save" class="d-none" onclick='unSavePost(${i})'>
					</div>
				</div>
				<div id="likes-quantity${i}" class="likes-quantity">${post["likes"]} likes</div>
				</div>
				<div class="description">${post["description"]}</div>
				<div class="container-comment">
					<div id="comments${i}" class="comments"></div>
					<div class="buttons-comments">
						<input type="text" id="inputAddComment${i}" placeholder="comment something"><button onclick="addComment(${i})">comment</button>
					</div>
				</div>
			</div>	
		</div>	
	`;
}

function loadFollower(user, i) {
	return /*html */ `
		<div class="suggestion-container">
			<div class="suggestion">
				<img class="suggestion-img" src="${user.image}" alt="suggestions pic" />
				<div class="suggestion-data">
					<span>${user.name}</span>
					<span class="suggestion-hint">${user.hint}</span>
				</div>
			</div>
			<div class="buttons-suggestions">
				<a href="#" id="follow${i}" onclick="follow(${i})">
					follow
				</a>
				<a href="#" id="followed${i}" class="d-none" onclick="followed(${i})">
					followed
				</a>
			</div>
		</div>
	`;
}
