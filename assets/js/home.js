let currentUser = localStorage.getItem('currentUser');
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let stories = JSON.parse(localStorage.getItem('stories')) || [];

if (!currentUser) window.location.href = 'index.html';

// Logout funksiyasi
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Statik example postlar (agar localStorage bo‘sh bo‘lsa ishlatiladi)
const examplePosts = [
    { user: 'User1', content: 'Just saw an amazing sunset today!', media: null, mediaType: null },
    { user: 'User2', content: 'Check out this cool video I found!', media: 'https://res.cloudinary.com/dxc3e61mg/video/upload/v1234567890/sample.mp4', mediaType: 'video' },
    { user: 'User3', content: 'My latest artwork!', media: 'https://res.cloudinary.com/dxc3e61mg/image/upload/v1234567890/sample.jpg', mediaType: 'image' },
    { user: 'User4', content: '"The only way to do great work is to love what you do." - Steve Jobs', media: null, mediaType: null },
    { user: 'User5', content: 'My latest vlog - Exploring the city!', media: 'https://res.cloudinary.com/dxc3e61mg/video/upload/v1234567890/sample.mp4', mediaType: 'video' },
    { user: 'SamosTeam', content: 'Join our Loyalty Program! Earn points for every post and redeem exclusive rewards!', media: null, mediaType: null }
];

// Stories render qilish
const renderStories = () => {
    const slider = document.getElementById('stories-slider');
    slider.innerHTML = ''; // Statik storiesni saqlamaymiz, chunki dinamik qo‘shiladi
    stories.forEach(story => {
        const div = document.createElement('div');
        div.className = 'story-item';
        div.innerHTML = `<img src="${story.media || 'assets/images/profile.jpg'}" alt="${story.user}"><span>${story.user}</span>`;
        slider.appendChild(div);
    });
};

// Postlarni render qilish (faqat yangi postlarni qo‘shish)
const renderPosts = () => {
    const feed = document.getElementById('posts-feed');
    // Agar posts bo‘sh bo‘lsa, statik HTML postlarni saqlaymiz va example qo‘shmaymiz
    if (posts.length === 0) return; // Statik postlar HTML’da qoladi

    // Yangi dinamik postlarni qo‘shish
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
        feed.insertBefore(div, feed.firstChild); // Yangi postlarni yuqoriga qo‘shamiz
    });
};

// Post qo‘shish va Cloudinary’ga yuklash
document.getElementById('post-btn').addEventListener('click', () => {
    const content = document.getElementById('post-content').value;
    const fileInput = document.getElementById('post-media');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'my_upload_preset');

        fetch('https://api.cloudinary.com/v1_1/dxc3e61mg/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Cloudinary xatosi:', data.error.message);
                return;
            }

            const media = data.secure_url;
            const mediaType = file.type.startsWith('video') ? 'video' : 'image';

            stories.push({ user: currentUser, media });
            localStorage.setItem('stories', JSON.stringify(stories));
            renderStories();

            if (content || media) {
                posts.push({ user: currentUser, content, media, mediaType });
                localStorage.setItem('posts', JSON.stringify(posts));
                document.getElementById('post-content').value = '';
                fileInput.value = '';
                renderPosts();
            }
        })
        .catch(error => console.error('Yuklashda xato:', error));
    } else if (content) {
        posts.push({ user: currentUser, content });
        localStorage.setItem('posts', JSON.stringify(posts));
        document.getElementById('post-content').value = '';
        renderPosts();
    }
});

// DOM yuklanganda
document.addEventListener('DOMContentLoaded', () => {
    const storiesSlider = document.getElementById('stories-slider');
    storiesSlider.addEventListener('click', (e) => {
        const storyItem = e.target.closest('.story-item');
        if (storyItem) {
            const user = storyItem.querySelector('span').textContent;
            alert(`Viewing ${user}'s story!`);
        }
    });

    renderStories();
    renderPosts();
});