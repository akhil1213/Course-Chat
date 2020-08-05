import React from "react";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import './Footer.css'
import createImg from '../../assets/create.png'
import { connect , dispatch} from 'react-redux';

const FooterPage = ({position}) => {
    return (
        <div className={position=="static" ? "footerContainer static" : "footerContainer fixed"}>
            <div className="row">
                <div className="column">
                    <a href='/'>About</a>
                    <a href='/'>About</a>
                    <a href='/'>About</a>
                    <a href='/'>About</a>
                </div>
                <div className="column">
                    <div className="center">
                        <img className="img" src = {createImg}></img>
                    </div>
                </div>
                
                <div className="column">
                    <p id="phonenumber">(917)-415-3421</p>
                    <a href='http://akhilkhanna.com' id="website">akhilkhanna.com</a>
                    <div className="iconContainer">
                        <a href='http://github.com/akhil1213'><GitHubIcon/></a>
                        <a href='https://www.linkedin.com/in/akhil-khanna1213/'><LinkedInIcon/></a>
                        <a href='https://twitter.com/AkhilKh94982591'><TwitterIcon/></a>
                    </div>
                </div>
            </div>
            <p id="copyright">Copyright © 2020 Created By Akhil Khanna. All rights reserved.</p>
        </div>
    );
}
const mapStateToProps = (store) => (
    {
      position:store.footer.position//isLogged is now a prop
    })
export default connect(mapStateToProps,null)(FooterPage)