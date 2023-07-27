import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { resetRegistered, login } from '../features/user';


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const { loading, registered } = useSelector(state => state.user)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value });
  }
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      const response = await dispatch(login({ email, password }));  
      if (response.payload && response.payload.detail) {
        setErrors(response.payload);
        console.log('Login failed:', response.payload);
      } else {
        console.log('Login successful. Navigating to home.');
        navigate('/home');
      }
    } catch (error) {
      console.log('Error caught:', error);
    }
  };  
  
  useEffect(()=> {
    if (registered) dispatch(resetRegistered());
  }, [registered, dispatch]);

  return (
    <Layout title='NextNode | Login' content='Login page'>
      <div className="flex min-h-full flex-col justify-center mt-10 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto rounded-full" src="NextNode.png" alt="Your Company"/>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#4d2c4d]">Sign in to your account</h2>
        </div>
        {errors && (
          <div className="text-red-600 text-center public mt-4 text-sm">
            {errors.detail}
          </div>
        )}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 public"  onSubmit={onSubmit} >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" name="email" onChange={onChange} value={email} type="email" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6"/>
              </div>          
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <Link href="#" className="font-semibold text-[#4d2c4d] hover:text-[#92638f]">Forgot password?</Link>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" name="password" onChange={onChange} value={password} type="password" required className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#92638f] sm:text-sm sm:leading-6"/>
              </div>
            </div>
            { loading ? (
              <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span>
              </div>
            ): (
              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-[#4d2c4d] hover:bg-[#92638f] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d2c4d]">Sign in</button>
              </div>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link to={'/register'} className="font-semibold leading-6 text-[#4d2c4d] hover:text-[#92638f]">Register</Link>
          </p>
          <p className="mt-10 text-center text-sm text-gray-500">
            Admin?
            <Link to={'/admin-login'} className="font-semibold leading-6 text-[#4d2c4d] hover:text-[#92638f]">Admin Login</Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default LoginPage