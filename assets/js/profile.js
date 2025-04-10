let currentUser = localStorage.getItem('currentUser');
if (!currentUser) window.location.href = 'index.html';

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Profil ma'lumotlari
let profileData = JSON.parse(localStorage.getItem(`profile_${currentUser}`)) || {
    username: currentUser,
    fullname: 'Full Name',
    bio: 'Bu yerda qisqacha bio bo‘ladi...',
    contact: 'example@email.com',
    posts: [
        { type: 'image', content: 'Bu mening birinchi postim!', media: 'assets/images/post.jpg', date: '10.04.2025' },
        { type: 'video', content: 'Yangi video!', media: 'assets/images/video.mp4', date: '09.04.2025' }
    ],
    followers: 120,
    following: 85
};

const renderProfile = () => {
    document.getElementById('profile-username').textContent = `@${profileData.username}`;
    document.getElementById('profile-fullname').textContent = profileData.fullname;
    document.getElementById('profile-bio').textContent = profileData.bio;
    document.getElementById('profile-contact').textContent = `Email: ${profileData.contact}`;
    document.getElementById('posts-count').textContent = profileData.posts.length;
    document.getElementById('followers-count').textContent = profileData.followers;
    document.getElementById('following-count').textContent = profileData.following;

    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = '';
    profileData.posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post-item';
        div.innerHTML = `
            ${post.type === 'image' ? `<img src="${post.media}" alt="Post" class="post-image">` : 
            `<video src="${post.media}" controls class="post-video"></video>`}
            <p>${post.content}</p>
            <span class="post-date">${post.date}</span>
        `;
        postsList.appendChild(div);
    });
};

document.getElementById('edit-profile-btn').addEventListener('click', () => {
    const form = document.getElementById('settings-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    document.getElementById('edit-username').value = profileData.username;
    document.getElementById('edit-fullname').value = profileData.fullname;
    document.getElementById('edit-bio').value = profileData.bio;
    document.getElementById('edit-contact').value = profileData.contact;
});

document.getElementById('edit-profile-form').addEventListener('submit', (e) => {
    e.preventDefault();
    profileData.username = document.getElementById('edit-username').value.trim();
    profileData.fullname = document.getElementById('edit-fullname').value.trim();
    profileData.bio = document.getElementById('edit-bio').value.trim();
    profileData.contact = document.getElementById('edit-contact').value.trim();
    localStorage.setItem(`profile_${currentUser}`, JSON.stringify(profileData));
    renderProfile();
    document.getElementById('settings-form').style.display = 'none';
});

// Kun/Tun rejimi
const toggleTheme = () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-toggle').textContent = isDark ? '☀️' : '🌙';
};

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Sahifa yuklanganda mavjud rejimni qo‘llash
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    document.getElementById('theme-toggle').textContent = '☀️';
}

renderProfile();