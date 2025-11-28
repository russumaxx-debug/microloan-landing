async function loadConfig() {
    const response = await fetch('/config/settings.json');
    const config = await response.json();
    return config;
}

function applyConfig(config){
    const root=document.documentElement;
    root.style.setProperty('--primary-color',config.colors.primary);
    root.style.setProperty('--secondary-color',config.colors.secondary);
    root.style.setProperty('--accent-color',config.colors.accent);
    root.style.setProperty('--background-color',config.colors.background);
    root.style.setProperty('--text-color',config.colors.text);

    // Hero
    document.getElementById('heroTitle').textContent=config.hero.title;
    document.getElementById('heroSubtitle').textContent=config.hero.subtitle;
    const heroBtn=document.getElementById('heroBtn');
    heroBtn.textContent=config.hero.button;
    heroBtn.style.backgroundColor=config.colors.accent;
    document.getElementById('heroBanner').src=config.hero.image;

    // Features
    const featuresGrid=document.getElementById('featuresGrid');
    featuresGrid.innerHTML=config.sections.find(s=>s.type==='features')
        .items.map(i=>`<div class="feature-card"><div class="feature-icon">${i.icon}</div><div class="feature-text">${i.text}</div></div>`).join('');

    // Footer
    document.getElementById('footerText').textContent=`© 2024 ${config.footer.company}. ${config.footer.address}. Email: ${config.footer.email}`;

    // Calculator
    const amountSlider=document.getElementById('amountSlider');
    const daysSlider=document.getElementById('daysSlider');
    const amountValue=document.getElementById('amountValue');
    const daysValue=document.getElementById('daysValue');
    const resultAmount=document.getElementById('resultAmount');

    amountSlider.min=config.loan.minAmount;
    amountSlider.max=config.loan.maxAmount;
    amountSlider.value=config.loan.minAmount;
    daysSlider.min=config.loan.minDays;
    daysSlider.max=config.loan.maxDays;
    daysSlider.value=config.loan.minDays;

    function updateCalculator(){
        const amount=parseInt(amountSlider.value);
        const days=parseInt(daysSlider.value);
        const total=amount+(amount*config.loan.percentPerDay/100*days);
        amountValue.textContent=amount.toLocaleString('ru-RU')+' ₽';
        daysValue.textContent=days+' дн.';
        resultAmount.textContent=Math.round(total).toLocaleString('ru-RU')+' ₽';
    }

    amountSlider.addEventListener('input',updateCalculator);
    daysSlider.addEventListener('input',updateCalculator);
    updateCalculator();
}

// Form
function handleFormSubmit(e){
    e.preventDefault();
    const data={
        lastName:e.target.lastName.value,
        firstName:e.target.firstName.value,
        phone:e.target.phone.value
    };
    console.log('Заявка:',data);
    const msg=document.getElementById('formMessage');
    msg.classList.add('success');
    e.target.reset();
    setTimeout(()=>msg.classList.remove('success'),3000);
}

// Navigation
function goToAdmin(){window.location.href='admin.html';}
function scrollToForm(){document.querySelector('.form-section').scrollIntoView({behavior:'smooth'});}

// Init
(async()=>{const config=await loadConfig();applyConfig(config)})();
