let currentUser = localStorage.getItem('currentUser');
if (!currentUser) window.location.href = 'index.html';

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Chat ma'lumotlari
let chats = JSON.parse(localStorage.getItem(`chats_${currentUser}`)) || {
    personal: { user1: [{ sender: 'User1', text: 'Salom, qalaysan?', time: '10:30' }, { sender: currentUser, text: 'Yaxshi, senchi?', time: '10:31' }] },
    channel: { news: [{ sender: 'Samos News', text: 'Yangilik: Bugun yangi kurs ochildi!', time: '09:00', views: 120 }] },
    group: { devs: [
        { sender: 'User2', text: 'Kod yozishni o‘rganamizmi?', time: '12:00' },
        { sender: 'User3', text: 'Ha, qachon boshlaymiz?', time: '12:01' },
        { sender: currentUser, text: 'Bugun kechqurun?', time: '12:02' }
    ]}
};

document.getElementById('account-name').textContent = currentUser;

const renderMessages = (type, id) => {
    const messagesDiv = document.getElementById('chat-messages');
    messagesDiv.innerHTML = '';
    document.getElementById('chat-title').textContent = document.querySelector(`.chat-item[data-id="${id}"] .chat-name`).textContent;

    if (chats[type][id]) {
        chats[type][id].forEach(msg => {
            const div = document.createElement('div');
            div.className = `message ${msg.sender === currentUser ? 'sent' : 'received'}`;
            div.innerHTML = `
                <span>${msg.text}</span>
                <span class="message-time">${msg.time}</span>
                ${type === 'channel' ? `<span class="message-views">${msg.views} views</span>` : ''}
            `;
            messagesDiv.appendChild(div);
        });
    }

    document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`.chat-item[data-id="${id}"]`).classList.add('active');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

document.querySelectorAll('.chat-item').forEach(item => {
    item.addEventListener('click', () => {
        const type = item.dataset.type;
        const id = item.dataset.id;
        renderMessages(type, id);
    });
});

document.getElementById('send-btn').addEventListener('click', () => {
    const input = document.getElementById('message-input');
    const text = input.value.trim();
    const activeChat = document.querySelector('.chat-item.active');
    if (text && activeChat) {
        const type = activeChat.dataset.type;
        const id = activeChat.dataset.id;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (!chats[type][id]) chats[type][id] = [];
        chats[type][id].push({ sender: currentUser, text, time: time, ...(type === 'channel' && { views: 0 }) });
        localStorage.setItem(`chats_${currentUser}`, JSON.stringify(chats));
        renderMessages(type, id);
        input.value = '';
    }
});

document.getElementById('add-channel-btn').addEventListener('click', () => {
    const name = prompt('Yangi kanal yoki guruh nomini kiriting:');
    if (name) {
        const type = confirm('Bu kanalmi (OK) yoki guruhmi (Cancel)?') ? 'channel' : 'group';
        const id = name.toLowerCase().replace(/\s+/g, '');
        if (!chats[type][id]) {
            chats[type][id] = [];
            localStorage.setItem(`chats_${currentUser}`, JSON.stringify(chats));
            const chatList = document.getElementById('chat-list');
            const div = document.createElement('div');
            div.className = 'chat-item';
            div.dataset.type = type;
            div.dataset.id = id;
            div.innerHTML = `
                <img src="assets/images/profile.jpg" alt="${name}" class="chat-avatar">
                <div class="chat-info">
                    <span class="chat-name">${name}</span>
                    <span class="chat-preview">Hali xabar yo‘q</span>
                    ${type === 'channel' ? '<span class="chat-views">0 views</span>' : ''}
                </div>
            `;
            chatList.appendChild(div);
            div.addEventListener('click', () => renderMessages(type, id));
        }
    }
});

// Birinchi chatni avtomatik tanlash
document.querySelector('.chat-item')?.click();