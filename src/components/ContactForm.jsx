import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

const ContactForm = () => {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("");

    const formData = new FormData(event.target);

    try {
      const response = await fetch("https://formspree.io/f/xjgevzoj", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setResult("success");
        event.target.reset();
      } else {
        const data = await response.json();
        console.log("Error", data);
        setResult("error");
      }
    } catch (error) {
      console.log("Error", error);
      setResult("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (result === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full"
      >
        <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="size-20 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-6 mx-auto"
          >
            <span className="material-symbols-outlined text-5xl">check_circle</span>
          </motion.div>
          <h3 className="text-2xl font-bold text-text-main dark:text-white mb-4">
            Message Sent Successfully!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ✅ Your message has been sent to Mukta Roy's email successfully!
            <br />
            I'll get back to you soon.
          </p>
          <Button 
            onClick={() => setResult("")}
            className="mx-auto"
          >
            Send Another Message
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-text-main dark:text-white mb-6">
          Send Me a Message
        </h3>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name *
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Email *
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="john@example.com"
              required
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subject
            </label>
            <Input
              id="subject"
              type="text"
              name="subject"
              placeholder="Project Inquiry"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project..."
              rows="5"
              required
              className="w-full"
            />
          </div>

          <AnimatePresence>
            {result === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-lg text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
              >
                ❌ Failed to send message. Please email me directly at muktaroy520@gmail.com
              </motion.div>
            )}
          </AnimatePresence>

          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full text-base py-6"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="material-symbols-outlined"
                >
                  refresh
                </motion.span>
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Send Message
                <span className="material-symbols-outlined">send</span>
              </span>
            )}
          </Button>
        </form>
        
        {/* Alternative Contact */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Or email me directly at{' '}
            <a 
              href="mailto:muktaroy520@gmail.com" 
              className="text-yellow-500 hover:text-yellow-600 font-medium"
            >
              muktaroy520@gmail.com
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;
