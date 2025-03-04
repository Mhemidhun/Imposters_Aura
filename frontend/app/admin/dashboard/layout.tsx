

import Navbar from '@/ui/admin/navbar/Navbar'
import Sidebar from '@/ui/admin/sidebar/Sidebar'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='contaner bg-[#151c2c] box-border text-white flex p-[20px]'>
        <div className='menu flex-1 bg-[#182237]'>
            <Sidebar />
        </div>
        <div className='flex-grow-[4] flex-shrink basis-0'>
            <Navbar />
            {children}
        </div>  
    </div>
  )
}

export default Layout;