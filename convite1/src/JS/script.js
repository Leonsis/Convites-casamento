// Convite 1 - JavaScript no estilo Fixdate

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('2024-06-15T19:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById('days').innerHTML = '00';
        document.getElementById('hours').innerHTML = '00';
        document.getElementById('minutes').innerHTML = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
    document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
}

// Função para abrir modal RSVP
function openRSVP() {
    const modal = new bootstrap.Modal(document.getElementById('rsvpModal'));
    modal.show();
}

// Função para submeter RSVP
function submitRSVP() {
    const form = document.getElementById('rsvpForm');
    const formData = new FormData(form);

    // Validação
    const name = document.getElementById('rsvpName').value;
    const email = document.getElementById('rsvpEmail').value;
    const guests = document.getElementById('rsvpGuests').value;

    if (!name || !email || !guests) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }

    // Simular envio
    const rsvpData = {
        nome: name,
        email: email,
        telefone: document.getElementById('rsvpPhone').value,
        convidados: guests,
        mensagem: document.getElementById('rsvpMessage').value
    };

    console.log('RSVP Data:', rsvpData);

    // Mostrar confirmação
    showNotification('Obrigado! Sua presença foi confirmada com sucesso! 💕', 'success');

    // Fechar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('rsvpModal'));
    modal.hide();

    // Limpar formulário
    form.reset();
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    const colors = {
        success: 'linear-gradient(135deg, #4CAF50, #45a049)',
        error: 'linear-gradient(135deg, #f44336, #da190b)',
        info: 'linear-gradient(135deg, #2196F3, #1976D2)'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Efeitos de scroll e animações
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar countdown a cada minuto
    updateCountdown();
    setInterval(updateCountdown, 60000);

    // Smooth scroll para o indicador
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('.invitation-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Parallax effect no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
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
    const animatedElements = document.querySelectorAll('.detail-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Adicionar estilos para notificação
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(notificationStyle);
});

// Função para compartilhar convite
function shareInvite() {
    if (navigator.share) {
        navigator.share({
            title: 'Convite de Casamento - Maria & João',
            text: 'Você está convidado para o nosso casamento! 💕',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Link do convite copiado para a área de transferência!', 'success');
        });
    }
}

// Efeito de partículas flutuantes
function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        top: 100vh;
        left: ${Math.random() * 100}vw;
        width: 4px;
        height: 4px;
        background: rgba(102, 126, 234, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: floatUp 8s ease-out forwards;
    `;

    document.body.appendChild(particle);

    setTimeout(() => {
        if (document.body.contains(particle)) {
            document.body.removeChild(particle);
        }
    }, 8000);
}

// Adicionar animação CSS para partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Criar partículas flutuantes ocasionalmente
setInterval(createFloatingParticle, 5000);