import { Fragment } from 'react';

import classes from './Header.module.css'

import logo from "../../assets/logo.png"

const Header = props => {
  return <Fragment>
    <header className={classes.header}>
      <div className={classes.logo} ><img src={logo} size={10} alt="logo" /></div>
      <h1>Mails</h1>
    </header>
    </Fragment>
  }
    
  export default Header