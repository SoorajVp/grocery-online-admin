import React from 'react'

const Pagination = () => {
    return (
        <div className="bg-white p-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                    <span className="font-medium">20</span> results
                </div>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 bg-gray-100 rounded-md text-sm font-medium text-gray-700">
                        1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        2
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Pagination