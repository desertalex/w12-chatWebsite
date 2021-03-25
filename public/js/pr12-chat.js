const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const chatBox = document.getElementById('chatBox')
const messageEl = document.getElementById('message')
const user = document.getElementById('user')
const date = new Date() // Date implementation

socket.on('newMessage', data => {
    console.log('new message received');
    addMessage(data, false)
})

// A simple async POST request function
const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json()
}

// A simple async POST request function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

// Post message to board
const postMessage = () => {
    const data = {
        message: messageEl.value,
        user: user.value
    }
    addMessage(data, true);
    messageEl.value = '';
    socket.emit('message', data);
}

// Add message from any user to chatbox, determine if added
// by current user.
const addMessage = (data = {}, user = false) => {
    const li = document.createElement('li');
    li.className = 'message';
    if (user) {
        li.className = 'message uMessage';
    }
    const d = new Date();
    const h = d.getHours();
    var m = d.getMinutes();
    if (m < 10) {
        m = '0' + m;
    }
    var s = d.getSeconds();
    if (s < 10) {
        s = '0' + s;
    }
    const time = h + ':' + m + ':' + s;
    const boldUser = document.createElement('b').appendChild(document.createTextNode(data.user));
    msg = time + ' <b>' + data.user + '</b>: ' + data.message;
    li.innerHTML = msg;
    chatBox.appendChild(li)
}
