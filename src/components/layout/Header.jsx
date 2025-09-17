import React from 'react'

const Header = () => {
    return (
        <header className="flex w-full items-center bg-white border-b-2 border-gray-300 h-14 px-3 font-serif">
            
            <div className="flex items-center justify-between w-full gap-2">
                <h2 className='font-bold text-gray-800 text-xl'>Grocery Online</h2>
                <img src={"https://ionicframework.com/docs/img/demos/avatar.svg"} alt="logo" className="h-8 w-8 rounded-full object-cover object-center" />
            </div>
        </header>
    )
}

export default Header