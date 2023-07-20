import React from 'react'

type Props = {}

const CreateRoom = (props: Props) => {
  return (
    <div className='min-h-screen'>
      <div className ="grid grid-cols-2 gap-4 justify-evenly h-screen">
      <div className="container bg-primary mx-auto p-4">
        <h1 className=" text text-secondary text-center text-4xl font-bold py-4">Game Settings</h1>
        <div className="container mx-auto p-4">
        <h1 className="text-2xl text-center  mb-4">Choose Difficulty and Duration</h1>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <form>
                
                <div className="mb-4">
                    <label htmlFor="difficulty" className="block text-gray-700 font-bold mb-2">Difficulty Level:</label>
                    <select id="difficulty" name="difficulty" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                
                <div className="mb-4">
                    <label htmlFor="duration" className="block text-gray-700 font-bold mb-2">Duration:</label>
                    <select id="duration" name="duration" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
                        <option value="1">1 Minute</option>
                        <option value="3">3 Minutes</option>
                        <option value="5">5 Minutes</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>

                
                <div id="customDuration" className="mb-4 hidden">
                    <label htmlFor="custom" className="block text-gray-700 font-bold mb-2">Custom Duration (in minutes):</label>
                    <input type="number" id="custom" name="custom" min="1" step="1" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"/>
                </div>

                
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Start Test</button>
            </form>
        </div>
    </div>
      </div>
      <div className="container bg-primary2 mx-auto p-4">
        <h1 className=" text text-secondary text-center text-4xl font-bold py-4">Typing Test Instructions</h1>
        <ul className="list-disc list-inside py-2">
            <li className="mb-2">Choose the difficulty level from the options provided.</li>
            <li className="mb-2">Select the desired duration for the typing test.</li>
            <li className="mb-2">Type the displayed content as accurately and quickly as possible.</li>
            <li className="mb-2">Focus on both speed and accuracy while typing.</li>
            <li className="mb-2">Review your results at the end of the test.</li>
            <li className="mb-2">You can play the test again or try different difficulty levels and durations.</li>
            
        </ul>
      </div>
      </div>


    </div>
  )
}

export default CreateRoom;