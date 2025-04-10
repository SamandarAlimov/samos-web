let currentUser = localStorage.getItem('currentUser');
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let stories = JSON.parse(localStorage.getItem('stories')) || [];

if (!currentUser) window.location.href = 'index.html';

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

const renderStories = () => {
    const slider = document.getElementById('stories-slider');
    stories.forEach(story => {
        const div = document.createElement('div');
        div.className = 'story-item';
        div.innerHTML = `<img src="${story.media || 'assets/images/profile.jpg'}" alt="${story.user}"><span>${story.user}</span>`;
        slider.appendChild(div);
    });
};

const renderPosts = () => {
    const feed = document.getElementById('posts-feed');
    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = `post ${post.mediaType || 'twitter-style'}`;
        div.innerHTML = `
            <div class="post-header">
                <img src="assets/images/profile.jpg" alt="${post.user}" class="post-avatar">
                <div class="post-user">
                    <span class="username">${post.user}</span>
                    <span class="handle">@${post.user.split('@')[0]} · Just now</span>
                </div>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
                ${post.media ? (post.mediaType === 'video' ? 
                    `<video controls src="${post.media}" class="post-media"></video>` : 
                    `<img src="${post.media}" alt="Post" class="post-media">`) : ''}
            </div>
            <div class="post-actions">
                <button class="action-btn like">❤️ 0</button>
                <button class="action-btn comment">💬 0</button>
                <button class="action-btn repost">🔄 0</button>
                <button class="action-btn share">📤</button>
            </div>
        `;
        feed.appendChild(div);
    });
};

document.getElementById('post-btn').addEventListener('click', () => {
    const content = document.getElementById('post-content').value;
    const fileInput = document.getElementById('post-media');
    let media = null, mediaType = null;

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        media = URL.createObjectURL(file);
        mediaType = file.type.startsWith('video') ? 'video' : 'image';
        stories.push({ user: currentUser, media });
        localStorage.setItem('stories', JSON.stringify(stories));
        renderStories();
    }

    if (content || media) {
        posts.push({ user: currentUser, content, media, mediaType });
        localStorage.setItem('posts', JSON.stringify(posts));
        document.getElementById('post-content').value = '';
        fileInput.value = '';
        renderPosts();
    }
});

renderStories();
renderPosts();