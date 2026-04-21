document.addEventListener('DOMContentLoaded', () => {
    const fruitInput = document.getElementById('fruitInput');
    const searchBtn = document.getElementById('searchBtn');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const error = document.getElementById('error');
    const fruitGallery = document.getElementById('fruitGallery');

    const fruitImage = document.getElementById('fruitImage');
    const fruitName = document.getElementById('fruitName');
    const fruitOrigin = document.getElementById('fruitOrigin');
    const fruitDescription = document.getElementById('fruitDescription');
    const fruitBenefits = document.getElementById('fruitBenefits');
    const fruitHowTo = document.getElementById('fruitHowTo');
    const fruitSeason = document.getElementById('fruitSeason');
    const errorMessage = document.getElementById('errorMessage');
    const suggestions = document.getElementById('suggestions');

    function showLoading() {
        loading.classList.remove('hidden');
        result.classList.add('hidden');
        error.classList.add('hidden');
    }

    function hideLoading() {
        loading.classList.add('hidden');
    }

    function displayFruit(fruit) {
        fruitImage.src = fruit.imagine;
        fruitImage.alt = fruit.nume;
        fruitName.textContent = fruit.nume;
        fruitOrigin.textContent = '🌍 ' + fruit.origine;
        fruitDescription.textContent = fruit.descriere;
        fruitHowTo.textContent = fruit.cumSaMananci;
        fruitSeason.textContent = fruit.sezon;

        fruitBenefits.innerHTML = '';
        fruit.beneficii.forEach(benefit => {
            const li = document.createElement('li');
            li.textContent = benefit;
            fruitBenefits.appendChild(li);
        });

        result.classList.remove('hidden');
        result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function displayError(message, sugestiiList) {
        errorMessage.textContent = message;
        suggestions.innerHTML = '';

        if (sugestiiList && sugestiiList.length > 0) {
            const p = document.createElement('p');
            p.textContent = 'Poate voiai să cauți:';
            p.style.marginBottom = '15px';
            suggestions.appendChild(p);

            sugestiiList.forEach(suggestion => {
                const btn = document.createElement('button');
                btn.className = 'suggestion-btn';
                btn.textContent = suggestion;
                btn.addEventListener('click', () => {
                    fruitInput.value = suggestion;
                    searchFruit(suggestion);
                });
                suggestions.appendChild(btn);
            });
        }

        error.classList.remove('hidden');
    }

    async function searchFruit(fruitName) {
        showLoading();

        try {
            const response = await fetch(`/api/fruct/${encodeURIComponent(fruitName)}`);
            const data = await response.json();

            hideLoading();

            if (data.success) {
                displayFruit(data.data);
            } else {
                displayError(data.message, data.sugestii);
            }
        } catch (err) {
            hideLoading();
            displayError('A apărut o eroare la căutare. Încearcă din nou.', []);
        }
    }

    async function loadAllFruits() {
        try {
            const response = await fetch('/api/toate-fructele');
            const data = await response.json();

            if (data.success) {
                data.data.forEach(fruit => {
                    const item = document.createElement('div');
                    item.className = 'gallery-item';
                    item.innerHTML = `
                        <img src="${fruit.imagine}" alt="${fruit.nume}" loading="lazy">
                        <div class="gallery-info">
                            <h4>${fruit.nume}</h4>
                            <p>${fruit.origine}</p>
                        </div>
                    `;
                    item.addEventListener('click', () => {
                        fruitInput.value = fruit.nume.toLowerCase().split(' ')[0];
                        searchFruit(fruitInput.value);
                    });
                    fruitGallery.appendChild(item);
                });
            }
        } catch (err) {
            console.error('Eroare la încărcarea fructelor:', err);
        }
    }

    searchBtn.addEventListener('click', () => {
        const fruit = fruitInput.value.trim();
        if (fruit) {
            searchFruit(fruit);
        }
    });

    fruitInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const fruit = fruitInput.value.trim();
            if (fruit) {
                searchFruit(fruit);
            }
        }
    });

    loadAllFruits();
});
