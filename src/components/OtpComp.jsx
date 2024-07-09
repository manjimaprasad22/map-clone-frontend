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
const OtpComp = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email;
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
      });
    

       

        const schema = yup.object().shape({
    
          otp: yup.string().required("OTP is required"),
      
      
        })
        const { register, handleSubmit, getValues, formState: { errors } } = useForm({
          resolver: yupResolver(schema),
          defaultValues: {
         
          
            otp: "",
         
          },
        })
        const HandleLogin=async()=>{
            await axios({
                url: REACT_APP_API + "/users/verifyotp",
                method: 'POST',
                data: {
                  email: email,
                  otp: getValues().otp
                },
              }
              ).then((res)=>{
                console.log(
                    res.data
                );
                navigate('/',{state:{email:res?.data?.email}})
              
              }).catch((err)=>{
                console.log(err);
              })
        }
        const handleresend=async()=>{
            await axios({
                url: REACT_APP_API + "/users/resendotp",
                method: 'POST',
                data: {
                  email: email,
                
                },
              }
              ).then((res)=>{
                console.log(
                    res.data
                );
                toast(res.data.message)
              
              }).catch((err)=>{
                console.log(err);
              })
        }
  return (
    <div className='col-12'>
    
      <div className="col-12 d-flex">
        <div className="col-4 "><hr/></div>
        <div className="col-4 text-center">Verify Otp</div>
        <div className="col-4" ><hr/></div>
      </div>
      <form onSubmit={handleSubmit(HandleLogin)}>

      <div className="col-12">
      <div className="form-group d-block">
                <TextField id="standard-basic"  variant="standard" label='OTP' className='col-12 '{...register("otp")}  />
                <span className="error">{errors.otp?.message}</span>
            </div>
    
            <button className='login-button col-12 btn' type='submit'>SUBMIT</button>
            <div className="col-12 pt-3" style={{textAlign:"right"}}>

           
            <Link onClick={handleresend}>Resend</Link>
            </div>
      </div>
      </form>
    </div>
  )
}

export default OtpComp
