import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="">
        <div class="flex flex-col lg:flex-row justify-between items-center px-8 mx-8 py-6 text-black">
          <h3 class="font-semibold">CS - Ticket System</h3>
          <div class="flex flex-col lg:flex-row gap-4 text-sm my-8 lg:my-4">
            <div className='flex flex-col lg:flex-row gap-4 py-2'>
              <p>Home</p>
              <p>FAQ</p>
              <p>ChangeLog</p>
              <p>Blog</p>
              <p>Download</p>
              <p>Contact</p>
            </div>
            <button class="bg-gradient-to-r from-purple-700 to-purple-500 text-white px-4 py-2 rounded">+ New Ticket</button>
          </div>

        </div>
      </div>
      <div className='bg-gray-100 p-8'>
        <div className='grid grid-cols-2 gap-8 text-center'>
          <div className='bg-gradient-to-r from-purple-700 to-purple-500 text-white p-8 rounded '>
            <h3>In Progess</h3>
            <p>0</p>
          </div>
          <div className='bg-gradient-to-r from-green-700 to-green-500 text-white p-8 rounded'>
            <h3>Resolved</h3>
            <p>0</p>
          </div>
        </div>
        <div></div>
      </div>
      
    </>
  )
}

export default App
