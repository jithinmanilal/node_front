import React from 'react'
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Layout title='NextNode | Landing Page' content='Landing page'>
      <section id="about" className="relative pt-28 about-area">
        <div className="container raleway">
          <div className="row">
            <div className="w-full lg:w-1/2 text-[#4d2c4d] lg:order-last mx-auto">
              <img className='rounded-full' src='next_node.png' alt='logo'/>
              <p className='mt-5'>Welcome to

                NextNode
                <br/>
                <br/>
                The networking site for 
                professionals.
                <br/>
                <br/>
                Join Us to network 
                with the mentors from your 
                industry, connect with them
                to further your career.
                <br/>
                <br/>
                Join Now!!
              </p>
              <Link to={'/register'}> <p className='text-lg text-black hover:text-[#92628e]'>Register</p> </Link>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default HomePage