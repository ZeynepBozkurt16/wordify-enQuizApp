import { SignedIn, SignedOut, UserButton, useClerk } from "@clerk/clerk-react";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Start.css';

const Start = () => {
  let navigate = useNavigate();

  function switchScreen() {
    // Navigate to the "/main" route
    navigate('/sets');
  }

  
  function SignUpButton() {
    const clerk = useClerk();
  
    return (
      <button className="sign-up-btn" onClick={() => clerk.openSignUp({})}>
        Sign up
      </button>
    );
  }
  
  function SignInButton() {
    const clerk = useClerk();
  
    return (
      <button className="sign-in-btn" onClick={() => clerk.openSignIn({})}>
        Sign in
      </button>
    );
  }
  
  
  
  
  
  
  
  return(


      <>
      
      
      <header>
      <nav>
        <SignedOut>
          <ul>
            <li>
              <SignUpButton />
            </li>

            <li>
              <SignInButton />
            </li>
          </ul>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
   








    <div className='background-start'>
      <button onClick={switchScreen} className='startButton'>Start</button>
    </div>
       </>
  )
  
};

export default Start;