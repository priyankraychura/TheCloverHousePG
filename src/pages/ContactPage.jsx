import React from 'react';
import { 
    Clover, Phone, Mail, MapPin, Instagram, MessageSquare, Globe
} from 'lucide-react';

const ContactPage = () => {
    const contactInfo = {
        managers: [
            { name: "Priyank Raychura", number: "+91 94290 42215" },
            { name: "Meet Patel", number: "+91 76220 38446" }
        ],
        email: "thecloverhouses@gmail.com",
        address: "The Clover House, Palm Beach Bunglows, 24, Zydus Hospital Rd, Thaltej, Ahmedabad, Gujarat 380059",
        instagram: {
            handle: "@thecloverhouse.pg",
            url: "https://www.instagram.com/thecloverhouse.pg" // Replace with actual URL
        },
        whatsapp: "+91 9429042215", // Use one of the main numbers for WhatsApp
        website: "https://thecloverhouse.vercel.app/", // Placeholder
        mapUrl: "https://maps.app.goo.gl/Q5h8nYfZihB19DNaA"
    };

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl shadow-emerald-900/10">
            <div className="p-8">
                {/* Header */}
                <header className="text-center mb-10">
                    <Clover className="mx-auto text-[#004d40]" size={64} strokeWidth={1.5} />
                    <h1 className="text-4xl font-serif text-[#004d40] mt-4">The Clover House</h1>
                    <p className="text-gray-500 text-sm mt-1 tracking-wide">Premium PG for Students & Professionals</p>
                </header>

                {/* Contact Actions */}
                <main className="space-y-6">
                    {/* Phone Numbers */}
                    <div>
                        <h2 className="font-semibold text-gray-500 text-xs uppercase tracking-wider mb-2">Call Us</h2>
                        <div className="bg-emerald-50 rounded-xl p-4 space-y-3">
                            {contactInfo.managers.map((manager, index) => (
                                <a key={index} href={`tel:${manager.number.replace(/\s/g, '')}`} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:bg-emerald-100 transition-colors">
                                    <div>
                                        <p className="font-semibold text-[#004d40]">{manager.name}</p>
                                        <p className="text-gray-600">{manager.number}</p>
                                    </div>
                                    <Phone className="text-emerald-600" size={20}/>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Digital Contact */}
                     <div>
                        <h2 className="font-semibold text-gray-500 text-xs uppercase tracking-wider mb-2">Connect Online</h2>
                        <div className="space-y-2">
                             <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                                <Mail className="text-[#004d40]" size={20}/>
                                <span className="text-gray-700">{contactInfo.email}</span>
                            </a>
                            <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                                <MessageSquare className="text-green-500" size={20}/>
                                <span className="text-gray-700">Chat on WhatsApp</span>
                            </a>
                             <a href={contactInfo.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                                <Instagram className="text-pink-500" size={20}/>
                                <span className="text-gray-700">{contactInfo.instagram.handle}</span>
                            </a>
                             <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                                <Globe className="text-blue-500" size={20}/>
                                <span className="text-gray-700">Visit our Website</span>
                            </a>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                         <h2 className="font-semibold text-gray-500 text-xs uppercase tracking-wider mb-2">Our Location</h2>
                         <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-red-500 flex-shrink-0 mt-1" size={20}/>
                                <p className="text-gray-700 leading-relaxed">{contactInfo.address}</p>
                            </div>
                            <a href={contactInfo.mapUrl} target="_blank" rel="noopener noreferrer" 
                               className="block w-full text-center bg-[#004d40] text-white font-bold py-3 px-4 rounded-lg mt-4 hover:bg-[#00382e] transition-colors">
                                Get Directions
                            </a>
                         </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ContactPage
