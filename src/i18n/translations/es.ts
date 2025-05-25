
import { TranslationKeys } from './en';

export const es: TranslationKeys = {
  // Navegación
  nav: {
    home: "Inicio",
    rooms: "Habitaciones",
    about: "Acerca de",
    contact: "Contacto",
    login: "Iniciar sesión",
    register: "Registrarse",
    dashboard: "Panel",
    account: "Cuenta",
    reservations: "Mis Reservas",
    logout: "Cerrar sesión",
    admin: "Panel de Admin"
  },

  // Autenticación
  auth: {
    login: "Iniciar sesión",
    register: "Registrarse",
    email: "Email",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    firstName: "Nombre",
    lastName: "Apellido",
    loginTitle: "Inicia sesión en tu cuenta",
    loginDescription: "Ingresa tu email y contraseña para acceder a tu cuenta",
    registerTitle: "Crear una cuenta",
    registerDescription: "Ingresa tu información para crear una cuenta",
    forgotPassword: "¿Olvidaste tu contraseña?",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    dontHaveAccount: "¿No tienes una cuenta?",
    createAccount: "Crear una cuenta",
    loggingIn: "Iniciando sesión...",
    creatingAccount: "Creando cuenta...",
    agreeToTerms: "Acepto los",
    termsOfService: "términos de servicio",
    and: "y",
    privacyPolicy: "política de privacidad",
    orContinueWith: "o continúa con",
    signInWithGoogle: "Iniciar sesión con Google",
    signUpWithGoogle: "Registrarse con Google",
    successfulLogin: "¡Sesión iniciada exitosamente!",
    successfulLogout: "¡Sesión cerrada exitosamente!",
    registrationSuccess: "¡Registro exitoso! Por favor revisa tu email para confirmar.",
    passwordsDontMatch: "Las contraseñas no coinciden",
    agreeToTermsError: "Por favor acepta los términos y condiciones"
  },

  // Admin
  admin: {
    adminPanel: "Panel de Administración",
    loginWithCredentials: "Inicia sesión con tus credenciales de administrador",
    verifyingPermissions: "Verificando permisos...",
    adminLogin: "Acceso de Admin",
    adminAccountsNote: "Las cuentas de administrador son creadas por administradores del sistema.",
    welcomeToAdmin: "Bienvenido al panel de administración",
    noAdminPrivileges: "No tienes privilegios de administrador",
    alreadyLoggedIn: "Ya estás logueado, verificando permisos...",
    errorVerifyingPermissions: "Error verificando permisos de administrador"
  },

  // Panel
  dashboard: {
    myDashboard: "Mi Panel",
    upcomingBookings: "Próximas Reservas",
    pastBookings: "Reservas Pasadas",
    loadingBookings: "Cargando tus reservas...",
    noUpcomingBookings: "No tienes próximas reservas",
    noPastBookings: "No tienes historial de reservas",
    browseRooms: "Ver Habitaciones",
    viewDetails: "Ver Detalles",
    modify: "Modificar",
    cancel: "Cancelar",
    cancelled: "Cancelada",
    confirmed: "Confirmada",
    pending: "Pendiente"
  },

  // Habitaciones
  rooms: {
    ourRooms: "Nuestras Habitaciones",
    roomsDescription: "Encuentra el alojamiento perfecto que se adapte a tus necesidades, desde dormitorios cómodos hasta habitaciones privadas.",
    searchAndFilter: "Buscar y Filtrar",
    searchPlaceholder: "Buscar habitaciones por nombre o características...",
    roomType: "Tipo de Habitación",
    allTypes: "Todos los Tipos",
    dormitory: "Dormitorio",
    privateRoom: "Habitación Privada",
    deluxeRoom: "Habitación Deluxe",
    capacity: "Capacidad",
    anyCapacity: "Cualquier Capacidad",
    person: "Persona",
    people: "Personas",
    price: "Precio",
    lowToHigh: "Menor a Mayor",
    highToLow: "Mayor a Menor",
    showing: "Mostrando",
    room: "habitación",
    noRoomsFound: "No se encontraron habitaciones que coincidan con tu búsqueda",
    noRoomsDescription: "Intenta ajustar tus filtros o términos de búsqueda para encontrar habitaciones disponibles.",
    resetFilters: "Reiniciar Filtros",
    perNight: "por noche",
    bookNow: "Reservar Ahora"
  },

  // General
  general: {
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    cancel: "Cancelar",
    confirm: "Confirmar",
    save: "Guardar",
    edit: "Editar",
    delete: "Eliminar",
    back: "Atrás",
    next: "Siguiente",
    previous: "Anterior",
    close: "Cerrar",
    open: "Abrir"
  },

  // Errores
  errors: {
    pageNotFound: "¡Ups! La página que buscas no se puede encontrar.",
    pageNotFoundDescription: "La página puede haber sido movida, eliminada, o nunca existió.",
    returnToHome: "Volver al Inicio"
  }
};
