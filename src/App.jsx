import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [taskInProgess, setTaskInProgess] = useState([]);
  const [taskResolved, setTaskResolved] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
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

  const handle_in_progess = (t) => {
    if (taskInProgess.length > 0) {
      let found = false;
      for (let i = 0; i < taskInProgess.length; i++) {

        if (t.id === taskInProgess[i].id) {
          found = true;
        }
      }
      if (!found) {
        setTaskInProgess(prev => [...prev, { id: t.id, title: t.title }])
      }
    }
    else {
      setTaskInProgess([{ id: t.id, title: t.title }])
    }
  }

  const handle_resolve = (task) => {
    setTickets(tickets.filter(t => t.id !== task.id));
    setTaskInProgess(taskInProgess.filter(t => t.id !== task.id));
    setTaskResolved(prev => [...prev, { title: task.title }])
  }

  console.log(taskInProgess);
  return (
    <>
      <div className="">
        <div className="flex flex-col lg:flex-row justify-between items-center px-8 mx-8 py-6 text-black">
          <h3 className="font-semibold">CS - Ticket System</h3>
          <div className="flex flex-col lg:flex-row gap-4 text-sm my-8 lg:my-4">
            <div className='flex flex-col lg:flex-row gap-4 py-2'>
              <p>Home</p>
              <p>FAQ</p>
              <p>ChangeLog</p>
              <p>Blog</p>
              <p>Download</p>
              <p>Contact</p>
            </div>
            <button className="bg-gradient-to-r from-purple-700 to-purple-500 text-white px-4 py-2 rounded">+ New Ticket</button>
          </div>

        </div>
      </div>
      <div className='bg-gray-100 p-8'>
        <div className='grid grid-cols-2 gap-8 text-center'>
          <div className='bg-gradient-to-br from-purple-700 to-purple-500 text-white p-16 rounded'>
            <h3 className='text-lg font-semibold'>In Progess</h3>
            <p className='my-4 text-6xl font-bold'>{taskInProgess.length}</p>
          </div>
          <div className='bg-gradient-to-r from-green-700 to-green-500 text-white p-16 rounded'>
            <h3 className='text-lg font-semibold'>Resolved</h3>
            <p className='my-4 text-6xl font-bold'>{taskResolved.length}</p>
          </div>
        </div>
        <div className='flex my-8 gap-8 py-8'>
          <div className='w-2/3'>
            <h2 className='text-xl font-semibold mb-4'>Customer Tickets</h2>
            {tickets && tickets.length > 0 ?
              <div className='grid grid-cols-2 gap-4'>
                {tickets.map(t => (
                  <div key={t.id} className=" rounded-lg border border-gray-200 shadow-lg p-4 bg-white cursor-pointer" onClick={() => handle_in_progess(t)}>
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium text-gray-900">{t.title}</h2>
                      {t.status && t.status === "Open" ?
                        <span className="text-green-500 text-sm p-2 bg-green-100 rounded-full flex items-center">
                          <span className="w-2.5 h-2.5 bg-green-600 rounded-full mr-2"></span>
                          {t.status}
                        </span>
                        :
                        <span className="text-yellow-500 text-sm p-2 bg-yellow-100 rounded-full flex items-center">
                          <span className="w-2.5 h-2.5 bg-yellow-600 rounded-full mr-2"></span>
                          {t.status}
                        </span>
                      }
                    </div>
                    <p className="text-gray-600 mt-2 line-clamp-2 text-sm">{t.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <span className="text-sm">{t.id}</span>
                        <span className={`${t.priority && t.priority === "High" ? "text-red-600" : t.priority === "Low" ? "text-green-600" : "text-yellow-600"} text-sm mx-4`}>{t.priority} PRIORITY</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 text-sm">{t.customer}</span>
                        <span className="text-gray-400 text-sm"><span><i className="fa fa-thin fa-calendar pr-2"></i></span>{formatDate(t.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                ))}
              </div>
              : null}
          </div>
          <div className='w-1/3'>
            <div>
              <h2 className='text-xl font-semibold'>Task Status</h2>
              {taskInProgess && taskInProgess.length > 0 ?
                taskInProgess.map(t => (
                  <div key={t.id} className='bg-white rounded my-4 p-4 shadow-lg'>
                    <p className='text-sm'>{t.title}</p>
                    <button className='w-full bg-green-600 py-1 rounded my-2' onClick={() => handle_resolve(t)}>complete</button>
                  </div>
                ))
                :
                <p className='text-sm font-light my-4'>Select a ticket to add to Task Status</p>
              }
            </div>
            <div>
              <h2 className='text-xl font-semibold'>Resolved Task</h2>
              {taskResolved && taskResolved.length > 0 ?
                taskResolved.map(t => (
                  <div key={t.id} className='bg-blue-100 rounded my-4 p-4 shadow-lg'>
                    <p className='text-sm'>{t.title}</p>
                  </div>
                ))
                :
                <p className='text-sm font-light my-4'>No resolved tasks yet.</p>
              }
              
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default App
