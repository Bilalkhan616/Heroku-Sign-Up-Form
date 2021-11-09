// Note: Main App / SignUpScreen component...!

import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route

} from "react-router-dom"
import SignUp from './components/sign-up';
import CurrentUsers from './components/current-users';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/current-users" element={<CurrentUsers />} />
        {/* <Route path="*" element={< />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;