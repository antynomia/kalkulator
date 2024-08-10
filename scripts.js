// Punkt referencyjny: liczba godzin -> stawka za godzinę dla różnych okresów
const referencePoints = {
    1: { 1: 180, 20: 105, 40: 80 }, // 1 miesiąc
    2: { 1: 270, 20: 165, 40: 120 }, // 2 miesiące
    3: { 1: 360, 20: 225, 40: 160 }  // 3 miesiące
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
        if (window.scrollY > 100) { // Możesz dostosować wartość 50 do swojego projektu
            topMenu.classList.add('scrolled');
            logoImg.src = scrolledLogoSrc; // Podmień logo na nowe
        } else {
            topMenu.classList.remove('scrolled');
            logoImg.src = originalLogoSrc; // Przywróć oryginalne logo
        }
    });
});

// Przesunięcie kalkulatora przy scrollu
document.getElementById('scroll-to-calculator').addEventListener('click', function(e) {
    e.preventDefault();

    const targetElement = document.getElementById('subscription-calculator');

    if (targetElement) {
        // Sprawdź, czy urządzenie jest mobilne
        let offsetPosition;
        if (window.matchMedia("(max-width: 768px)").matches) {
            // Przesunięcie dla urządzeń mobilnych (768px lub mniejszych)
            offsetPosition = targetElement.offsetTop - 80; 
        } else {
            // Przesunięcie dla urządzeń desktopowych (powyżej 768px)
            offsetPosition = targetElement.offsetTop - 130; 
        }

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
});

// Przesunięcie Portfolio przy scrollu
document.getElementById('scroll-to-portfolio').addEventListener('click', function(e) {
    e.preventDefault();

    const targetElement = document.getElementById('portfolio');

    if (targetElement) {
        // Sprawdź, czy urządzenie jest mobilne
        let offsetPosition;
        if (window.matchMedia("(max-width: 768px)").matches) {
            // Przesunięcie dla urządzeń mobilnych (768px lub mniejszych)
            offsetPosition = targetElement.offsetTop - 80; 
        } else {
            // Przesunięcie dla urządzeń desktopowych (powyżej 768px)
            offsetPosition = targetElement.offsetTop - 130; 
        }

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
});

// Initialize animations
    const animations = [
        { id: 'korzysci_elastyczny_czas', path: 'https://antynomia.github.io/kalkulator/images/ico-anim/ic-korzysci-elastyczny-czas.json' },
        { id: 'korzysci_elastyczna_stawka', path: 'https://antynomia.github.io/kalkulator/images/ico-anim/ic-korzysci-elastyczna-stawka.json' },
        { id: 'korzysci_okresy', path: 'https://antynomia.github.io/kalkulator/images/ico-anim/ic-korzysci-okresy-rozliczeniowe.json' },
        { id: 'zakres_logo', path: 'https://antynomia.github.io/kalkulator/images/ico-anim/ic-uslugi-logo.json' },
        { id: 'zakres_web', path: 'https://antynomia.github.io/kalkulator/images/ico-anim/ic-uslugi-web.json' },
        { id: 'zakres_mobile', path: 'https://antynomia.github.io/kalkulator/images/ico-anim/ic-uslugi-mobile.json' },
        { id: 'zakres_print', path: 'https://antynomia.github.io/kalkulator/images/ico-anim/ic-uslugi-print.json' },
        { id: 'zakres_pixel', path: 'https://antynomia.github.io/kalkulator/images/ico-anim/ic-uslugi-pixelart.json' },
        { id: 'zakres_fotomontaz', path: 'https://antynomia.github.io/kalkulator/images/ico-anim/ic-uslugi-fotomontaze.json' },
        { id: 'info_rozliczenie', path: 'https://antynomia.github.io/kalkulator/images/ico-anim/ic-info-rozliczenie.json' },
        { id: 'info_godziny', path: 'https://antynomia.github.io/kalkulator/images/ico-anim/ic-info-godziny.json' },
        { id: 'info_elastycznosc', path: 'https://antynomia.github.io/kalkulator/images/ico-anim/ic-info-elastycznosc.json' },
        { id: 'info_raporty', path: 'https://antynomia.github.io/kalkulator/images/ico-anim/ic-info-raporty.json' },
    ];

    animations.forEach(animation => {
        lottie.loadAnimation({
            container: document.getElementById(animation.id),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: animation.path
        });
    });

