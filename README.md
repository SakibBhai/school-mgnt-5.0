# EduManage Pro - School Management System

A comprehensive, modern school management system built with Next.js, TypeScript, and Tailwind CSS. This application provides a complete solution for managing students, teachers, classes, exams, attendance, fees, and more.

## 🚀 Features

### Admin Dashboard
- **Student Management**: Complete student profiles, enrollment, and academic records
- **Teacher Management**: Staff profiles, assignments, and performance tracking
- **Class Management**: Class creation, section management, and subject assignments
- **Exam Management**: Exam scheduling, result entry, and marksheet generation
- **Attendance Tracking**: Real-time attendance monitoring and analytics
- **Fee Management**: Fee collection, payment tracking, and financial reports
- **Library Management**: Book inventory, issue/return tracking
- **Inventory Management**: School asset and resource management
- **Notice Board**: Announcements and communication system
- **Calendar**: Event scheduling and academic calendar

### Student Portal
- Personal dashboard with academic overview
- Fee payment and transaction history
- Notice board and announcements
- Academic performance tracking

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN/UI
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Animations**: Framer Motion (ready for integration)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SakibBhai/school-mgnt-5.0.git
   cd school-mgnt-5.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
school-mgnt-5.0/
├── app/
│   ├── admin/              # Admin dashboard pages
│   │   ├── dashboard/       # Main admin dashboard
│   │   ├── students/        # Student management
│   │   ├── teachers/        # Teacher management
│   │   ├── classes/         # Class management
│   │   ├── exams/          # Exam management
│   │   ├── attendance/     # Attendance tracking
│   │   ├── fees/           # Fee management
│   │   ├── library/        # Library management
│   │   ├── inventory/      # Inventory management
│   │   ├── notices/        # Notice board
│   │   ├── calendar/       # Calendar events
│   │   └── settings/       # System settings
│   ├── portal/             # Student portal
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── admin-header.tsx    # Admin navigation header
│   ├── admin-sidebar.tsx   # Admin sidebar navigation
│   ├── student-header.tsx  # Student portal header
│   └── student-sidebar.tsx # Student portal sidebar
├── lib/
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## 🎨 Design System

- **Color Scheme**: Modern black and white with accent colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Consistent UI components using ShadCN/UI
- **Responsive**: Mobile-first design approach
- **Accessibility**: WCAG compliant components

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Standards

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Component-based architecture
- Responsive design patterns

## 🚀 Deployment

The application is configured for easy deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Configure environment variables** (if any)
3. **Deploy** - Vercel will automatically build and deploy

## 📱 Features in Development

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app integration
- [ ] API documentation
- [ ] Multi-language support
- [ ] Advanced reporting system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**EduManage Pro** - Empowering educational institutions with modern technology.