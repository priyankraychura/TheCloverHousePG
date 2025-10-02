import React, { useState } from 'react';
import { Clover, User, Phone, BedDouble, Calendar, Send } from 'lucide-react';
import '../App.css'

// --- THE BOOKING PAGE COMPONENT ---
const BookingPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        roomType: '',
        moveInDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Booking Request:", formData);
        // Here you would typically send the data to a backend server
        alert("Thank you for your interest! We have received your booking request and will contact you shortly to confirm the details.");
        // Reset form state
        setFormData({
            name: '',
            phone: '',
            roomType: '',
            moveInDate: ''
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl shadow-emerald-900/10">
            <div className="p-8">
                {/* Header */}
                <header className="text-center mb-10">
                    <Clover className="mx-auto text-[#004d40]" size={64} strokeWidth={1.5} />
                    <h1 className="text-4xl font-serif text-[#004d40] mt-4">Secure Your Spot</h1>
                    <p className="text-gray-500 text-sm mt-1 tracking-wide">Fill in your details and we'll get in touch to finalize your stay.</p>
                </header>

                {/* Booking Form */}
                <main>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Full Name</label>
                            <div className="relative mt-2">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    required 
                                    placeholder="e.g., Priya Sharma"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d40]/50 focus:border-[#004d40] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label htmlFor="phone" className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Contact Number</label>
                            <div className="relative mt-2">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    required 
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d40]/50 focus:border-[#004d40] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Room Type */}
                        <div>
                            <label htmlFor="roomType" className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Preferred Room Type</label>
                            <div className="relative mt-2">
                                <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                                <select 
                                    id="roomType" 
                                    name="roomType" 
                                    required
                                    value={formData.roomType}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d40]/50 focus:border-[#004d40] transition-colors appearance-none bg-white"
                                >
                                    <option value="" disabled>Select an option</option>
                                    <option value="single">Single Occupancy (Premium)</option>
                                    <option value="double">Double Sharing</option>
                                    <option value="triple">Triple Sharing</option>
                                </select>
                            </div>
                        </div>

                        {/* Move-in Date */}
                        <div>
                            <label htmlFor="moveInDate" className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Preferred Move-in Date</label>
                            <div className="relative mt-2">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
                                <input 
                                    type="date" 
                                    id="moveInDate" 
                                    name="moveInDate" 
                                    required
                                    placeholder="Select a date"
                                    min={new Date().toISOString().split("T")[0]}
                                    value={formData.moveInDate}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d40]/50 focus:border-[#004d40] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button 
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-[#004d40] text-white font-bold py-4 px-4 rounded-lg hover:bg-[#00382e] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <Send size={18} />
                                <span>Request Booking</span>
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default BookingPage