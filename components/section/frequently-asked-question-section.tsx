"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

type FAQItem = {
  question: string
  answer: string
}

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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className=" text-white h-[800px] flex items-center justify-center mb-20">
      <div className="max-w-7xl w-full  px-4 sm:px-6 lg:px-8">
        <h2 className="text-6xl font-bold mb-16 text-center" style={{filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'}}>Frequently Asked Questions</h2>
        <div className="space-y-10">
          {faqData.map((item, index) => (
            <div key={index} className="rounded-xl overflow-hidden">
              <button
                className="flex justify-between items-center w-full text-left p-6 focus:outline-none hover:bg-white hover:text-primary-red transition-colors"
                onClick={() => toggleQuestion(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-2xl font-semibold pr-4">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="flex-shrink-0 h-8 w-8 text-primary-red" />
                ) : (
                  <ChevronDown className="flex-shrink-0 h-8 w-8 text-primary-red" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-6 text-lg text-subtitle__grey bg-black">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}