import axios from 'axios';

const addCommentsForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');
let deleteCommentBtn = commentList.children;

const decreaseNumber = () => {
	commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = element => {
	element.remove();
	decreaseNumber();
};

const handleDeleteComment = async event => {
	const commentId = event.path[0].getAttribute('data-id');

	const comment = document.querySelectorAll('.video__comments-list li span')[1].innerHTML;
	const videoId = window.location.href.split('/videos/')[1];
	const response = await axios({
		url: `/api/${videoId}/delete/comment`,
		method: 'POST',
		data: {
			commentId,
			comment,
		},
	});
	if (response.status === 200) {
		deleteComment(event.path[1]);
	}
};

const increaseNumber = () => {
	commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = comment => {
	const li = document.createElement('li');
	const span = document.createElement('span');
	const span2 = document.createElement('span');
	span.innerHTML = comment;
	span2.className = 'delete__comment';
	span2.innerHTML = 'X';
	li.appendChild(span2);
	li.appendChild(span);
	commentList.prepend(li);
	document.querySelector('.delete__comment').addEventListener('click', handleDeleteComment);
	increaseNumber();
};

const sendComment = async comment => {
	const videoId = window.location.href.split('/videos/')[1];
	const response = await axios({
		url: `/api/${videoId}/comment`,
		method: 'POST',
		data: {
			comment,
		},
	});

	if (response.status === 200) {
		addComment(comment);
	}
};

const handleSubmit = event => {
	event.preventDefault();
	const commentInput = addCommentsForm.querySelector('input');
	const comment = commentInput.value;
	sendComment(comment);
	commentInput.value = '';
};

function init() {
	addCommentsForm.addEventListener('submit', handleSubmit);
	for (let i = 0; i < deleteCommentBtn.length; i++) {
		if (deleteCommentBtn[i].querySelector('.delete__comment')) {
			deleteCommentBtn[i]
				.querySelector('.delete__comment')
				.addEventListener('click', handleDeleteComment);
		}
	}
}

if (addCommentsForm) {
	init();
}
