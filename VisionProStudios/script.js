const gameData = [
    {
        id: 1,
        title: "PETS",
        release: "Launch Q2 December 2025",
        description: "A heartwarming and engaging life simulation game where you adopt, train, and compete with virtual pets exclusively on the Roblox platform. From fluffy dogs to exotic parrots, build an unforgettable bond and become the top pet owner in the metaverse!",
        platforms: ["Roblox"], // Updated platform
        tags: ["Roblox", "Simulation", "Life Sim", "Casual", "Virtual Pet"], // Added Roblox tag
        color: '#1e40af' // Deep Blue (Primary color from Tailwind config)
    }
];

// --- DOM Elements ---
const gameListContainer = document.getElementById('game-list');
const detailModal = document.getElementById('detail-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const buyNowBtn = document.getElementById('buy-now-btn');
const wikiModal = document.getElementById('wiki-modal'); // New: Wiki Modal
const closeWikiBtn = document.getElementById('close-wiki-btn'); // New: Close Wiki Button

// --- Core Functions ---

/**
 * Renders the game cards onto the page.
 */
function renderGames() {
    gameListContainer.innerHTML = '';
    if (gameData.length === 0) {
        document.getElementById('empty-state').classList.remove('hidden');
        return;
    }

    gameData.forEach(game => {
        const card = document.createElement('div');
        // Note: Tailwind classes are defined in index.html, but custom colors are applied here
        card.className = `card-bg p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl`;
        card.style.borderColor = game.color;
        card.dataset.id = game.id;
        
        const platformIcons = game.platforms.slice(0, 3).map(p => {
            let icon = '';
            if (p.includes('Roblox')) icon = '🧱'; // Roblox icon
            return `<span class="text-sm" title="${p}">${icon}</span>`;
        }).join('');

        card.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                 <h3 class="text-2xl font-bold text-gray-800">${game.title}</h3>
                 <div class="space-x-1">${platformIcons}</div>
            </div>
            <p class="text-sm font-semibold mb-2" style="color: ${game.color};">${game.release}</p>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">${game.description}</p>
            
            <div class="flex flex-wrap gap-2">
                ${game.tags.map(tag => 
                    `<span class="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700 border" style="border-color: ${game.color}50;">${tag}</span>`
                ).join('')}
            </div>
        `;
        card.addEventListener('click', () => openModal(game.id));
        gameListContainer.appendChild(card);
    });
}

/**
 * Opens the detail modal with the selected game's information.
 * @param {number} id The ID of the game to display.
 */
function openModal(id) {
    const game = gameData.find(g => g.id === id);
    if (!game) return;

    // Update modal content
    document.getElementById('modal-title').textContent = game.title;
    document.getElementById('modal-title').style.color = game.color; 
    
    document.getElementById('modal-release').textContent = `Release: ${game.release}`;
    document.getElementById('modal-description').textContent = game.description;
    document.getElementById('modal-platforms').textContent = game.platforms.join(', ');

    // Render tags
    const tagContainer = document.getElementById('modal-tags');
    tagContainer.innerHTML = game.tags.map(tag => 
        `<span class="text-sm font-medium px-4 py-1 rounded-full bg-blue-100 text-blue-800 border" style="border-color: ${game.color}50;">${tag}</span>`
    ).join('');
    
    // Attach WIKI button handler (changed logic)
    buyNowBtn.onclick = () => {
        // Close detail modal and open wiki modal
        closeModal();
        openWikiModal(game.title);
    };

    // Show detail modal
    detailModal.classList.remove('hidden');
    detailModal.classList.add('flex');
    document.getElementById('modal-content').classList.remove('scale-95');
    document.getElementById('modal-content').classList.add('scale-100');
}

/**
 * Closes the detail modal.
 */
function closeModal() {
    document.getElementById('modal-content').classList.remove('scale-100');
    document.getElementById('modal-content').classList.add('scale-95');
    
    // Wait for transition to finish before hiding completely
    setTimeout(() => {
        detailModal.classList.remove('flex');
        detailModal.classList.add('hidden');
    }, 300);
}

/**
 * New function: Opens the empty wiki modal.
 * @param {string} gameTitle The title of the game to display in the wiki header.
 */
function openWikiModal(gameTitle) {
    document.getElementById('wiki-title').textContent = `${gameTitle} - Official Wiki`;

    // Show wiki modal
    wikiModal.classList.remove('hidden');
    wikiModal.classList.add('flex');
    document.getElementById('wiki-content').classList.remove('scale-95');
    document.getElementById('wiki-content').classList.add('scale-100');
}

/**
 * New function: Closes the wiki modal.
 */
function closeWikiModal() {
    document.getElementById('wiki-content').classList.remove('scale-100');
    document.getElementById('wiki-content').classList.add('scale-95');
    
    // Wait for transition to finish before hiding completely
    setTimeout(() => {
        wikiModal.classList.remove('flex');
        wikiModal.classList.add('hidden');
    }, 300);
}

// --- Initialization ---
window.onload = function() {
    renderGames();
    
    // Event listeners for detail modal
    closeModalBtn.addEventListener('click', closeModal);
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            closeModal();
        }
    });

    // New Event listeners for wiki modal
    closeWikiBtn.addEventListener('click', closeWikiModal);
    wikiModal.addEventListener('click', (e) => {
        if (e.target === wikiModal) {
            closeWikiModal();
        }
    });
};