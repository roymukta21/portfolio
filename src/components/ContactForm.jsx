import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { EMAILJS_CONFIG } from '../config/emailjs';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

const ContactForm = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG;

  const isConfigured = SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConfigured) {
      setStatus({
        type: 'error',
        message: 'Email service not configured.',
      });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      if (result.status === 200) {
        setStatus({
          type: 'success',
          message: '✅ Message sent successfully! I will contact you soon.',
        });
        formRef.current.reset();
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        type: 'error',
        message:
          '❌ Message sending failed. Please email me directly at muktaroy520@gmail.com',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <Input
          name="from_name"
          placeholder="Your Name"
          required
        />

        <Input
          type="email"
          name="reply_to"
          placeholder="Your Email"
          required
        />

        <Input
          name="subject"
          placeholder="Subject"
        />

        <Textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
        />

        <AnimatePresence>
          {status.message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`p-3 rounded text-sm ${
                status.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {status.message}
            </motion.div>
          )}
        </AnimatePresence>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
