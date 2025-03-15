

interface QuickQuestionsProps {
  onSelect: (question: string) => void;
}

export function QuickQuestions({ onSelect }: QuickQuestionsProps) {
  const questions = [
    { id: 'material', text: 'What material is used in products?' },
    { id: 'use', text: 'How do I use the product?' },
    { id: 'environment', text: 'Are products environment friendly' },
    { id: 'locator', text: 'How does restroom locator work?' },
    { id: 'buy', text: 'How can i order it?' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {questions.map((q) => (
        <button
          key={q.id}
          onClick={() => onSelect(q.text)}
          className="px-3 py-1.5 text-sm bg-blue-50 text-green-600 rounded-full hover:bg-green-100 transition-colors"
        >
          {q.text}
        </button>
      ))}
    </div>
  );
}