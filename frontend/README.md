# Healthtech: Follow-Up Reminder System

## Overview

The Healthtech Follow-Up Reminder System is designed to help clinics and private doctors manage and automate patient follow-up reminders. The tool ensures that both doctors and patients are notified about upcoming appointments via SMS, WhatsApp, or other communication channels, reducing missed appointments and improving patient care.

## Features
- Automated reminders for patient appointments
- Multi-channel notifications (SMS, WhatsApp, etc.)
- Doctor and patient dashboards
- Secure authentication and role-based access
- Easy integration with existing clinic workflows

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/healthtech-reminder.git
   cd healthtech-reminder
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Configure environment variables as needed (see `.env.example` if provided).

### Running the App
To start the development server:
```bash
npm run dev
# or
yarn dev
```

By default, the app will be available at:
  ➜  Local:   http://localhost:4175/
  ➜  Network: http://192.168.1.125:4175/

### Building for Production
```bash
npm run build
# or
yarn build
```

## Usage
- Doctors and staff can log in to schedule and manage patient appointments.
- Patients will receive reminders via their preferred communication channels.
- Admin dashboard provides an overview of upcoming and past appointments.

### Demo Login Information
This system uses a demo login mechanism for testing purposes. There is no real authentication—roles are determined by the email you use, and any password is accepted.

**How it works:**
- If your email contains **"admin"** (e.g., `admin@demo.com`), you will be logged in as an **admin**.
- If your email contains **"doctor"** or **"staff"** (e.g., `doctor@demo.com`, `staff@clinic.com`), you will be logged in as a **provider**.
- Any other email will be treated as a **patient**.
- **Password:** You can enter anything; it is not checked.

**Example logins:**
- Admin:    
  - Email: `admin@demo.com`    
  - Password: (any value)
- Provider:    
  - Email: `doctor@demo.com`    
  - Password: (any value)
- Patient:    
  - Email: `john@demo.com`    
  - Password: (any value)

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

---

*For support or questions, please open an issue on GitHub.*
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy or preview this project?

### Preview Your Production Build Locally
After running `npm run build`, you can preview your production build locally with:

```bash
npm run preview
```

This will start a local server. By default, your app will be available at:
- http://localhost:4173/

If that port is already in use, Vite will use the next available port (e.g., http://localhost:4174/). Check your terminal for the exact URL.

Open the provided URL in your browser to test the production build.

