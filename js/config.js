// Configuración de la Panadería Don José
const businessConfig = {
    name: "Panadería Don José",
    tagline: "Panadería artesanal desde 1995",
    description: "Desde 1995, hemos sido la panadería de confianza de Río Cuarto. Elaboramos pan fresco todos los días, medialunas artesanales, facturas caseras y tortas para ocasiones especiales.",
    
    // Información de contacto
    contact: {
        phone: "+543564000000",
        email: "info@panaderiaqdonjose.com",
        whatsapp: "543564000000",
        address: {
            street: "Lavalle 547",
            city: "Río Cuarto",
            state: "Córdoba",
            zip: "5800",
            full: "Lavalle 547, Río Cuarto, Córdoba"
        }
    },
    
    // Horarios de atención
    hours: {
        monday: { open: "08:00", close: "13:00", secondOpen: "17:00", secondClose: "20:00" },
        tuesday: { open: "08:00", close: "13:00", secondOpen: "17:00", secondClose: "20:00" },
        wednesday: { open: "08:00", close: "13:00", secondOpen: "17:00", secondClose: "20:00" },
        thursday: { open: "08:00", close: "13:00", secondOpen: "17:00", secondClose: "20:00" },
        friday: { open: "08:00", close: "13:00", secondOpen: "17:00", secondClose: "20:00" },
        saturday: { open: "08:00", close: "13:00", secondOpen: "17:00", secondClose: "20:00" },
        sunday: { closed: true }
    },
    
    // Redes sociales
    social: {
        facebook: "https://www.facebook.com/panaderiaqdonjose",
        instagram: "https://www.instagram.com/panaderiaqdonjose",
        whatsapp: "https://wa.me/543564000000",
        google: "https://goo.gl/maps/Fn9eYJciHw3YFBLJ9"
    },
    
    // Productos
    products: [
        {
            id: "pan-frances",
            name: "Pan Francés",
            description: "Nuestro clásico pan francés, recién horneado cada mañana con masa madre tradicional.",
            price: "Desde $800",
            icon: "fas fa-bread-slice"
        },
        {
            id: "medialunas",
            name: "Medialunas",
            description: "Medialunas de manteca y grasa, dulces y saladas. La especialidad de la casa.",
            price: "Docena: $1500",
            icon: "fas fa-cookie-bite"
        },
        {
            id: "tortas",
            name: "Tortas",
            description: "Tortas artesanales para toda ocasión. Hacemos por encargo con 24hs de anticipación.",
            price: "Desde $3500",
            icon: "fas fa-birthday-cake"
        },
        {
            id: "facturas",
            name: "Facturas",
            description: "Variedad de facturas: vigilantes, berlinesas, churros, cañoncitos y más.",
            price: "Docena: $2000",
            icon: "fas fa-cupcake"
        }
    ],
    
    // Configuración del mapa
    map: {
        latitude: -33.1301,
        longitude: -64.3496,
        zoom: 16
    },
    
    // Configuración de la aplicación
    app: {
        theme: "light", // light o dark
        language: "es",
        currency: "ARS",
        timezone: "America/Argentina/Cordoba"
    }
};

// Exportar configuración para uso global
window.businessConfig = businessConfig;
