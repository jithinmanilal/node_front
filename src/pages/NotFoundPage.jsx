import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
        <div className='ms-12 mt-6 public text-black hover:text-[#4b2848]'>
            <Link to="/">&#x2190;Go Home</Link>
        </div>
        <div className="rajdhani text-3xl font-bold text-center mt-10 text-[#4b2848] ">You seem lost.</div>
        <div className="mt-12 raleway text-lg text-[#4b2848] text-center font-semibold ms-12">The page you are trying to rech does not exist.</div>
        
        <div className="text-[#4b2848]  text-9xl font-extrabold text-center">404</div>
        <div className="container">
            <div className="text-[#4b2848]  text-2xl">
            </div>
        </div>
    </div>
  )
}

export default NotFoundPage