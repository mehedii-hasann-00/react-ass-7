import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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

  const notify = (msg) => {
    toast.success(msg);
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
    notify("Task Added to Progess ...")
  }

  const handle_resolve = (task) => {
    setTickets(tickets.filter(t => t.id !== task.id));
    setTaskInProgess(taskInProgess.filter(t => t.id !== task.id));
    setTaskResolved(prev => [...prev, { title: task.title }]);
    notify("Task Resolved Successfully");
  }

  return (
    <>
      <ToastContainer />
      <div className="">
        <div className="flex flex-col lg:flex-row justify-between items-center px-8 mx-8 py-4 text-black">
          <h3 className="font-semibold">CS - Ticket System</h3>
          <div className="flex flex-col lg:flex-row gap-4 text-sm my-8 lg:my-4">
            <div className='lg:flex hidden lg:flex-row gap-4 py-2'>
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
        <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-8 gap-4 text-center'>
          <div className='relative bg-gradient-to-br from-purple-700 to-purple-500 text-white p-16 rounded'>
            <img src="./vector1.png" alt="" className='absolute top-0 left-0' />
            <img src="./vector1.png" alt="" className='absolute rotate-y-180 top-0 right-0' />
            <h3 className='text-lg font-semibold'>In Progess</h3>
            <p className='my-4 text-6xl font-bold'>{taskInProgess.length}</p>
          </div>
          <div className='relative bg-gradient-to-r from-green-700 to-green-500 text-white p-16 rounded'>
            <img src="./vector1.png" alt="" className='absolute top-0 left-0' />
            <img src="./vector1.png" alt="" className='absolute rotate-y-180 top-0 right-0' />
            <h3 className='text-lg font-semibold'>Resolved</h3>
            <p className='my-4 text-6xl font-bold'>{taskResolved.length}</p>
          </div>
        </div>
        <div className='lg:flex my-8 gap-8 py-8'>
          <div className='w-full lg:w-2/3'>
            <h2 className='text-xl font-semibold mb-4'>Customer Tickets</h2>
            {tickets && tickets.length > 0 ?
              <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
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
          <div className='w-full lg:w-1/3 mt-4 lg:mt-0'>
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

      <div className='bg-black'>
        <div className='lg:flex p-8 justify-between '>
          <div className='max-w-md'>
            <h2 className='text-white'>CS -- Ticket System</h2>
            <p className='py-2 text-sm font-light text-gray-500'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </div>
          <div>
            <h3 className='text-white'>Company</h3>
            <div className='py-2 text-sm font-light text-gray-500'>
              <p>About Us</p>
              <p>Our Mission</p>
              <p>Contact Sale</p>
            </div>

          </div>
          <div>
            <h3 className='text-white'>Services</h3>
            <div className='py-2 text-sm font-light text-gray-500'>
              <p>Products & Services</p>
              <p>Customer Stories</p>
              <p>Download Apps</p>
            </div>

          </div>
          <div>
            <h3 className='text-white'>Information</h3>
            <div className='py-2 text-sm font-light text-gray-500'>
              <p>Privacy Policy</p>
              <p>Terms & Conditions</p>
              <p>Join Us</p>
            </div>

          </div>
          <div>
            <h3 className='text-white'>Social Links</h3>
            <div className='py-2 text-sm font-light text-gray-500'>
              <p><span>@CS — Ticket System</span></p>
              <p>@CS — Ticket System</p>
              <p>@CS — Ticket System</p>
              <p>@CS — Ticket System</p>
            </div>

          </div>
        </div>
        <div className='border-t border-gray-700 mx-8 py-8 text-center'>
          <p className='text-white'>© 2025 CS — Ticket System. All rights reserved.</p>
        </div>
      </div>

    </>
  )
}

export default App
