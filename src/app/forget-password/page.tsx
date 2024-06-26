"use client"
import { useAuth, useSignIn } from '@clerk/nextjs';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
 
const ForgotPasswordPage: NextPage = () => {

  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState(''); 
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();
 
  if (!isLoaded) {
    return null;
  }
 
  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push('/');
  }
 
  // Send the password reset code to the user's email
  async function create(e: any) {
    e.preventDefault();
    const email= e.target[0].value;
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then(_ => {
        setSuccessfulCreation(true);
        setError('');
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }
 
  // Reset the user's password. 
  // Upon successful reset, the user will be 
  // signed in and redirected to the home page
  async function reset(e: any) {
    e.preventDefault();
    const email= e.target[0].value;
    const code= e.target[1].value;
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then(result => {
        // Check if 2FA is required
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
          setError('');
        } else if (result.status === 'complete') {
          // Set the active session to 
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setError('');
        } else {
          console.log(result);
        }
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage);
      });
  }
 
  return (

    
    <div
      style={{
        margin: 'auto',
        maxWidth: '500px',
      }}
    >
      <h1>Forgot Password?</h1>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
        onSubmit={!successfulCreation ? create : reset}
      >
        {!successfulCreation && (
          <>
            <label htmlFor='email'>Please provide your e-mail address</label>
            <input
              type='email'
              placeholder='e.g john@doe.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{color: 'black'}}
            />
 
            <button>Send password reset code</button>
            {error && <p>{error}</p>}
          </>
        )}
 
        {successfulCreation && (
          <>
            <label htmlFor='password'>Enter your new password</label>
            <input
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{color: 'black'}}
            />
 
            <label htmlFor='password'>Enter the password reset code that was sent to your email</label>
            <input
              type='number'
              value={code}
              onChange={e => setCode(e.target.value)}
              style={{color: 'black'}}
            />
 
            <button>Reset</button>
            {error && <p>{error}</p>}
            
          </>
        )}
 
        {secondFactor && <p>2FA is required, but this UI does not handle that</p>}
      </form>
    </div>
  );
};
 
export default ForgotPasswordPage;