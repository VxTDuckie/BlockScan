import React from 'react'
interface NoContractFoundProps {
    error: string | null;
  }
const NoContractFound: React.FC<NoContractFoundProps> = ({error}) => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-4 py-8">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-red-100 p-3">
                <svg
                  className="h-8 w-8 text-primary-red"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">Project Not Found</h1>
            <p className="mb-8 text-lg text-gray-600">
              The project <span className="font-mono text-sm bg-gray-100 p-1 rounded">{error}</span> does not exist.
              Please check the ID and try again.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 bg-primary-red text-white rounded-xl hover:bg-hard-red focus:outline-none  focus:ring-offset-2 duration-200"
              >
                Return Home
              </button>
              <button
                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSd4P-PJ7yR1Eol75cZW3-9d8JtTOwqQv6hDm6cmoNg90LUHrA/viewform?usp=sf_link', '_blank')}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-300 duration-200"
              >
                Report Issue
              </button>
            </div>
          </div>
        </div>
  )
}

export default NoContractFound