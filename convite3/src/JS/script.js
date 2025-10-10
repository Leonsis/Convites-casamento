// Convite 3 - JavaScript para funcionalidades vintage

// Função para abrir modal de confirmação
function openConfirmation() {
    const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    modal.show();
}

// Função para submeter confirmação
function submitConfirmation() {
    const form = document.getElementById('confirmationForm');
    const formData = new FormData(form);

    // Validação
    const name = document.getElementById('confName').value;
    const email = document.getElementById('confEmail').value;
    const guests = document.getElementById('confGuests').value;

    if (!name || !email || !guests) {
        showVintageNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }

    // Simular envio
    const confirmationData = {
        nome: name,
        email: email,
        telefone: document.getElementById('confPhone').value,
        convidados: guests,
        mensagem: document.getElementById('confMessage').value,
        restricoes: document.getElementById('confDietary').checked
    };

    console.log('Confirmation Data:', confirmationData);

    // Mostrar confirmação
    showVintageNotification('Obrigado! Sua presença foi confirmada com sucesso! 💐', 'success');

    // Fechar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
    modal.hide();

    // Limpar formulário
    form.reset();
}

// Função para mostrar notificações vintage
function showVintageNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `vintage-notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            </div>
            <div class="notification-text">
                <span>${message}</span>
            </div>
        </div>
    `;

    // Estilos vintage
    const colors = {
        success: 'linear-gradient(135deg, #8b7355 0%, #a68b5b 100%)',
        error: 'linear-gradient(135deg, #d4a574 0%, #c49b6a 100%)',
        info: 'linear-gradient(135deg, #a68b5b 0%, #8b7355 100%)'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.4s ease;
        max-width: 400px;
        border: 2px solid rgba(255,255,255,0.2);
        font-family: 'Montserrat', sans-serif;
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover após 6 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 6000);
}

// Efeitos de scroll e animações vintage
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar estilos para notificação
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .vintage-notification .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .vintage-notification .notification-icon {
            width: 30px;
            height: 30px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .vintage-notification .notification-icon i {
            font-size: 1.2rem;
        }
        
        .vintage-notification .notification-text {
            flex: 1;
        }
        
        .vintage-notification .notification-text span {
            font-size: 1rem;
            line-height: 1.4;
        }
    `;
    document.head.appendChild(notificationStyle);

    // Parallax effect suave
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.vintage-header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.detail-section, .timeline-item, .vintage-quote');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Adicionar classe animate-in
    const animateStyle = document.createElement('style');
    animateStyle.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(animateStyle);

    // Efeito de pétalas flutuantes
    createFloatingPetals();
});

// Função para criar pétalas flutuantes
function createFloatingPetals() {
    const petalSymbols = ['❦', '❧', '❀', '❁', '❃', '❋'];

    function createPetal() {
        const petal = document.createElement('div');
        const symbol = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
        petal.innerHTML = symbol;
        petal.style.cssText = `
            position: fixed;
            top: 100vh;
            left: ${Math.random() * 100}vw;
            font-size: ${Math.random() * 15 + 10}px;
            color: rgba(139, 115, 85, 0.6);
            pointer-events: none;
            z-index: 1000;
            animation: floatUpVintage 8s ease-out forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;

        document.body.appendChild(petal);

        setTimeout(() => {
            if (document.body.contains(petal)) {
                document.body.removeChild(petal);
            }
        }, 8000);
    }

    // Adicionar animação CSS para pétalas
    const petalStyle = document.createElement('style');
    petalStyle.textContent = `
        @keyframes floatUpVintage {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.8;
            }
            50% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(petalStyle);

    // Criar pétalas periodicamente
    setInterval(createPetal, 4000);
}

// Função para compartilhar convite
function shareInvite() {
    if (navigator.share) {
        navigator.share({
            title: 'Convite de Casamento - Sofia & Lucas',
            text: 'Você está convidado para celebrar o nosso amor! 💐',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showVintageNotification('Link do convite copiado para a área de transferência!', 'success');
        });
    }
}

// Efeito de hover nos elementos vintage
document.addEventListener('DOMContentLoaded', function() {
    const vintageElements = document.querySelectorAll('.detail-section, .timeline-photo, .vintage-quote');

    vintageElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});