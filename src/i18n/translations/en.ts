
export const en = {
  // Navigation
  nav: {
    home: "Home",
    rooms: "Rooms",
    about: "About",
    contact: "Contact",
    login: "Login",
    register: "Register",
    dashboard: "Dashboard",
    account: "Account",
    reservations: "My Reservations",
    logout: "Logout",
    admin: "Admin Panel"
  },

  // Auth
  auth: {
    login: "Log in",
    register: "Register",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    firstName: "First Name",
    lastName: "Last Name",
    loginTitle: "Log in to your account",
    loginDescription: "Enter your email and password to access your account",
    registerTitle: "Create an account",
    registerDescription: "Enter your information to create an account",
    forgotPassword: "Forgot password?",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    createAccount: "Create an account",
    loggingIn: "Logging in...",
    creatingAccount: "Creating account...",
    agreeToTerms: "I agree to the",
    termsOfService: "terms of service",
    and: "and",
    privacyPolicy: "privacy policy",
    orContinueWith: "or continue with",
    signInWithGoogle: "Sign in with Google",
    signUpWithGoogle: "Sign up with Google",
    successfulLogin: "Successfully logged in!",
    successfulLogout: "Successfully logged out!",
    registrationSuccess: "Registration successful! Please check your email for confirmation.",
    passwordsDontMatch: "Passwords don't match",
    agreeToTermsError: "Please agree to the terms and conditions"
  },

  // Admin
  admin: {
    adminPanel: "Admin Panel",
    loginWithCredentials: "Log in with your administrator credentials",
    verifyingPermissions: "Verifying permissions...",
    adminLogin: "Admin Login",
    adminAccountsNote: "Administrator accounts are created by system administrators.",
    welcomeToAdmin: "Welcome to the admin panel",
    noAdminPrivileges: "You don't have administrator privileges",
    alreadyLoggedIn: "You're already logged in, checking permissions...",
    errorVerifyingPermissions: "Error verifying admin permissions"
  },

  // Dashboard
  dashboard: {
    myDashboard: "My Dashboard",
    upcomingBookings: "Upcoming Bookings",
    pastBookings: "Past Bookings",
    loadingBookings: "Loading your bookings...",
    noUpcomingBookings: "No upcoming bookings",
    noPastBookings: "No booking history",
    browseRooms: "Browse Rooms",
    viewDetails: "View Details",
    modify: "Modify",
    cancel: "Cancel",
    cancelled: "Cancelled",
    confirmed: "Confirmed",
    pending: "Pending"
  },

  // Rooms
  rooms: {
    ourRooms: "Our Rooms",
    roomsDescription: "Find the perfect accommodation that suits your needs, from comfortable dormitories to private rooms.",
    searchAndFilter: "Search & Filter",
    searchPlaceholder: "Search rooms by name or features...",
    roomType: "Room Type",
    allTypes: "All Types",
    dormitory: "Dormitory",
    privateRoom: "Private Room",
    deluxeRoom: "Deluxe Room",
    capacity: "Capacity",
    anyCapacity: "Any Capacity",
    person: "Person",
    people: "People",
    price: "Price",
    lowToHigh: "Low to High",
    highToLow: "High to Low",
    showing: "Showing",
    room: "room",
    noRoomsFound: "No rooms match your search criteria",
    noRoomsDescription: "Try adjusting your filters or search term to find available rooms.",
    resetFilters: "Reset Filters",
    perNight: "per night",
    bookNow: "Book Now"
  },

  // General
  general: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    back: "Back",
    next: "Next",
    previous: "Previous",
    close: "Close",
    open: "Open"
  },

  // Errors
  errors: {
    pageNotFound: "Oops! The page you're looking for cannot be found.",
    pageNotFoundDescription: "The page may have been moved, deleted, or it never existed.",
    returnToHome: "Return to Home"
  }
};

export type TranslationKeys = typeof en;
