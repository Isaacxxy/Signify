import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-[100vh] p-4 bg-black gap-4'>
      <div className='flex flex-col items-center justify-center bg-primary-foreground w-fit mx-auto rounded-xl p-4 gap-4'>
        <img src="./logo.svg" alt="" className="w-[56px]" />
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold text-center'>Contact Us</h1>
          <p className='text-center'>If you have any questions or feedback, feel free to reach out!</p>
          <form className='flex flex-col gap-4 mt-4'>
            <input type="text" placeholder="Your Name" className='border p-2 rounded' />
            <input type="email" placeholder="Your Email" className='border p-2 rounded' />
            <textarea placeholder="Your Message" className='border p-2 rounded h-32'></textarea>
            <button type="submit" className='bg-indigo-500 text-white p-2 rounded'>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page