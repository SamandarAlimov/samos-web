let currentUser = localStorage.getItem('currentUser');
if (!currentUser) window.location.href = 'index.html';

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Moliya ma'lumotlari
let financeData = JSON.parse(localStorage.getItem(`finance_${currentUser}`)) || {
    balance: 5000000,
    cards: [
        { name: 'Humo Karta', number: '**** 1234', balance: 2500000 },
        { name: 'Uzcard', number: '**** 5678', balance: 1800000 }
    ],
    transfers: [
        { to: 'User1', amount: -500000, date: '10.04.2025' },
        { to: 'Kurs uchun to‘lov', amount: -300000, date: '09.04.2025' }
    ],
    savings: [
        { name: '1 Yillik Omonat', amount: 3000000, profit: 450000, term: 12, endDate: '10.04.2026' }
    ]
};

const updateBalance = () => {
    document.getElementById('balance-amount').textContent = `${financeData.balance.toLocaleString()} UZS`;
    localStorage.setItem(`finance_${currentUser}`, JSON.stringify(financeData));
};

const renderCards = () => {
    const cardList = document.getElementById('card-list');
    cardList.innerHTML = '';
    financeData.cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'card-item';
        div.innerHTML = `
            <span class="card-name">${card.name}</span>
            <span class="card-number">${card.number}</span>
            <span class="card-balance">${card.balance.toLocaleString()} UZS</span>
            <button class="card-btn" data-card="${card.name.toLowerCase().replace(/\s+/g, '')}">O‘tkazma</button>
        `;
        cardList.appendChild(div);
    });
};

const renderTransfers = () => {
    const transferList = document.getElementById('transfer-list');
    transferList.innerHTML = '';
    financeData.transfers.forEach(t => {
        const div = document.createElement('div');
        div.className = 'transfer-item';
        div.innerHTML = `
            <span class="transfer-desc">${t.to}</span>
            <span class="transfer-amount">${t.amount.toLocaleString()} UZS</span>
            <span class="transfer-date">${t.date}</span>
        `;
        transferList.appendChild(div);
    });
};

const renderSavings = () => {
    const savingsList = document.getElementById('savings-list');
    savingsList.innerHTML = '';
    financeData.savings.forEach(s => {
        const div = document.createElement('div');
        div.className = 'savings-item';
        div.innerHTML = `
            <span class="savings-name">${s.name}</span>
            <span class="savings-amount">${s.amount.toLocaleString()} UZS</span>
            <span class="savings-profit">+${s.profit.toLocaleString()} UZS (15%)</span>
            <span class="savings-date">Muddat: ${s.endDate}</span>
        `;
        savingsList.appendChild(div);
    });
};

document.getElementById('add-card-btn').addEventListener('click', () => {
    const name = prompt('Karta nomini kiriting (masalan, Visa):');
    if (name) {
        const number = `**** ${Math.floor(1000 + Math.random() * 9000)}`;
        financeData.cards.push({ name, number, balance: 0 });
        renderCards();
        updateBalance();
    }
});

document.getElementById('transfer-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const to = document.getElementById('transfer-to').value.trim();
    const amount = parseInt(document.getElementById('transfer-amount').value);
    if (to && amount > 0 && amount <= financeData.balance) {
        financeData.balance -= amount;
        financeData.transfers.push({ to, amount: -amount, date: new Date().toLocaleDateString() });
        renderTransfers();
        updateBalance();
        document.getElementById('transfer-to').value = '';
        document.getElementById('transfer-amount').value = '';
    } else {
        alert('Summa yetarli emas yoki noto‘g‘ri kiritildi!');
    }
});

document.getElementById('savings-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = parseInt(document.getElementById('savings-amount').value);
    const term = parseInt(document.getElementById('savings-term').value);
    if (amount > 0 && term > 0 && amount <= financeData.balance) {
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + term);
        const profit = Math.round(amount * 0.15 * (term / 12));
        financeData.balance -= amount;
        financeData.savings.push({
            name: `${term} Oylik Omonat`,
            amount,
            profit,
            term,
            endDate: endDate.toLocaleDateString()
        });
        renderSavings();
        updateBalance();
        document.getElementById('savings-amount').value = '';
        document.getElementById('savings-term').value = '';
    } else {
        alert('Summa yetarli emas yoki noto‘g‘ri kiritildi!');
    }
});

document.getElementById('card-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('card-btn')) {
        const cardId = e.target.dataset.card;
        const card = financeData.cards.find(c => c.name.toLowerCase().replace(/\s+/g, '') === cardId);
        const to = prompt('Kimga o‘tkazma qilmoqchisiz?');
        const amount = parseInt(prompt('Qancha summa (UZS)?'));
        if (to && amount > 0 && amount <= card.balance) {
            card.balance -= amount;
            financeData.balance -= amount;
            financeData.transfers.push({ to, amount: -amount, date: new Date().toLocaleDateString() });
            renderCards();
            renderTransfers();
            updateBalance();
        } else {
            alert('Summa yetarli emas yoki noto‘g‘ri kiritildi!');
        }
    }
});

renderCards();
renderTransfers();
renderSavings();
updateBalance();