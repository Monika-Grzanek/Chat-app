const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList  = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput  = document.getElementById('message-content');

let userName;

function login(event) {
    event.preventDefault();
    if(userNameInput){
        userName = userNameInput.value;
        loginForm.classList.add('show');
        messagesSection.classList.remove('show');
    } else {
        alert('You must enter your name!')
    }
};

function sendMessage(event) {
    event.preventDefault();
    if(messageContentInput.value){
        addMessage(userName, messageContentInput.value);
        messageContentInput.value = '';
    } else {
        alert('You must enter the text of message')
    }
}

loginForm.addEventListener('submit', login);

addMessageForm.addEventListener('submit', sendMessage);