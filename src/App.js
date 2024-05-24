import { ClerkProvider } from '@clerk/clerk-react';
import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Final from './Final.jsx';
import MainComponent from './MainComponent.jsx';
import QuestionSets from './QuestionSets.jsx';
import SignInComponent from './SignInComponent.jsx';
import SignUpComponent from './SignUpComponent.jsx';
import Start from './Start.jsx';
import Test from './Test.jsx';
import Testresult from './Testresult.jsx';

const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <div className="container">
        <HashRouter>
          <Routes>
          <Route path="/signin" element={<SignInComponent />} />
          <Route path="/signup" element={<SignUpComponent />} />
            <Route path="/" element={<Start />} />
            <Route path="/main" element={<MainComponent />} />
            <Route path="/final" element={<Final />} />
            <Route path="/sets" element={<QuestionSets />} />
            <Route path='/test' element={<Test />} />
            <Route path='/testresult' element={<Testresult />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HashRouter>
      </div>
    </ClerkProvider>
  );
}

export default App;
