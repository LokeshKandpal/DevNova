// import React from 'react';
// import './header.css';
// import { useNavigate } from 'react-router-dom';

// const Header = () => {
//   const navigate = useNavigate();

//   return (
//     <header className="header">
//       <div className="logo" onClick={() => navigate('/')}>Uncodemy</div>
//       <nav className="nav">
//         <ul>
//           <li><a onClick={() => navigate('/')}>Home</a></li>
//           <li className="dropdown">
//             <a className="dropdown-toggle">Registration</a>
//             <ul className="dropdown-menu">
//               <li><a onClick={() => navigate('/registration')}>Student Registration</a></li>
//               <li><a onClick={() => navigate('/trainer-register')}>Trainer Registration</a></li>
//             </ul>
//           </li>
//           <li><a onClick={() => navigate('/dashboard')}>Dashboard</a></li>
//           <li><a onClick={() => navigate('/login')}>Login</a></li>
//           <li><a onClick={() => navigate('/batch-creation')}>Batch Creation</a></li>
//           <li><a onClick={() => navigate('/batchlist')}>Batch List</a></li>
//           <li><a onClick={() => navigate('/studentlist')}>Student List</a></li>
//           <li><a onClick={() => navigate('/trainerlist')}>Trainer List</a></li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;




import React from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>DevNova</div>
      <nav className="nav">
        <ul>
          <li><a onClick={() => navigate('/')}>Home</a></li>
          <li className="dropdown">
            <a className="dropdown-toggle">Registration</a>
            <ul className="dropdown-menu">
              <li><a onClick={() => navigate('/registration')}>Student Registration</a></li>
              <li><a onClick={() => navigate('/trainer-register')}>Trainer Registration</a></li>
            </ul>
          </li>
          <li className="dropdown">
            <a className="dropdown-toggle">List</a>
            <ul className="dropdown-menu">
              <li><a onClick={() => navigate('/studentlist')}>Student List</a></li>
              <li><a onClick={() => navigate('/batchlist')}>Batch List</a></li>
              <li><a onClick={() => navigate('/trainerlist')}>Trainer List</a></li>
            </ul>
          </li>
          <li><a onClick={() => navigate('/dashboard')}>Dashboard</a></li>
          <li><a onClick={() => navigate('/login')}>Login</a></li>
          <li><a onClick={() => navigate('/trainer-dashboard')}>Trainer Dashboard</a></li>
          <li><a onClick={() => navigate('/batch-creation')}>Batch Creation</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;