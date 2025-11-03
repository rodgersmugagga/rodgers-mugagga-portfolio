import { useState } from 'react';
import { contactAPI } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await contactAPI.send(formData);
      setStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to send message. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: 'fa-regular fa-envelope',
      label: 'Email',
      link: 'mailto:rodgersmugagga68@gmail.com',
    },
    {
      icon: 'fa-brands fa-whatsapp',
      label: 'WhatsApp',
      link: 'https://wa.me/256762557651',
    },
    {
      icon: 'fa-brands fa-linkedin',
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/mugaggarodgers/',
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen py-20 px-8 bg-bg-light dark:bg-bg-dark 
                 text-text-dark dark:text-text-light relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-gray-400 text-sm mb-2 tracking-wider uppercase">Get in Touch</p>
          <h2 className="text-5xl font-bold text-gradient inline-block">Contact Me</h2>
        </div>

        {/* Contact Methods */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : undefined}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 bg-card-light dark:bg-card-dark 
                       px-8 py-4 rounded-xl hover:-translate-y-2 hover:shadow-glow-accent
                       transition-all duration-300 group border border-transparent hover:border-accent/30
                       animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <i className={`${method.icon} text-accent text-2xl group-hover:scale-125 transition-transform`}></i>
              <span className="font-semibold group-hover:text-accent transition-colors">{method.label}</span>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-card-light dark:bg-card-dark rounded-2xl p-8 border border-gray-200 dark:border-gray-800/50
                        hover:border-accent/30 transition-all duration-300 animate-fade-in-up">
          <h3 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
            <i className="fa-solid fa-envelope text-accent"></i>
            Send Me a Message
          </h3>
          
          {status.message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                status.type === 'success'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'bg-red-500/20 text-red-400 border border-red-500/50'
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white dark:bg-bg-dark border border-gray-300 dark:border-gray-700 
                         rounded-lg focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white dark:bg-bg-dark border border-gray-300 dark:border-gray-700 
                         rounded-lg focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-bg-dark border border-gray-300 dark:border-gray-700 
                         rounded-lg focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 bg-white dark:bg-bg-dark border border-gray-300 dark:border-gray-700 rounded-lg
                        focus:outline-none focus:border-accent transition-colors resize-none"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-accent text-white rounded-xl font-medium
                       hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,191,255,0.5)]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;