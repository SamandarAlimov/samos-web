let currentUser = localStorage.getItem('currentUser');
if (!currentUser) window.location.href = 'index.html';

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Progress va kurs holatini saqlash
let progress = JSON.parse(localStorage.getItem(`progress_${currentUser}`)) || {
    web: { started: false, completed: false },
    data: { started: false, completed: false },
    design: { started: false, completed: false },
    quizCorrect: 0,
    quizTotal: 1
};

const updateProgress = () => {
    const completedCourses = Object.values(progress).filter(item => typeof item === 'object' && item.completed).length;
    const totalCourses = 3;
    const quizScore = progress.quizCorrect / progress.quizTotal;
    const totalProgress = ((completedCourses / totalCourses) * 0.7 + quizScore * 0.3) * 100;
    
    document.getElementById('progress-fill').style.width = `${totalProgress}%`;
    document.getElementById('progress-text').textContent = `${Math.round(totalProgress)}% bajarildi`;
    localStorage.setItem(`progress_${currentUser}`, JSON.stringify(progress));
};

const updateCourseStatus = () => {
    document.querySelectorAll('.course-item').forEach(item => {
        const course = item.querySelector('.course-btn').dataset.course;
        const status = item.querySelector('.course-status');
        if (progress[course].completed) {
            status.textContent = 'Tugallandi';
            status.style.color = '#00C4B4';
        } else if (progress[course].started) {
            status.textContent = 'Boshlangan';
            status.style.color = '#007AFF';
        } else {
            status.textContent = 'Boshlanmagan';
            status.style.color = '#FF2D55';
        }
    });
};

document.querySelectorAll('.course-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const course = btn.dataset.course;
        if (!progress[course].started) {
            progress[course].started = true;
        } else if (!progress[course].completed) {
            progress[course].completed = true;
        }
        updateCourseStatus();
        updateProgress();
    });
});

document.querySelectorAll('.quiz-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const isCorrect = btn.dataset.answer === 'correct';
        if (isCorrect) {
            progress.quizCorrect++;
            document.getElementById('quiz-result').textContent = 'To‘g‘ri javob!';
            document.getElementById('quiz-result').style.color = '#00C4B4';
            btn.classList.add('correct');
        } else {
            document.getElementById('quiz-result').textContent = 'Noto‘g‘ri javob!';
            document.getElementById('quiz-result').style.color = '#FF2D55';
            btn.classList.add('wrong');
        }
        document.querySelectorAll('.quiz-btn').forEach(b => b.disabled = true);
        updateProgress();
    });
});

updateCourseStatus();
updateProgress();