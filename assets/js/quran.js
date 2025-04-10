document.addEventListener('DOMContentLoaded', () => {
    const quranList = document.getElementById('quran-list');

    // API’dan ma'lumot olish funksiyasi
    async function fetchQuranData() {
        try {
            // Faqat Al-Fatihah uchun test qilamiz, keyin 114 tagacha kengaytiramiz
            for (let chapter = 1; chapter <= 114; chapter++) {
                // Matn va tarjimani olish
                const textResponse = await fetch(
                    `https://api.quran.com/api/v4/verses/by_chapter/${chapter}?language=en&words=true&translations=131`
                );
                const textData = await textResponse.json();

                // Audio olish (Mishary Alafasy, ID: 7)
                const audioResponse = await fetch(
                    `https://api.quran.com/api/v4/chapter_recitations/7/${chapter}`
                );
                const audioData = await audioResponse.json();

                // Sura nomini olish
                const chapterResponse = await fetch(
                    `https://api.quran.com/api/v4/chapters/${chapter}?language=en`
                );
                const chapterData = await chapterResponse.json();

                // Ma'lumotlar mavjudligini tekshirish
                const chapterName = chapterData.chapter?.name_simple || `Surah ${chapter}`;
                const firstVerse = textData.verses?.[0] || {};
                const arabicText = firstVerse.text_uthmani || 'Matn topilmadi';
                const translation = firstVerse.translations?.[0]?.text || 'Translation not available';
                const audioUrl = audioData.audio_file?.audio_url || '';

                // Har bir sura uchun element yaratamiz
                const quranItem = document.createElement('div');
                quranItem.classList.add('quran-item');
                quranItem.innerHTML = `
                    <h4>Surah ${chapterName} (${chapter})</h4>
                    <div class="quran-text">${arabicText}</div>
                    <div class="quran-translation">${translation}</div>
                    <audio class="quran-audio" controls src="${audioUrl}"></audio>
                `;

                quranList.appendChild(quranItem);
            }
        } catch (error) {
            console.error('API’dan ma\'lumot olishda xato:', error);
            quranList.innerHTML = '<p>Xatolik yuz berdi. Keyinroq qayta urinib ko‘ring.</p>';
        }
    }

    // Funksiyani chaqiramiz
    fetchQuranData();
});