// JavaScript principal para Panadería Don José
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Ocultar pantalla de carga
    hideLoadingScreen();
    
    // Inicializar componentes
    initializeNavigation();
    initializeBusinessHours();
    initializeQRCode();
    initializeScrollEffects();
    initializeModalHandlers();
    
    // Actualizar estado cada minuto
    setInterval(updateBusinessStatus, 60000);
    
    console.log('Panadería Don José - Aplicación inicializada');
}

function hideLoadingScreen() {
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeBusinessHours() {
    updateBusinessStatus();
}

function updateBusinessStatus() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = domingo, 1 = lunes, etc.
    const currentTime = now.getHours() * 100 + now.getMinutes();
    
    const statusBadge = document.getElementById('statusBadge');
    if (!statusBadge) return;
    
    let isOpen = false;
    
    // Horarios: Lunes a Sábado 8:00-13:00 y 17:00-20:00
    if (currentDay >= 1 && currentDay <= 6) {
        if ((currentTime >= 800 && currentTime < 1300) || 
            (currentTime >= 1700 && currentTime < 2000)) {
            isOpen = true;
        }
    }
    
    if (isOpen) {
        statusBadge.className = 'badge open';
        statusBadge.innerHTML = '<i class="fas fa-clock"></i> Abierto ahora';
    } else {
        statusBadge.className = 'badge closed';
        statusBadge.innerHTML = '<i class="fas fa-clock"></i> Cerrado';
    }
}

function initializeQRCode() {
    const shareBtn = document.getElementById('shareBtn');
    const qrModal = document.getElementById('qrModal');
    const closeModal = document.querySelector('.close-modal');
    const qrCanvas = document.getElementById('qrcode');
    
    if (shareBtn && qrModal) {
        shareBtn.addEventListener('click', function() {
            // Generar código QR
            if (typeof QRCode !== 'undefined' && qrCanvas) {
                QRCode.toCanvas(qrCanvas, window.location.href, {
                    width: 200,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                });
            }
            qrModal.style.display = 'flex';
        });
    }
    
    if (closeModal && qrModal) {
        closeModal.addEventListener('click', function() {
            qrModal.style.display = 'none';
        });
        
        qrModal.addEventListener('click', function(e) {
            if (e.target === qrModal) {
                qrModal.style.display = 'none';
            }
        });
    }
    
    // Funciones de descarga y copia
    const downloadQR = document.getElementById('downloadQR');
    const copyLink = document.getElementById('copyLink');
    
    if (downloadQR) {
        downloadQR.addEventListener('click', function() {
            const canvas = document.getElementById('qrcode');
            if (canvas) {
                const link = document.createElement('a');
                link.download = 'panaderia-don-jose-qr.png';
                link.href = canvas.toDataURL();
                link.click();
                showNotification('QR descargado exitosamente');
            }
        });
    }
    
    if (copyLink) {
        copyLink.addEventListener('click', function() {
            navigator.clipboard.writeText(window.location.href).then(() => {
                showNotification('Enlace copiado al portapapeles');
            }).catch(() => {
                showNotification('Error al copiar enlace');
            });
        });
    }
}

function initializeScrollEffects() {
    // Cambiar header al hacer scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animaciones al hacer scroll
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
    
    // Observar elementos animables
    document.querySelectorAll('.section-header, .about-content, .product-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

function initializeModalHandlers() {
    // Manejo de direcciones y mapa
    const directionsBtn = document.getElementById('directionsBtn');
    const copyAddressBtn = document.getElementById('copyAddressBtn');
    const mapPlaceholder = document.querySelector('.map-placeholder');
    
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const address = encodeURIComponent(businessConfig.contact.address.full);
            const mapsUrl = `https://www.google.com/maps/search/${address}`;
            window.open(mapsUrl, '_blank');
        });
    }
    
    if (copyAddressBtn) {
        copyAddressBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(businessConfig.contact.address.full).then(() => {
                showNotification('Dirección copiada al portapapeles');
            }).catch(() => {
                showNotification('Error al copiar dirección');
            });
        });
    }
    
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            const address = encodeURIComponent(businessConfig.contact.address.full);
            const mapsUrl = `https://www.google.com/maps/search/${address}`;
            window.open(mapsUrl, '_blank');
        });
    }
    
    // Tracking de clics en redes sociales
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.dataset.platform;
            console.log(`Click en red social: ${platform}`);
            showNotification(`Abriendo ${platform}...`);
        });
    });
}

// Función para pedir productos por WhatsApp
function orderProduct(productName) {
    const message = `Hola! Me interesa el producto: ${productName}. ¿Podrían darme más información?`;
    const whatsappUrl = `https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    showNotification(`Abriendo WhatsApp para pedir ${productName}...`);
}

// Sistema de notificaciones
function showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos básicos
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#4CAF50' : '#f44336',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Función para compartir (Web Share API)
function shareBusinessCard() {
    if (navigator.share) {
        navigator.share({
            title: businessConfig.name,
            text: businessConfig.tagline,
            url: window.location.href
        }).then(() => {
            showNotification('¡Gracias por compartir!');
        }).catch(() => {
            showNotification('Error al compartir');
        });
    } else {
        // Fallback: copiar enlace
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Enlace copiado al portapapeles');
        }).catch(() => {
            showNotification('Error al copiar enlace');
        });
    }
}

// Utilidades
function formatPhoneNumber(phone) {
    // Formatear número de teléfono para mostrar
    return phone.replace(/(\d{4})(\d{2})(\d{4})/, '$1 $2-$3');
}

function getCurrentDayName() {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    return days[new Date().getDay()];
}

// Exponer funciones globales
window.orderProduct = orderProduct;
window.shareBusinessCard = shareBusinessCard;
window.showNotification = showNotification;
