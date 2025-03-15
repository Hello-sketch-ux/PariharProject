import { useState } from 'react';
import { X as CloseIcon } from 'lucide-react';
import { ChatMessage } from '../ChatMessage';
import { ChatInput } from '../ChatInput';
import { QuickQuestions } from '../QuickQuestions';
import { Message } from './types';  

type ChatbotProps = {
    isOpen: boolean;
    onClose: () => void;
    isLoggedIn?: boolean; // Define the type (optional)
  };

  function Chatbot({ isOpen, onClose}: ChatbotProps){
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you with Parihar India\'s products and services?',
      role: 'assistant',
      createdAt: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await new Promise<string>((resolve) => {
        setTimeout(() => {
            const qa: Record<string, string> = {
                material: 'Our toilet seat covers are made from non-porous, oxo-biodegradable, and 100% recyclable materials, ensuring hygiene and sustainability.',
                made: 'Our toilet seat covers are made from non-porous, oxo-biodegradable, and 100% recyclable materials, ensuring hygiene and sustainability.',
                use: 'Simply place the cover on the toilet seat, use it, and dispose of it in a dry waste bin after use. It provides a protective barrier against germs.',
                environment: 'Yes! Our products are oxo-biodegradable and 100% recyclable, reducing environmental impact while promoting public hygiene.',
                buy: 'You can purchase our products from our e-commerce website, as well as at select pharmacies, supermarkets, and online marketplaces.',
                order: 'You can purchase our products from our e-commerce website, as well as at select pharmacies, supermarkets, and online marketplaces. Which will be available very soon for now contact- +91 70119 89792',
                safe: 'Absolutely! Our products are safe for everyone, including children and pregnant women, ensuring hygiene protection in public restrooms.',
                locator: 'Our app helps you find clean, Parihar-certified restrooms near you using real-time location tracking and user reviews.',
                free: 'Basic access is free, but a premium subscription offers exclusive features like detailed hygiene ratings, directions, and priority restroom access.',
                listing: 'Businesses can subscribe to our premium listing service to appear on the app, increasing visibility and attracting more customers.',
                certification: 'Our certification ensures that restrooms meet high cleanliness and sanitation standards, providing users with a reliable, hygienic experience.',
                partner: 'You can collaborate with us by subscribing to our hygiene certification, premium restroom listings, or stocking our products at your stores.',
                benefits: 'Certified businesses gain customer trust, increased footfall, and improved brand reputation for prioritizing hygiene and sanitation.',
                dispose: 'Dispose of them in a dry waste bin; they are recyclable and designed to minimize environmental waste.',
                waste: 'No. Our covers are oxo-biodegradable and fully recyclable, ensuring minimal environmental impact while promoting public hygiene.',
                bulk: 'Yes, we provide bulk orders for businesses, offices, and institutions at special pricing. Contact our sales team for details.',
                contact: 'You can reach us via email, phone, or our chatbot for assistance with orders, partnerships, or product inquiries.',
                default: 'I apologize, but I don\'t have specific information about that. Please contact our customer support for more details.',
              };
              
              const query = content.toLowerCase();
              let answer = qa.default;
              
              for (const key in qa) {
                if (query.includes(key)) {
                  answer = qa[key as keyof typeof qa]; // ✅ TypeScript now knows 'key' belongs to 'qa'
                  break;
                }
              }
              

          resolve(answer);
        }, 1000);
      });

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response,
        role: 'assistant',
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-22 right-4 sm:w-[24vw] w-[80vw] h-[78vh] bg-white shadow-lg rounded-xl flex flex-col border border-gray-300 z-50">
      <div className="flex items-center justify-between bg-green-500 p-3 rounded-t-lg">
        <h3 className="text-white font-semibold">Parihar India Support</h3>
        <button onClick={onClose} className="text-white">
          <CloseIcon size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3" style={{ maxHeight: '400px' }}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <div className="p-3 border-t">
        <QuickQuestions onSelect={handleSendMessage} />
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

export default Chatbot;
