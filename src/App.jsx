import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTickets(data)
      })
      .catch((error) => console.error('Error loading JSON data:', error));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
          <div className='bg-gradient-to-br from-purple-700 to-purple-500 text-white p-16 rounded'>
            <h3>In Progess</h3>
            <p>0</p>
          </div>
          <div className='bg-gradient-to-r from-green-700 to-green-500 text-white p-16 rounded'>
            <h3>Resolved</h3>
            <p>0</p>
          </div>
        </div>
        <div className='flex my-8 gap-8 py-8'>
          <div className='w-2/3'>
            <h2 className='text-xl font-semibold mb-4'>Customer Tickets</h2>
            {tickets && tickets.length > 0 ?
              <div className='grid grid-cols-2 gap-4'>
                {tickets.map(t => (
                  <div key={t.id} class=" rounded-lg border border-gray-200 shadow-lg p-4 bg-white">
                    <div class="flex justify-between items-center">
                      <h2 class="text-lg font-medium text-gray-900">{t.title}</h2>
                      <span class="text-green-500 text-sm">{t.status}</span>
                    </div>
                    <p class="text-gray-600 mt-2 line-clamp-2 text-sm">{t.description}</p>
                    <div class="mt-4 flex justify-between items-center">
                      <div>
                        <span class=" font-sm">{t.id}</span>
                        <span className={`${t.priority && t.priority==="High" ? "text-red-600" : t.priority==="Low" ? "text-green-600":"text-yellow-600"} font-bold mx-4`}>{t.priority} PRIORITY</span>
                      </div>

                      <div class="flex items-center space-x-2">
                        <span class="text-gray-500">{t.customer}</span>
                        <span class="text-gray-400 text-sm">{formatDate(t.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                ))}
              </div>
              : null}
          </div>
          <div className='w-1/3'>
            <h2 className='text-xl font-semibold'>Task Status</h2>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
