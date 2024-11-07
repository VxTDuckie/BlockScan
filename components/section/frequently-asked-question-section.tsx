"use client" // Ensures that this code is executed on the client side.
import { useState } from 'react' // Importing the useState hook from React.
import { ChevronDown, ChevronUp } from 'lucide-react' // Importing icons for the expand and collapse functionality.

// Defining the type for FAQ items, consisting of a question and an answer.
type FAQItem = {
  question: string
  answer: string
}

// Array of FAQ data to be rendered, containing questions and answers.
const faqData: FAQItem[] = [
  {
    question: "What is BlockScan?",
    answer: "BlockScan is a blockchain explorer that allows you to view and analyze transactions, addresses, and other data on various blockchain networks."
  },
  {
    question: "How do I search for a transaction?",
    answer: "To search for a transaction, enter the transaction hash in the search bar at the top of the page and press enter. You can also navigate to the 'Transactions' page to view recent transactions."
  },
  {
    question: "Can I track multiple addresses?",
    answer: "Yes, you can track multiple addresses by creating an account and adding them to your watchlist. This allows you to monitor activity across several addresses easily."
  },
  {
    question: "What blockchains does BlockScan support?",
    answer: "BlockScan currently supports major blockchains including Ethereum, Bitcoin, and Binance Smart Chain. We're constantly working on adding support for more networks."
  }
]

// Main FAQ component function.
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null) // State to manage the index of the open question.

  // Function to toggle the visibility of the answer for a question.
  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index) // If the question is already open, close it; otherwise, open it.
  }

  return (
    <main className='bg-gradient-to-tr from-primary-red/10 via-white to-pink-600/10 p-16'>
    <div className="max-w-screen-2xl mx-auto py-12 rounded-xl text-gray-800 min-h-fit flex items-center justify-center ">
      <div className="w-full relative">
        {/* Heading for the FAQ section */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl font-bold mb-16 text-center" style={{filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'}}>
          Frequently Asked Questions
        </h2>
        {/* Mapping through the FAQ data and rendering each question/answer */}
        <div className="space-y-10">
          {faqData.map((item, index) => (
            <div key={index} className="rounded-xl bg-[rgba(255,255,255, 0.05)]">
              <button
                className="rounded-xl flex justify-between items-center w-full text-left p-6 focus:outline-none hover:bg-white hover:shadow-weak-ass-glow hover:text-primary-red transition-all duration-200"
                onClick={() => toggleQuestion(index)} // Toggle the corresponding question on click.
                aria-expanded={openIndex === index} // Accessibility feature indicating if the question is expanded.
              >
                {/* Display the question text */}
                <span className="text-[18px] sm:text-[22px] lg:text-[24px] xl:text-[26px] font-semibold pr-4">{item.question}</span>
                {/* Toggle the chevron icon based on whether the question is open */}
                {openIndex === index ? (
                  <ChevronUp className="flex-shrink-0 h-8 w-8 text-gray-800" />
                ) : (
                  <ChevronDown className="flex-shrink-0 h-8 w-8 text-gray-800" />
                )}
              </button>
              {/* Display the answer if the question is open */}
              {openIndex === index && (
                <div className="p-6 text-[20px] text-gray-800/90 bg-transparent rounded-b-xl">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </main>
  )
}
