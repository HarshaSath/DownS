import React, { useState } from "react";
import Link from "next/link";
import "./navbar.css";

interface LinkItem {
  href: string;
  name: string;
}

interface NavbarProps {
  logolink: string;
  links: LinkItem[];
}

export default function Navbar(props: NavbarProps) {
  const { links = [] } = props;
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar cus_navbar navbar-expand-lg shadow fixed-top">
        <div className="container">
          <div className="col-4">
            <a href={props.logolink}>
              <img src="/logo.png" className="img p-0 m-0 img-fluid" width={250} alt="Logo" />
            </a>
          </div>

          <button
            className="navbar-toggler d-lg-none" // Hide on larger screens
            type="button"
            onClick={toggleNav} // Toggle the navigation when the button is clicked
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse col-12 ${isNavOpen ? "show" : ""}`}>
            <ul className="navbar-nav col-8 justify-content-end">
              {links.map((link, index) => (
                <li className="nav-item li-container" key={index}>
                  <Link href={link.href} className="cus_link px-4">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}


// import Link from "next/link";
// import "./navbar.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// export default function Navbar(props: any) {
//   const { links = [] } = props;

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-md cus_navbar shadow fixed-top">
//         <div className="container">
//           <div className="col-4">
//             <a href={props.logolink}>
//               <img src="/logo.png" className="img p-0 m-0 img-fluid" width={250}></img>
//             </a>
//           </div>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse col-12" id="navbarSupportedContent">
//             <ul className="navbar-nav col-8 justify-content-end">
//               {links.map((link, index) => (
//                 <li className="nav-item li-container" key={index}>
//                   <Link className="cus_link px-4" href={link.href}>{link.name}</Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }
