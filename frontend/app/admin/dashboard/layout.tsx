

import Navbar from '@/components/admin/navbar/Navbar'
import Sidebar from "@/components/admin/sidebar/Sidebar"
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='bg-[#151c2c] box-border h-screen text-white flex p-[20px]'>
        <div className='flex-1 bg-[#182237]'>
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