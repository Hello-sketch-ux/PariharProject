
import { MessageSquare, Bot } from 'lucide-react';
import { Message } from '../Components/Home/types';
import { twMerge } from 'tailwind-merge';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={twMerge(
        'flex gap-3 p-4 rounded-lg',
        isUser ? 'bg-green-50' : 'bg-gray-50'
      )}
    >
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-800">{message.content}</p>
      </div>
    </div>
  );
}