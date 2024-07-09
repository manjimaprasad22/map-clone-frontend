import React from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup"; 
import { yupResolver } from "@hookform/resolvers/yup";
import { useGoogleLogin } from '@react-oauth/google';
import TextField from '@mui/material/TextField';
import '../assest/style.css'
import '../assest/resposive.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const { REACT_APP_API } = process.env;
const Login = () => {
  const navigate = useNavigate()
 localStorage.clear()
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
      });
    

        const emailregex = `[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}`

        const schema = yup.object().shape({
      
          email: yup.string().required("Email is required").matches(emailregex,"Email is Invalid"),
          password: yup.string().required("Password is required"),
      
      
        })
        const { register, handleSubmit, getValues, formState: { errors } } = useForm({
          resolver: yupResolver(schema),
          defaultValues: {
         
            email: "",
            password: "",
         
          },
        })
        const HandleLogin=async()=>{
            await axios({
                url: REACT_APP_API + "/users/login",
                method: 'POST',
                data: {
                  email: getValues().email,
                  password: getValues().password
                },
              }
              ).then((res)=>{
                console.log(
                    res.data
                );
                if(res.data.isverified){
                  toast(res.data.message)
                  localStorage.setItem('accessToken', res.data.accessToken); 
                  localStorage.setItem('id', res.data.id); 
                  navigate('/map')
                }
                else{
                  navigate('/verifyotp')
                }
              
              }).catch((err)=>{
                console.log(err);
              })
        }
  return (
    <div className='col-12'>
      <div className="col-12 d-bloch d-lg-flex social">
        <button className='btn btn-primary  col-12' onClick={login}><i class="fa-brands fa-google"></i></button>
      </div>
      <div className="col-12 d-flex">
        <div className="col-4 "><hr/></div>
        <div className="col-4 text-center">or sign in using</div>
        <div className="col-4" ><hr/></div>
      </div>
      <form onSubmit={handleSubmit(HandleLogin)}>

      <div className="col-12">
      <div className="form-group d-block">
                <TextField id="standard-basic"  variant="standard" label='Email' className='col-12 '{...register("email")}  />
                <span className="error">{errors.email?.message}</span>
            </div>
      <div className="form-group d-block">
                <TextField id="standard-basic" type='password' variant="standard" label='Password' className='col-12 ' {...register("password")} />
                <span className="error">{errors.password?.message}</span>
            </div>
            <button className='login-button col-12 btn' type='submit'>LOG IN</button>
            <div className="col-12 pt-3" style={{textAlign:"right"}}>

            <Link to={'/register'}>Create Account</Link>
            </div>
      </div>
      </form>
    </div>
  )
}

export default Login
