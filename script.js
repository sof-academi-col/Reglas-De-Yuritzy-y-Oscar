// Rules data
const rulesOscar = [
    "No me gusta que tengas más amigos aparte de los que ya algo he sabido. No más amigos ni amiguitos.",
    "No reaccionar a fotos de amig@s.",
    "No subir, etiquetar o mencionar a amig@s en publicaciones de cualquier red social.",
    "Si un amig@ que ya tiene tiempo sin comunicación vuelve a buscarnos, contarlo el uno al otro.",
    "Si alguien gusta o demuestra intenciones que no son, debemos decirlo y eliminarlo de nuestras vidas.",
    "No abrazar a nuestr@s amig@s.",
    "Decir si invitan a salir y no salir con amig@s; informar con quién estarás o qué harás.",
    "Nadie más puede tener nuestros celulares, solamente Yuritzy y Oscar. con la excepción de salo y yamis",
    "Si hay problemas o enojos, hay que hablar y solucionarlo el mismo día.",
    "Compartir cuáles son nuestras redes sociales será siempre por confianza y para sentirnos tranquil@s.",
    "No compartir publicaciones, memes ni ningún tipo de contenido con amig@s.",
    "Cuando no nos agrade algún amig@, decir lo que sentimos y alejarnos de esa amistad.",
    "Prohibido usar ropa corta (shorts, faldas) en espacios públicos de cualquier tipo.",
    "Prohibido publicar fotos nuestras en redes sociales, excepto si son de los dos juntos o aprobadas por ambos.",
    "Nada de apodos ni aceptar que amig@s nos digan apodos. Solo hablar por el nombre (sin diminutivos).",
    "Debes comer antes de cualquier actividad física (entrenamiento, box, gym), así como en desayuno, almuerzo y cena.",
    "Desayunar antes de ir a la universidad y cumplir con las demás comidas en su tiempo correspondiente.",
    "No chatear con amig@s.",
    "No se puede hacer ni recibir llamadas de amig@s en general, con excepción de familiares y Esme, hasta que hagamos llamada.",
    "Siempre avisar cuando lleguemos a casa o a cualquier lugar, para estar tranquil@s.",
    "Dedicar al menos un momento al día para hablar, aunque estemos ocupados.",
    "No dejar en visto ni ignorar mensajes; siempre responder aunque sea con algo breve.",
    "Avisar siempre si vamos a salir de viaje o a un lugar diferente del habitual.",
    "Cuando haya celos o incomodidad, hablarlo de inmediato sin ocultar nada.",
    "Priorizar tiempo juntos antes que tiempo con otras personas.",
    "No usar excusas para ocultar cosas, siempre hablar con sinceridad.",
    "No usar emojis con nadie ni registrar a nadie con emojis en el celular.",
    "No seguir a chic@s ni reaccionar a publicaciones de ninguna red social.",
    "No se puede hablar o hacer alusión a ningún ser femenino en caso de Oscar con excepción de \"La familia de Salo y mi mamá y familia\" y de ningún ser masculino en el caso de Yuritzy con excepción de \"Su papá y sus primos y familia\"."
];

const rulesYuritzy = [
    "No reaccionar a fotos de amig@s.",
    "No subir, etiquetar o mencionar a amig@s en publicaciones de cualquier red social.",
    "Si alguien gusta o demuestra intenciones que no son, debemos decirlo y eliminarlo de nuestras vidas.",
    "No abrazar a nuestr@s amig@s.",
    "Decir si invitan a salir y si sales avisar a donde y con quien.",
    "Nadie más puede tener nuestros celulares, solamente Yuritzy y Oscar. con la excepción de salo y yamis",
    "Si hay problemas o enojos, hay que hablar y solucionarlo el mismo día.",
    "No compartir publicaciones, memes ni ningún tipo de contenido con amig@s.",
    "Cuando no nos agrade algún amig@, decir lo que sentimos y alejarnos de esa amistad.",
    "Siempre avisar cuando lleguemos a casa o a cualquier lugar, para estar tranquil@s.",
    "Dedicar al menos un momento al día para hablar, aunque estemos ocupados.",
    "No dejar en visto ni ignorar mensajes; siempre responder aunque sea con algo breve.",
    "Avisar siempre si vamos a salir de viaje o a un lugar diferente del habitual.",
    "Cuando haya celos o incomodidad, hablarlo de inmediato sin ocultar nada.",
    "Priorizar tiempo juntos antes que tiempo con otras personas.",
    "No usar excusas para ocultar cosas, siempre hablar con sinceridad.",
    "No usar emojis con nadie ni registrar a nadie con emojis en el celular.",
    "No seguir a chic@s ni reaccionar a publicaciones de ninguna red social.",
    "No se puede hablar o hacer alusión a ningún ser femenino en caso de Oscar con excepción de \"La familia de Salo y mi mamá y familia\" y de ningún ser masculino en el caso de Yuritzy con excepción de \"Su papá y sus primos y familia\"."
];

// State
let currentUser = null;
let currentRules = [];
let currentRuleIndex = 0;

// DOM Elements
const userSelection = document.getElementById('user-selection');
const mainContent = document.getElementById('main-content');
const userButtons = document.querySelectorAll('.user-btn');
const backBtn = document.getElementById('back-btn');
const userNameDisplay = document.getElementById('user-name-display');
const ruleCount = document.getElementById('rule-count');
const currentRuleNumber = document.getElementById('current-rule-number');
const totalRulesEl = document.getElementById('total-rules');
const ruleText = document.getElementById('rule-text');
const prevRuleBtn = document.getElementById('prev-rule');
const nextRuleBtn = document.getElementById('next-rule');
const progressFill = document.getElementById('progress-fill');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check URL for user parameter
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('user');
    
    if (userParam === 'Oscar' || userParam === 'Yuritzy') {
        selectUser(userParam);
    }
    
    setupEventListeners();
});

function setupEventListeners() {
    // User selection buttons
    userButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const user = btn.getAttribute('data-user');
            selectUser(user);
        });
    });
    
    // Back button
    backBtn.addEventListener('click', () => {
        showUserSelection();
    });
    
    // Navigation buttons
    prevRuleBtn.addEventListener('click', () => {
        if (currentRuleIndex > 0) {
            currentRuleIndex--;
            updateRuleDisplay();
        }
    });
    
    nextRuleBtn.addEventListener('click', () => {
        if (currentRuleIndex < currentRules.length - 1) {
            currentRuleIndex++;
            updateRuleDisplay();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (mainContent.style.display === 'none') return;
        
        if (e.key === 'ArrowLeft' && currentRuleIndex > 0) {
            currentRuleIndex--;
            updateRuleDisplay();
        } else if (e.key === 'ArrowRight' && currentRuleIndex < currentRules.length - 1) {
            currentRuleIndex++;
            updateRuleDisplay();
        }
    });
}

function selectUser(user) {
    currentUser = user;
    currentRules = user === 'Oscar' ? rulesOscar : rulesYuritzy;
    currentRuleIndex = 0;
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('user', user);
    window.history.pushState({}, '', url);
    
    showMainContent();
}

function showUserSelection() {
    userSelection.style.display = 'flex';
    mainContent.style.display = 'none';
    
    // Clear URL parameter
    const url = new URL(window.location);
    url.searchParams.delete('user');
    window.history.pushState({}, '', url);
}

function showMainContent() {
    userSelection.style.display = 'none';
    mainContent.style.display = 'flex';
    
    // Update header
    userNameDisplay.textContent = currentUser;
    ruleCount.textContent = `${currentRules.length} Reglas`;
    totalRulesEl.textContent = currentRules.length;
    
    updateRuleDisplay();
}

function updateRuleDisplay() {
    // Update rule number
    currentRuleNumber.textContent = currentRuleIndex + 1;
    
    // Update rule text
    ruleText.textContent = currentRules[currentRuleIndex];
    
    // Update progress bar
    const progress = ((currentRuleIndex + 1) / currentRules.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Update navigation buttons
    prevRuleBtn.disabled = currentRuleIndex === 0;
    nextRuleBtn.disabled = currentRuleIndex === currentRules.length - 1;
}
