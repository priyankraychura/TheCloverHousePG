import React, { useState, useEffect, useRef } from 'react';
import {
  Clover, BedDouble, Wifi, ShieldCheck, LeafyGreen, Sparkles, WashingMachine, BookOpen,
  BatteryCharging, Quote, Menu, X, ChevronLeft, ChevronRight, MapPin, Phone, Mail,
  Instagram, Linkedin, MessageSquare, Check, ChevronDown
} from 'lucide-react';

// --- GLOBAL STYLES & ANIMATIONS ---
const GlobalStyles = () => (
  <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');
        
        body {
            scroll-behavior: smooth;
        }

        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }

        .scroll-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
            transition-delay: var(--animation-delay, 0s);
        }

        .scroll-animate.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-fade-in-up {
            animation: fadeInUp 1s ease-out 0.5s forwards;
            opacity: 0;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-zoom-in {
            animation: zoomIn 0.3s ease-out forwards;
        }

        @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
            animation: bounce 2s infinite;
        }

        .loader {
            width: 48px;
            height: 48px;
            border: 5px solid #004d40;
            border-bottom-color: #d4af37;
            border-radius: 50%;
            display: inline-block;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

    `}</style>
);


// --- HELPER DATA & ASSETS ---
const navLinks = [
  { name: 'Home', href: 'home' },
  { name: 'About Us', href: 'about' },
  { name: 'Facilities', href: 'facilities' },
  { name: 'Rooms & Pricing', href: 'rooms' },
  { name: 'Gallery', href: 'gallery' },
  { name: 'Contact', href: 'contact' },
];

const facilitiesData = [
  { icon: BedDouble, name: 'Furnished Rooms', description: 'Luxurious, comfortable rooms with premium furniture and dedicated study areas.' },
  { icon: Wifi, name: 'High-Speed Wi-Fi', description: 'Blazing-fast, reliable fiber optic internet for seamless connectivity.' },
  { icon: ShieldCheck, name: '24/7 Security', description: 'Round-the-clock security, biometric access, and CCTV surveillance.' },
  { icon: LeafyGreen, name: 'Nutritious Food', description: 'Delicious and healthy home-style vegetarian meals prepared fresh daily.' },
  { icon: Sparkles, name: 'Housekeeping', description: 'Professional staff ensures your living space is always clean and tidy.' },
  { icon: WashingMachine, name: 'Laundry Service', description: 'Convenient and efficient laundry services to ease your daily chores.' },
  { icon: BookOpen, name: 'Study Zones', description: 'Quiet and well-lit study areas designed for concentration.' },
  { icon: BatteryCharging, name: 'Power Backup', description: 'Full power backup system to ensure uninterrupted electricity 24/7.' },
];

const roomTypes = [
  {
    name: 'Double Sharing (Premium)',
    price: '₹17,500 / month',
    features: ['Shared Room & Washroom', 'Air Conditioning', 'High-Speed WiFi', 'Personal Wardrobe', 'RO Drinking Water & 24/7 Water Supply'],
    images: [
      'images/2Sharing.png',
      'images/2Sharing2.png',
    ],
  },
  {
    name: 'Triple Sharing',
    price: '₹16,500 / month',
    features: ['Shared Room & Washroom', 'Air Conditioning', 'High-Speed WiFi', 'Personal Wardrobe', 'RO Drinking Water & 24/7 Water Supply'],
    images: [
      'images/3Sharing6.png',
      'images/3Sharing.png',
      'images/3Sharing2.png',
      'images/3Sharing3.png',

    ],
  },
  {
    name: 'Four Sharing',
    price: '₹15,500 / month',
    features: ['Spacious Shared Room', 'Attached Washroom', 'Air Conditioning', 'High-Speed WiFi', 'Individual Lockers', 'RO Drinking Water & 24/7 Water Supply'],
    images: [
      'images/3Sharing4.png',
      'images/3Sharing5.png',
    ],
  },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Software Engineer', text: "The Clover House is simply the best. The amenities are top-notch, the food is great, and the management is incredibly responsive. It truly feels like a home away from home.", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
  { name: 'Rohan Verma', role: 'University Student', text: "As a student, finding a quiet, clean, and safe place was crucial. The Clover House exceeded all my expectations. The study zones are fantastic, and the high-speed Wi-Fi is a lifesaver.", image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
  { name: 'Anjali Desai', role: 'Marketing Professional', text: "I love the community vibe here. It's a great place to network and make friends. The housekeeping and laundry services make life so much easier for a busy professional like me.", image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=723&q=80' },
];

const galleryImages = [
  { src: 'images/2Sharing.png', alt: 'Modern Kitchen', w: 2, h: 2 },
  { src: 'images/3Sharing6.png', alt: 'Modern Kitchen', w: 2, h: 2 },
  { src: 'images/3Sharing.png', alt: 'Modern Kitchen', w: 2, h: 2 },
  { src: 'images/3Sharing2.png', alt: 'Modern Kitchen', w: 2, h: 2 },
  { src: 'images/3Sharing3.png', alt: 'Modern Kitchen', w: 2, h: 2 },
  { src: 'images/3Sharing4.png', alt: 'Modern Kitchen', w: 2, h: 2 },
  { src: 'images/3Sharing5.png', alt: 'Modern Kitchen', w: 2, h: 2 },
  { src: 'images/Dining.png', alt: 'Modern Dining Room', w: 2, h: 2 },
  { src: 'images/Kitchen1.png', alt: 'Modern Kitchen', w: 2, h: 2 },
  { src: 'images/Building.png', alt: 'Modern Kitchen', w: 2, h: 2 },
];

// --- HOOKS ---
const useScrollAnimation = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.scroll-animate');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.05 }); // Trigger animation sooner

    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);
};


// --- REUSABLE UI COMPONENTS ---

const Container = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ children, subtitle }) => (
  <div className="text-center mb-12 md:mb-16">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#004d40] mb-3 scroll-animate">{children}</h2>
    {subtitle && <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto scroll-animate" style={{ '--animation-delay': '100ms' }}>{subtitle}</p>}
  </div>
);
const Header = ({ activePage, setActivePage, isScrolled, isMenuOpen, setIsMenuOpen }) => {
  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
    document.querySelector(`#${page}-section`)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-md backdrop-blur-lg' : 'bg-transparent'}`}>
      <Container className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <Clover className="h-8 w-8 text-[#004d40]" />
            <span className="text-2xl font-serif font-bold text-[#004d40]">The Clover House</span>
          </div>
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => (
              <a key={link.href} href={`#${link.href}`} onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`text-base font-medium transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-[#d4af37] after:transition-all after:duration-300 ${activePage === link.href ? 'text-[#d4af37] after:w-full' : 'text-[#004d40] hover:text-[#d4af37] hover:after:w-full'}`}>
                {link.name}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <button onClick={() => handleNavClick('contact')} className="bg-[#004d40] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-[#00382e] transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              Book a Visit
            </button>
          </div>
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#004d40] relative z-50">
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </Container>
      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white/95 backdrop-blur-md fixed top-0 left-0 w-full h-screen transition-transform duration-500 ease-in-out z-40 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="flex flex-col items-center justify-center h-full p-4 space-y-6">
          {navLinks.map(link => (
            <a key={link.href} href={`#${link.href}`} onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className={`text-2xl font-medium w-full text-center py-3 rounded-md ${activePage === link.href ? 'text-[#d4af37]' : 'text-[#004d40]'}`}>
              {link.name}
            </a>
          ))}
          <button onClick={() => handleNavClick('contact')} className="bg-[#004d40] text-white font-bold py-3 px-8 text-lg rounded-lg shadow-lg hover:bg-[#00382e] transition-transform duration-300 hover:scale-105 w-full max-w-xs">
            Book a Visit
          </button>
        </nav>
      </div>
    </header>
  );
};

const Footer = ({ setActivePage }) => {
  const handleNavClick = (page) => {
    setActivePage(page);
    document.querySelector(`#${page}-section`)?.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <footer className="bg-[#004d40] text-white font-sans">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Clover className="h-8 w-8 text-white" />
              <span className="text-2xl font-serif font-bold">The Clover House</span>
            </div>
            <p className="text-gray-300">Where comfort meets elegance. Premium living spaces for students and professionals.</p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.instagram.com/thecloverhouse.pg?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target='_blank' className="text-gray-300 hover:text-[#d4af37] transition-colors"><Instagram /></a>
              <a href="#" className="text-gray-300 hover:text-[#d4af37] transition-colors"><Linkedin /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#d4af37] mb-4 tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a href={`#${link.href}`} onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }} className="text-gray-300 hover:text-white transition-colors">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#d4af37] mb-4 tracking-wider">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3"><MapPin className="h-5 w-5 mt-1 flex-shrink-0" /><a href="#" className="hover:text-white">Palm Beach Bunglows, 24, Zydus Hospital Rd, Thaltej, Ahmedabad, Gujarat 380059</a></li>
              <li className="flex items-center gap-3"><Phone className="h-5 w-5" /><a href="tel:+911234567890" className="hover:text-white">+91 9429042215 <br></br> +91 7622038446</a></li>
              <li className="flex items-center gap-3"><Mail className="h-5 w-5" /><a href="mailto:contact@cloverhouse.com" className="hover:text-white">thecloverhouses@gmail.com</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#d4af37] mb-4 tracking-wider">Stay Updated</h3>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for latest updates and offers.</p>
            <form className="flex">
              <input type="email" placeholder="Your Email" className="w-full rounded-l-md px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[#004d40]" />
              <button type="submit" className="bg-[#d4af37] text-[#004d40] font-bold px-4 rounded-r-md hover:bg-yellow-500 transition-colors">Go</button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} The Clover House. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

const WhatsAppButton = () => (
  <a href="https://wa.me/9429042215" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg z-40 hover:bg-green-600 transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
    <MessageSquare className="h-8 w-8" />
  </a>
);

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => setCurrentIndex(prev => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {testimonials.map((t, i) => (
            <div key={i} className="w-full flex-shrink-0 text-center px-4 md:px-12">
              <Quote className="h-12 w-12 text-[#d4af37] mx-auto mb-4" />
              <p className="text-lg md:text-xl italic text-gray-600 mb-6">"{t.text}"</p>
              <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-2 object-cover border-4 border-white shadow-md" />
              <h4 className="font-bold font-serif text-[#004d40] text-xl">{t.name}</h4>
              <p className="text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
      <button onClick={prevTestimonial} className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-md hover:bg-white transition-all"><ChevronLeft className="h-6 w-6 text-[#004d40]" /></button>
      <button onClick={nextTestimonial} className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-md hover:bg-white transition-all"><ChevronRight className="h-6 w-6 text-[#004d40]" /></button>
    </div>
  );
};

const FacilityModal = ({ facility, onClose }) => {
  if (!facility) return null;
  const IconComponent = facility.icon;
  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden animate-zoom-in" onClick={(e) => e.stopPropagation()}>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#004d40]/10 p-3 rounded-lg"><IconComponent className="h-8 w-8 text-[#004d40]" /></div>
            <h3 className="text-2xl font-serif font-bold text-[#004d40]">{facility.name}</h3>
          </div>
          <p className="text-gray-600 mb-6">{facility.description}</p>
          <button onClick={onClose} className="bg-[#d4af37] text-[#004d40] font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105">Close</button>
        </div>
      </div>
    </div>
  );
};

const PageSection = ({ id, children, className = '' }) => (
  <section id={`${id}-section`} className={`py-12 md:py-20 ${className}`}>
    {children}
  </section>
);

const Loader = () => (
  <div className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center">
    <div className="loader"></div>
    <p className="mt-4 text-[#004d40] font-semibold">Loading Elegance...</p>
  </div>
);


// --- PAGE COMPONENTS ---

const HomePage = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrollY * 0.5}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="home-section">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div ref={heroRef} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="relative text-center text-white z-10 p-4">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>The Clover House</h1>
            <p className="text-xl md:text-2xl mb-8" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>Where Comfort Meets Elegance.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => document.querySelector('#contact-section').scrollIntoView({ behavior: 'smooth' })} className="bg-[#d4af37] text-[#004d40] font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">Book a Visit</button>
              <button onClick={() => document.querySelector('#rooms-section').scrollIntoView({ behavior: 'smooth' })} className="bg-white/10 border-2 border-white backdrop-blur-sm text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-white hover:text-[#004d40] transition-all duration-300">Check Availability</button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 text-white z-10 animate-bounce-slow">
          <ChevronDown className="h-8 w-8" />
        </div>
      </section>

      <PageSection id="facilities-preview" className="bg-emerald-50/50">
        <Container>
          <SectionTitle subtitle="We provide state-of-the-art facilities designed for your comfort, safety, and productivity. Experience a lifestyle that blends luxury with convenience.">
            Premium Living, Redefined
          </SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8">
            {facilitiesData.map((facility, index) => {
              const IconComponent = facility.icon;
              return (
                <div key={index} className="text-center p-4 scroll-animate" style={{ '--animation-delay': `${(index + 2) * 100}ms` }}>
                  <div className="inline-block bg-white p-4 rounded-full mb-4 shadow-md transform transition-transform duration-300 hover:scale-110 hover:shadow-lg">
                    <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-[#004d40]" />
                  </div>
                  <h3 className="font-semibold text-base md:text-lg text-gray-800">{facility.name}</h3>
                </div>
              )
            })}
          </div>
        </Container>
      </PageSection>

      <PageSection id="about-preview">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="scroll-animate">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#004d40] mb-4">A Community You'll Love to Call Home</h2>
              <p className="text-lg text-gray-600 mb-6">
                The Clover House is more than just a place to stay; it's a vibrant community of like-minded individuals. We foster an environment of collaboration, friendship, and personal growth.
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-center gap-3"><span className="bg-[#d4af37] text-[#004d40] rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm">✓</span><span>Networking events and workshops.</span></li>
                <li className="flex items-center gap-3"><span className="bg-[#d4af37] text-[#004d40] rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm">✓</span><span>Recreational areas and common lounges.</span></li>
                <li className="flex items-center gap-3"><span className="bg-[#d4af37] text-[#004d40] rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm">✓</span><span>A supportive and inclusive atmosphere.</span></li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4 scroll-animate" style={{ '--animation-delay': `100ms` }}>
              <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Lounge" className="rounded-lg shadow-lg aspect-square object-cover transform transition-transform duration-500 hover:scale-105" />
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1532&q=80" alt="Study area" className="rounded-lg shadow-lg aspect-square object-cover mt-8 transform transition-transform duration-500 hover:scale-105" />
            </div>
          </div>
        </Container>
      </PageSection>

      <PageSection id="testimonials-preview" className="bg-emerald-50/50">
        <Container>
          <SectionTitle>What Our Residents Say</SectionTitle>
          <div className="scroll-animate" style={{ '--animation-delay': '100ms' }}>
            <TestimonialCarousel />
          </div>
        </Container>
      </PageSection>
    </div>
  );
};

const AboutPage = () => (
  <div id="about-section">
    <div className="bg-emerald-50/50 pt-28 pb-12 md:pt-32 md:pb-16">
      <Container className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#004d40] scroll-animate">Our Story</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 scroll-animate" style={{ '--animation-delay': '100ms' }}>Discover the vision and values behind The Clover House.</p>
      </Container>
    </div>
    <PageSection>
      <Container>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="scroll-animate">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Founders" className="rounded-lg shadow-xl" />
          </div>
          <div className="scroll-animate" style={{ '--animation-delay': '100ms' }}>
            <h2 className="text-3xl font-serif font-bold text-[#004d40] mb-4">From a Vision to a Home</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">The Clover House was founded with a simple yet powerful idea: to create a living space that goes beyond just accommodation. We wanted to build a premium environment where students and young professionals could thrive, feel safe, and be part of a supportive community.</p>
            <p className="text-gray-600 leading-relaxed">Our journey began in 2020, driven by a passion for hospitality and a deep understanding of the needs of modern urban dwellers. Every detail has been thoughtfully curated to ensure an unparalleled living experience.</p>
          </div>
        </div>
      </Container>
    </PageSection>
    <PageSection id="why-us" className="bg-emerald-50/50">
      <Container>
        <SectionTitle subtitle="We are committed to providing an experience, not just a room.">Why Choose Us?</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-left scroll-animate transform transition-transform duration-300 hover:-translate-y-2"><h3 className="text-xl font-serif font-bold text-[#004d40] mb-2">Unmatched Comfort</h3><p className="text-gray-600">Ergonomically designed furniture, premium bedding, and spacious rooms ensure you feel right at home.</p></div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-left scroll-animate transform transition-transform duration-300 hover:-translate-y-2" style={{ '--animation-delay': '100ms' }}><h3 className="text-xl font-serif font-bold text-[#004d40] mb-2">Absolute Security</h3><p className="text-gray-600">With 24/7 security, CCTV, and biometric access, your safety is our utmost priority.</p></div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-left scroll-animate transform transition-transform duration-300 hover:-translate-y-2" style={{ '--animation-delay': '200ms' }}><h3 className="text-xl font-serif font-bold text-[#004d40] mb-2">Thriving Community</h3><p className="text-gray-600">Engage in community events, workshops, and build connections that last a lifetime.</p></div>
        </div>
      </Container>
    </PageSection>
  </div>
);

const FacilitiesPage = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  return (
    <div id="facilities-section">
      <div className="bg-emerald-50/50 pt-28 pb-12 md:pt-32 md:pb-16">
        <Container className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#004d40] scroll-animate">World-Class Facilities</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 scroll-animate" style={{ '--animation-delay': '100ms' }}>Every amenity is designed to enhance your living experience.</p>
        </Container>
      </div>
      <PageSection>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {facilitiesData.map((facility, index) => {
              const IconComponent = facility.icon;
              return (
                <div key={index} onClick={() => setSelectedFacility(facility)}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 scroll-animate">
                  <div className="bg-[#004d40]/10 inline-block p-3 rounded-lg mb-4">
                    <IconComponent className="h-8 w-8 text-[#004d40]" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#004d40] mb-2">{facility.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{facility.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </PageSection>
      <FacilityModal facility={selectedFacility} onClose={() => setSelectedFacility(null)} />
    </div>
  );
};

const RoomCard = ({ room, index }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage(prev => (prev + 1) % room.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage(prev => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center scroll-animate">
      <div className={`relative group ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg shadow-2xl">
          {room.images.map((img, i) => (
            <img key={i} src={img} alt={`${room.name} ${i + 1}`} className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${i === currentImage ? 'opacity-100' : 'opacity-0'}`} />
          ))}
        </div>
        <button onClick={prevImage} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"><ChevronLeft className="h-6 w-6 text-[#004d40]" /></button>
        <button onClick={nextImage} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"><ChevronRight className="h-6 w-6 text-[#004d40]" /></button>
      </div>
      <div className={`order-1 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
        <h2 className="text-3xl font-serif font-bold text-[#004d40]">{room.name}</h2>
        <p className="text-2xl font-semibold text-[#d4af37] my-3">{room.price}</p>
        <ul className="space-y-3 text-gray-700 mb-6">
          {room.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <button onClick={() => document.querySelector('#contact-section').scrollIntoView({ behavior: 'smooth' })} className="bg-[#004d40] text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-[#00382e] transition-all duration-300 transform hover:scale-105">Inquire Now</button>
      </div>
    </div>
  );
};

const RoomsPage = () => (
  <div id="rooms-section">
    <div className="bg-emerald-50/50 pt-28 pb-12 md:pt-32 md:pb-16">
      <Container className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#004d40] scroll-animate">Our Rooms & Pricing</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 scroll-animate" style={{ '--animation-delay': '100ms' }}>Find the perfect space that suits your style and budget. All prices are inclusive of meals, Wi-Fi, housekeeping, and laundry.</p>
      </Container>
    </div>
    <PageSection>
      <Container className="space-y-20">
        {roomTypes.map((room, index) => <RoomCard key={index} room={room} index={index} />)}
      </Container>
    </PageSection>
  </div>
);

const GalleryPage = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const getSpan = (w, h) => `col-span-${w} row-span-${h}`;

  return (
    <div id="gallery-section">
      <div className="bg-emerald-50/50 pt-28 pb-12 md:pt-32 md:pb-16">
        <Container className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#004d40] scroll-animate">Gallery</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 scroll-animate" style={{ '--animation-delay': '100ms' }}>A glimpse into the elegant lifestyle at The Clover House.</p>
        </Container>
      </div>
      <PageSection>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4" style={{ gridAutoRows: '250px' }}>
            {galleryImages.map((img, index) => (
              <div key={index} className={`scroll-animate ${getSpan(img.w, img.h)}`}>
                <img onClick={() => setLightboxImage(img.src)} src={img.src} alt={img.alt} className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105" />
              </div>
            ))}
          </div>
        </Container>
      </PageSection>
      {lightboxImage && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4" onClick={() => setLightboxImage(null)}>
          <button className="absolute top-4 right-4 text-white z-10"><X className="h-8 w-8" /></button>
          <img src={lightboxImage} alt="Enlarged view" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-zoom-in" />
        </div>
      )}
    </div>
  );
};

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);
    alert("Thank you for your inquiry! We will get back to you shortly.");
    e.target.reset();
  };

  return (
    <div id="contact-section">
      <div className="bg-emerald-50/50 pt-28 pb-12 md:pt-32 md:pb-16">
        <Container className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#004d40] scroll-animate">Get In Touch</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 scroll-animate" style={{ '--animation-delay': '100ms' }}>We'd love to hear from you. Schedule a visit or send us a message.</p>
        </Container>
      </div>
      <PageSection>
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-100 scroll-animate">
              <h2 className="text-3xl font-serif font-bold text-[#004d40] mb-6">Send an Inquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" id="name" name="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37]" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37]" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="tel" id="phone" name="phone" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37]" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" name="message" rows="4" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37]"></textarea>
                </div>
                <div><button type="submit" className="w-full bg-[#004d40] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-[#00382e] transition-all duration-300 transform hover:scale-105">Send Message</button></div>
              </form>
            </div>
            <div className="scroll-animate" style={{ '--animation-delay': '100ms' }}>
              <h2 className="text-3xl font-serif font-bold text-[#004d40] mb-6">Our Location</h2>
              <div className="bg-gray-200 h-80 rounded-lg shadow-lg mb-6 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.112987315785!2d72.50499947477118!3d23.05631891506908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9d560bcc187d%3A0x5cd53e8db9821ae0!2sThe%20Clover%20House!5e0!3m2!1sen!2sin!4v1759328717236!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3"><MapPin className="h-6 w-6 text-[#004d40] mt-1 flex-shrink-0" /><span>Palm Beach Bunglows, 24, Zydus Hospital Rd, Thaltej, Ahmedabad, Gujarat 380059</span></li>
                <li className="flex items-center gap-3"><Phone className="h-6 w-6 text-[#004d40]" /><a href="tel:+911234567890" className="hover:text-[#004d40] font-semibold">+91 9429042215 | +91 7622038446 </a></li>
                <li className="flex items-center gap-3"><Mail className="h-6 w-6 text-[#004d40]" /><a href="mailto:contact@cloverhouse.com" className="hover:text-[#004d40] font-semibold">thecloverhouses@gmail.com</a></li>
              </ul>
              <button className="mt-8 w-full bg-[#d4af37] text-[#004d40] font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105">Schedule a Visit on Calendar</button>
            </div>
          </div>
        </Container>
      </PageSection>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

export default function App() {
  const [page, setPage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useScrollAnimation();

  useEffect(() => {
    // Simulate asset loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isLoading) return;

    const sections = document.querySelectorAll('[id$="-section"]');
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      sections.forEach(section => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          const pageId = section.id.replace('-section', '').replace('-preview', '');
          if (page !== pageId) {
            setPage(pageId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, isLoading]);

  return (
    <>
      <GlobalStyles />
      {isLoading && <Loader />}
      <div className={`bg-white text-gray-800 font-sans transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header
          activePage={page}
          setActivePage={setPage}
          isScrolled={isScrolled}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <div className={`transition-all duration-300 ${isMenuOpen ? 'blur-sm' : ''}`}>
          <main>
            <HomePage />
            <AboutPage />
            <FacilitiesPage />
            <RoomsPage />
            <GalleryPage />
            <ContactPage />
          </main>
          <Footer setActivePage={setPage} />
        </div>
        <WhatsAppButton />
      </div>
    </>
  );
}

