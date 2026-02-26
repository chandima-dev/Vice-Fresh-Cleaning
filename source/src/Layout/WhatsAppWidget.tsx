import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const handleSend = () => {
    const phoneNumber = '94705901816' // Updated WhatsApp number
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
    setIsOpen(false)
    setMessage('')
  }
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 20,
              originX: 1,
              originY: 1,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 20,
            }}
            transition={{
              duration: 0.2,
            }}
            className="mb-4 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="bg-blue-500 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 fill-current" />
                <span className="font-semibold">Chat with us</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 bg-slate-50">
              <p className="text-sm text-slate-600 mb-3">
                Hi there! 👋
                <br />
                Type a message below to start a chat on WhatsApp.
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-sm min-h-[100px]"
              />
            </div>

            {/* Footer */}
            <div className="p-3 bg-white border-t border-slate-100">
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Start Chat</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center relative group"
      >
        <MessageCircle className="w-8 h-8 fill-current" />

        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping -z-10"></span>
      </motion.button>
    </div>
  )
}
