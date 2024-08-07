// Punkt referencyjny: liczba godzin -> stawka za godzinę dla różnych okresów
const referencePoints = {
    1: { 1: 150, 20: 100, 40: 70 }, // 1 miesiąc
    2: { 1: 225, 20: 150, 40: 105 }, // 2 miesiące
    3: { 1: 300, 20: 200, 40: 140 }  // 3 miesiące
};

// Funkcja interpolacji liniowej
function interpolate(x, x1, y1, x2, y2) {
    return y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
}

// Funkcja do obliczania stawki za godzinę na podstawie liczby godzin i okresu rozliczeniowego
function calculateRate(hours, period) {
    const points = referencePoints[period];
    const xPoints = Object.keys(points).map(Number).sort((a, b) => a - b);

    // Znalezienie punktów do interpolacji
    let x1 = xPoints[0];
    let x2 = xPoints[xPoints.length - 1];
    let y1 = points[x1];
    let y2 = points[x2];

    for (let i = 0; i < xPoints.length - 1; i++) {
        if (hours >= xPoints[i] && hours <= xPoints[i + 1]) {
            x1 = xPoints[i];
            x2 = xPoints[i + 1];
            y1 = points[x1];
            y2 = points[x2];
            break;
        }
    }

    return Math.round(interpolate(hours, x1, y1, x2, y2)); // Zaokrąglenie do pełnej liczby
}

// Funkcja do aktualizacji kalkulatora
function updateCalculator() {
    // Pobierz wartości z formularza
    const hours = parseInt(hoursInput.value, 10);
    const period = parseInt(periodValue, 10);

    // Pobierz stawkę z funkcji obliczającej
    const rate = calculateRate(hours, period);

    // Oblicz całkowity koszt
    const price = rate * hours;

    // Zaktualizuj wyświetlane wartości
    rateSpan.textContent = rate + ' PLN'; // Usuń formatowanie do dwóch miejsc po przecinku, ponieważ jest zaokrąglone

    // Aktualizowanie tekstu ceny
    priceText.innerHTML = `Cykliczna opłata za abonament wynosi ${price.toFixed(2).replace('.', ',')} PLN co ${period === 1 ? '1 miesiąc' : period + ' miesiące'}.`;
}

// Inicjalizacja elementów formularza
const hoursInput = document.getElementById('hours');
const segmentedControl = document.querySelectorAll('.segmented-control .segment');
const rateSpan = document.getElementById('rate');
const priceText = document.getElementById('price-text');

let periodValue = '1'; // Domyślny okres rozliczeniowy

// Dodaj nasłuchiwanie zmian wartości
hoursInput.addEventListener('input', () => {
    document.getElementById('hours-value').textContent = hoursInput.value;
    updateCalculator();
});

segmentedControl.forEach(button => {
    button.addEventListener('click', (e) => {
        segmentedControl.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        periodValue = e.currentTarget.getAttribute('data-value');
        updateCalculator(); // Zaktualizuj kalkulator po zmianie okresu rozliczeniowego
    });
});

// Inicjalizuj kalkulator przy załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.segmented-control .segment').classList.add('active');
    updateCalculator(); // Wywołaj funkcję na starcie, aby ustawić domyślną wartość
});

// Przewijanie top menu
document.addEventListener('DOMContentLoaded', function() {
    const topMenu = document.getElementById('top-menu');
    const logoImg = document.getElementById('logo-img');
    const originalLogoSrc = 'images/logo.png'; // Ścieżka do oryginalnego logo
    const scrolledLogoSrc = 'images/logo-scrolled.png'; // Ścieżka do logo po przewinięciu

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) { // Możesz dostosować wartość 50 do swojego projektu
            topMenu.classList.add('scrolled');
            logoImg.src = scrolledLogoSrc; // Podmień logo na nowe
        } else {
            topMenu.classList.remove('scrolled');
            logoImg.src = originalLogoSrc; // Przywróć oryginalne logo
        }
    });
});

//lottie animation
document.addEventListener('DOMContentLoaded', function() {
    const animation1 = lottie.loadAnimation({
        container: document.getElementById('animation1'), // kontener do animacji
        renderer: 'svg', // renderowanie SVG
        loop: true, // animacja w pętli
        autoplay: true, // automatyczne odtwarzanie
        path: 'https://lottie.host/25e4928e-52da-499a-950b-92c66fce674b/lVJqRGtZLK.json' // ścieżka do pliku JSON z animacją
    });

    const animation2 = lottie.loadAnimation({
        container: document.getElementById('animation2'), // kontener do animacji
        renderer: 'svg', // renderowanie SVG
        loop: true, // animacja w pętli
        autoplay: true, // automatyczne odtwarzanie
        path: 'https://lottie.host/96da642c-3b6c-4a40-bf7c-b5fdbe8509bd/yE0HndB4r6.json' // ścieżka do pliku JSON z animacją
    });

    const animation3 = lottie.loadAnimation({
        container: document.getElementById('animation3'), // kontener do animacji
        renderer: 'svg', // renderowanie SVG
        loop: true, // animacja w pętli
        autoplay: true, // automatyczne odtwarzanie
        path: 'https://lottie.host/79f8b389-12f7-4017-a07a-ab12c04224c5/9lrwMJUkt8.json' // ścieżka do pliku JSON z animacją
    });

    const animation4 = lottie.loadAnimation({
        container: document.getElementById('animation4'), // kontener do animacji
        renderer: 'svg', // renderowanie SVG
        loop: true, // animacja w pętli
        autoplay: true, // automatyczne odtwarzanie
        path: 'https://lottie.host/b956971b-0731-4973-928e-243fda4e6138/2QSA5oN4Jn.json' // ścieżka do pliku JSON z animacją
    });

    const animation5 = lottie.loadAnimation({
        container: document.getElementById('animation5'), // kontener do animacji
        renderer: 'svg', // renderowanie SVG
        loop: true, // animacja w pętli
        autoplay: true, // automatyczne odtwarzanie
        path: 'https://lottie.host/72cf8d72-3277-4128-aee1-a466147e0500/n1oh170fp1.json' // ścieżka do pliku JSON z animacją
    });

    // Dodaj więcej animacji, jeśli potrzebujesz
});
