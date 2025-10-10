// Convite 2 - JavaScript para funcionalidades românticas

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
        mensagem: document.getElementById('rsvpMessage').value,
        restricoes: document.getElementById('rsvpDietary').checked
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
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4CAF50, #45a049)' : 
                     type === 'error' ? 'linear-gradient(135deg, #f44336, #da190b)' : 
                     'linear-gradient(135deg, #2196F3, #1976D2)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
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
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Efeitos de scroll e animações
document.addEventListener('DOMContentLoaded', function() {
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
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
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

    // Observar elementos
    const animatedElements = document.querySelectorAll('.info-item, .photo-item, .love-quote');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Adicionar classe animate-in
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
});

// Função para compartilhar
function shareInvite() {
    if (navigator.share) {
        navigator.share({
            title: 'Convite de Casamento - Ana & Pedro',
            text: 'Você está convidado para celebrar o nosso amor! 💕',
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Link copiado para a área de transferência!', 'success');
        });
    }
}

// Efeito de corações flutuantes adicionais
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.cssText = `
        position: fixed;
        top: 100vh;
        left: ${Math.random() * 100}vw;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        animation: floatUp 4s ease-out forwards;
    `;

    document.body.appendChild(heart);

    setTimeout(() => {
        document.body.removeChild(heart);
    }, 4000);
}

// Adicionar animação CSS para corações
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);

// Criar corações flutuantes ocasionalmente
setInterval(createFloatingHeart, 3000);