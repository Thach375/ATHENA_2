export const AppObject = {
  COLLECTIONS: {
    ADMIN: 'admin',
    USER: 'user',
    SCHOOL: 'school',
    MAJOR: 'major',
    MENTOR: 'mentor',
    SCHOLARSHIP: 'scholarship',
    PROFILE: 'profile',
    CHANCES_PROPERTY: 'chances-property',
    SCHEDULER: 'scheduler',
    FOUNDER: 'founder',
    SCHEDULER_PROFILE: 'scheduler-profile',
    MENTOR_CALENDAR: 'mentor-calendar',
    CHANCE_LOGS: 'chance-log',
  },
  APP_PROVIDERS: {
    GOOGLE_AUTH: 'GOOGLE_AUTH',
    GOOGLE_MEET: 'GOOGLE_MEET',
    GOOGLE_MAIL: 'GOOGLE_MAIL',
    OPEN_AI: 'OPEN_AI',
  },
  EMAIL_TEMPLATES: {
    USER_CONSULTATION: {
      SUBJECT: 'User Consultation Request Notification',
      TEMPLATE: 'contact-support.ejs',
    },
    PURCHASE: {
      SUBJECT:
        'Confirm Your Mentoring Session Booking and Payment Instructions',
      TEMPLATE: 'purchased.ejs',
    },
    PAYMENT_FAILED: {
      SUBJECT: 'Payment Failed - Mentoring Session Booking Cancelled',
      TEMPLATE: 'payment-failed.ejs',
    },
    PAYMENT_SUCCESS: {
      SUBJECT: 'Your Mentoring Session is Confirmed!',
      TEMPLATE: 'payment-success.ejs',
    },
  },
};
