import React from 'react'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
  <link
    href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <style
    dangerouslySetInnerHTML={{
      __html:
        '\n  body {\n  background-color: #0a0a0a;\n}\n\nhr {\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 2px solid rgba(255, 255, 255, 0.1);\n}\n\nspan.err-error {\n  text-transform: uppercase;\n  font-size: 7em;\n  font-family: "Rajdhani";\n  font-weight: 500;\n  color: #b4100b;\n  letter-spacing: 25px;\n}\n\nspan.err-status {\n  text-transform: uppercase;\n  font-size: 2em;\n  font-family: "Rajdhani";\n  font-weight: 500;\n  color: #cecece;\n  letter-spacing: 10px;\n}\n\nspan.err-statuscode {\n  text-transform: uppercase;\n  font-size: 2em;\n  font-family: "Rajdhani";\n  font-weight: 500;\n  color: #626262;\n  letter-spacing: 10px;\n}\nspan.err-junk {\n  text-transform: uppercase;\n  font-size: 1em;\n  font-family: "Rajdhani";\n  font-weight: 500;\n  color: #cecece;\n  letter-spacing: 10px;\n}\n\nspan.err-boxed {\n  border: 2px solid rgba(255, 255, 255, 0.1);\n  text-transform: uppercase;\n  font-family: "Rajdhani";\n  font-weight: 600;\n  letter-spacing: 7px;\n  padding: 0px 6px 0px 6px;\n  margin: 0px 25px 0px 0px;\n}\nspan.err-boxed.wht {\n  color: #000;\n  background-color: #cecece;\n}\nspan.err-boxed.red {\n  border: 0px solid rgba(255, 255, 255, 0.1);\n  color: #000;\n  background-color: #b4100b;\n  margin-left: -20px;\n}\n.err-container {\n  margin: 5% 50% 0 25%;\n  width: 50%;\n  display: block;\n  padding: 80px 0;\n}\n\na.err-link {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 1em;\n  font-family: "Rajdhani";\n  font-weight: 500;\n  color: #c9b311d0;\n  letter-spacing: 10px;\n  text-decoration: none;\n}\n\na.err-link:hover {\n  text-transform: uppercase;\n  font-size: 1em;\n  font-family: "Rajdhani";\n  font-weight: 500;\n  color: #e9cf0ae5;\n  letter-spacing: 10px;\n  text-decoration: line-through;\n}\n\n  '
    }}
  />
  <div className="err-container">
   
    <span className="err-error ">404</span>
    <hr />
    <span
      className="err-boxed"
      style={{ color: "#B4100B", letterSpacing: "small" }}
    >
     
    </span>
    <span className="err-boxed wht">NOT FOUND</span>
    <span className="err-boxed red" />
    
    
    <br />
    <br />
    <br />
    <br />
    <NavLink to="/" className="err-link">
      [go back]
    </NavLink>
  </div>
</>

  )
}

export default ErrorPage