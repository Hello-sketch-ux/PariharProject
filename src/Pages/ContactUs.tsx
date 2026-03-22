import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const ContactUs: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-600">
          CONTACT US
        </h1>
        <div className="w-20 sm:w-24 h-1 bg-green-500 mx-auto mt-2 mb-4 sm:mb-6"></div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Better yet, see us in person!
        </h2>
        <p className="mt-3 text-base sm:text-lg text-gray-600">
          We love our customers, so feel free to visit us anytime.
        </p>
        <p className="text-base sm:text-lg text-gray-600">
          We are available 24/7.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-12 sm:mb-16">
        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-6">
              Get In Touch
            </h3>

            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email ID</p>
                  <p className="text-sm text-gray-500 break-all">
                    helpdesk@pariharindia.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Phone Number
                  </p>
                  <p className="text-sm text-gray-500">7011989792</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Address</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Parihar India <br />
                    New Delhi, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/917011989792"
                    className="inline-block mt-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition"
                  >
                    Message us on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5 sm:mb-6">
              Send us a Message
            </h3>

            <form className="space-y-4 sm:space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-green-500 focus:border-green-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-green-500 focus:border-green-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-green-500 focus:border-green-500"
              />

              <textarea
                rows={4}
                placeholder="How can we help you?"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-green-500 focus:border-green-500"
              />

              <button
                type="submit"
                className="w-full py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
            Our Location
          </h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448196.0539850426!2d76.76357332396312!3d28.643795032051744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1654321234567!5m2!1sen!2sin"
            className="w-full h-64 sm:h-[450px] rounded-md border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Parihar India Location"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
