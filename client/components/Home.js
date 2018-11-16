import React from 'react'
import './Home.css'

export default class Home extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="homeParent">
        <div id="bg">
          <img
            src="https://res.cloudinary.com/teepublic/image/private/s--PNiVFD9R--/t_Preview/b_rgb:191919,c_lpad,f_jpg,h_630,q_90,w_1200/v1475516675/production/designs/712212_1.jpg"
            alt=""
          />
        </div>
        <div className="titleDiv">The Settlers of Fullstack</div>
      </div>
    )
  }
}
