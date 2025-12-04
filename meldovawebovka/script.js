// --- DATA (Vloženo přímo pro spolehlivost) ---

const images = [
    { src: 'img/melichar1.jpg', caption: 'Rozehrávka a přehled ve hře' },
    { src: 'img/melichar4.jpg', caption: 'Dlouhý výkop - akce začíná' },
    { src: 'img/melichar3.jpg', caption: 'Soustředění před standardní situací' }
];

const statsData = {
    "last_updated": "4. 12. 2025",
    "stats": [
        // Změna: Přidal jsem SVG ikony přímo do dat pro jednodušší renderování
        { 
            "key": "matches", "value": "12", 
            "label_cs": "Zápasy", "label_en": "Matches",
            "icon": '<svg class="w-8 h-8 mb-4 text-pribramGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
        },
        { 
            "key": "cleansheets", "value": "4", 
            "label_cs": "Čistá konta", "label_en": "Clean Sheets",
            "icon": '<svg class="w-8 h-8 mb-4 text-pribramGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
        },
        { 
            "key": "minutes", "value": "1080", 
            "label_cs": "Minuty", "label_en": "Minutes",
            "icon": '<svg class="w-8 h-8 mb-4 text-pribramGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>'
        },
        { 
            "key": "saves", "value": "89%", // Příklad nové statistiky
            "label_cs": "Úspěšnost", "label_en": "Save Rate",
            "icon": '<svg class="w-8 h-8 mb-4 text-pribramGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>'
        }
    ]
};

const articlesData = [
    { title: "Příbram má novou oporu v bráně", url: "#", source: "Příbram.cz", date: "2024" },
    { title: "Profil hráče: Martin Melichar", url: "https://www.transfermarkt.com/martin-melichar/profil/spieler/568832", source: "Transfermarkt", date: "Info" },
    { title: "Soupiska FK Viagem Příbram", url: "https://www.fkviagem.cz/", source: "Oficiální web", date: "2025" }
];

// --- LOGIKA ---

function loadStats() {
    const container = document.getElementById('stats-container');
    if (!container) return;

    container.innerHTML = statsData.stats.map(stat => `
        <div class="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-pribramGreen/50 transition duration-300 group text-center flex flex-col items-center justify-center">
            ${stat.icon}
            <span class="text-4xl md:text-5xl font-display font-bold text-white mb-2 group-hover:scale-110 transition duration-300">${stat.value}</span>
            <span class="text-xs uppercase tracking-widest text-zinc-400 font-semibold" data-stat-key="${stat.key}">${stat.label_cs}</span>
        </div>
    `).join('');
    
    if (currentLang === 'en') updateStatsLanguage();
}

function loadArticles() {
    const list = document.getElementById('articles-list');
    if (!list) return;

    list.innerHTML = articlesData.map(art => `
        <a href="${art.url}" target="_blank" class="flex items-center justify-between bg-white p-5 rounded-xl border border-zinc-200 hover:border-pribramGreen hover:shadow-lg transition group">
            <div>
                <h4 class="font-bold text-lg text-zinc-800 group-hover:text-pribramGreen transition">${art.title}</h4>
                <p class="text-sm text-zinc-500 mt-1">${art.source}</p>
            </div>
            <span class="text-zinc-300 group-hover:translate-x-2 transition">→</span>
        </a>
    `).join('');
}

// Lightbox
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    img.src = images[index].src;
    caption.innerText = images[index].caption;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Zabrání scrollování pozadí
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (e) => { if (e.key === "Escape") closeLightbox(); });

// Překlady
let currentLang = 'cs';
const translations = {
    'cs': {
        'nav.about': 'Profil',
        'nav.stats': 'Statistiky',
        'nav.gallery': 'Galerie',
        'hero.position': 'BRANKÁŘ | #21',
        'hero.watch': 'Přehrát rozhovor',
        'about.title': 'Profil hráče',
        'about.p1': 'Martin Melichar je oporou v brance FK Viagem Příbram. Svým klidem a reflexy si vybudoval pevnou pozici.',
        'about.p2': 'Vyznačuje se moderním pojetím brankářského řemesla – aktivní hrou nohama a dominancí ve vápně.',
        'stats.title': 'Sezónní čísla',
        'video.title': 'Rozhovor & Highlights',
        'gallery.title': 'Momentky ze hřiště',
        'articles.title': 'Napsali v tisku'
    },
    'en': {
        'nav.about': 'Profile',
        'nav.stats': 'Stats',
        'nav.gallery': 'Gallery',
        'hero.position': 'GOALKEEPER | #21',
        'hero.watch': 'Watch Interview',
        'about.title': 'Player Profile',
        'about.p1': 'Martin Melichar is a key goalkeeper for FK Viagem Příbram. He has built a strong reputation with his calmness and reflexes.',
        'about.p2': 'He is known for a modern goalkeeping style – active footwork and dominance in the box.',
        'stats.title': 'Season Stats',
        'video.title': 'Interview & Highlights',
        'gallery.title': 'Match Photos',
        'articles.title': 'In the Press'
    }
};

function toggleLanguage() {
    currentLang = currentLang === 'cs' ? 'en' : 'cs';
    document.getElementById('lang-toggle').innerText = currentLang === 'cs' ? 'EN' : 'CS';
    
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (translations[currentLang][key]) el.innerText = translations[currentLang][key];
    });
    updateStatsLanguage();
}

function updateStatsLanguage() {
    document.querySelectorAll('[data-stat-key]').forEach(el => {
        const key = el.getAttribute('data-stat-key');
        const statItem = statsData.stats.find(s => s.key === key);
        if (statItem) {
            el.innerText = currentLang === 'cs' ? statItem.label_cs : statItem.label_en;
        }
    });
}

document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);

document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadArticles();
});