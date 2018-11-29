import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/actions'
import './navbar.css'

const Navbar = ({isLoggedIn, handleClick}) => {
  return (
    <nav id="navbar">
      <div className="navItem">
        <img src="http://www.bsbc.nb.ca/wp-content/uploads/2015/03/KolonistenVanCatan-twitter.png" />
      </div>
      <div className="navItem">
        <Link to="/home" className="navItem link">
          Home
        </Link>
      </div>
      {isLoggedIn ? (
        <div className="navItem">
          <Link to="/lobby" className="navItem link">
            Join Game
          </Link>
          <Link to="/" onClick={handleClick} className="navItem link">
            Logout
          </Link>
        </div>
      ) : (
        <div className="navItem">
          <Link to="/login" className="navItem link">
            Login
          </Link>
          <Link to="/signup" className="navItem link">
            Signup
          </Link>
        </div>
      )}
      <div className="navItem">
        <Link to="/" className="navItem link">
          How to Play
        </Link>
      </div>
      <div className="navItemRight">Settlers of Fullstack</div>
    </nav>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
