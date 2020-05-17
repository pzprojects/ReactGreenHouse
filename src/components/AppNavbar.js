import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledTooltip,
  Label,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

class AppNavbar extends Component {
  state = {
    isOpen: false,
    LanguagePicker: "עברית"
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  GetActiveLink = (path) => {
    if (window.location.pathname === path) {
      return "active"
    }
    else return ""
  };
  
  ChangeLanguage = (ChoosenLang) => {
    console.log(ChoosenLang);
    this.setState({
      LanguagePicker: ChoosenLang.LangName
    });
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const LanguagesList = [{
      LangName: "עברית",
      Img: <img alt="" src={require('../Resources/Hebrew-8.png')} />,
      Code: "he",
      dir: "rtl"
    },
    {
      LangName: "English",
      Img: <img alt="" src={require('../Resources/English-8.png')} />,
      Code: "en",
      dir: "ltr"
    }];

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbarWelcome navbar-text'>
            <strong id="navbarWelcomeTooltip">שלום {user ? `${user.name}` : ''}</strong>
            <UncontrolledTooltip placement="bottom" target="navbarWelcomeTooltip">
              שלום {user ? `${user.name}` : ''}
            </UncontrolledTooltip>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <LoginModal />
        </NavItem>
        <NavItem className='RegisterLink'>
          <NavLink href='/RegisterUserType'>
            הירשם עכשיו
          </NavLink>
        </NavItem>
      </Fragment>
    );

    const navitems = (
      <Fragment>
        <NavItem className={this.GetActiveLink('/HomePage')}>
          <NavLink href='https://www.co-greenhouse.com/' target="_blank">
            דף הבית
          </NavLink>
        </NavItem>
        <NavItem className={this.GetActiveLink('/')}>
          <NavLink href='/'>
            אזור אישי
          </NavLink>
        </NavItem>
        <NavItem className={this.GetActiveLink('/Shop')}>
          <NavLink href='https://www.co-greenhouse.com/shop' target="_blank">
            לחנות שלנו
          </NavLink>
        </NavItem>
        <NavItem className={this.GetActiveLink('/CommunityServices')}>
          <NavLink href='https://www.co-greenhouse.com/communityfarmers' target="_blank">
            לחקלאי הקהילה שלנו
          </NavLink>
        </NavItem>
        <NavItem className={this.GetActiveLink('/FAQ')}>
          <NavLink href='https://www.co-greenhouse.com/faq' target="_blank">
            שאלות ותשובות
          </NavLink>
        </NavItem>
        <NavItem className={this.GetActiveLink('/ContactUs')}>
          <NavLink href='https://www.co-greenhouse.com/contact' target="_blank">
            צור קשר
          </NavLink>
        </NavItem>
      </Fragment>
    );

    const adminnavitems = (
      <Fragment>
        <NavItem className={this.GetActiveLink('/')}>
          <NavLink href='/'>
            ניהול משתמשים
          </NavLink>
        </NavItem>
        <NavItem className={this.GetActiveLink('/VegManagment')}>
          <NavLink href='/VegManagment'>
            ניהול ירקות
          </NavLink>
        </NavItem>
        <NavItem className={this.GetActiveLink('/FieldCropManagment')}>
          <NavLink href='/FieldCropManagment'>
            ניהול גידולי שדה
          </NavLink>
        </NavItem>
        <NavItem className={this.GetActiveLink('/SystemLogs')}>
          <NavLink href='/SystemLogs'>
            לוגים
          </NavLink>
        </NavItem>
        <NavItem className={this.GetActiveLink('/SystemSettings')}>
          <NavLink href='/SystemSettings'>
            ניהול נתוני מערכת
          </NavLink>
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <div className='ChooseLang'>
          <Label for='LanguagePicker'></Label>
          <UncontrolledDropdown>
            <DropdownToggle outline color="primary" caret>
              {this.state.LanguagePicker}
            </DropdownToggle>
            <DropdownMenu right >
              {LanguagesList.map(function (item, thirdkey) {
                return (
                  <DropdownItem className='LanguagePicker' type="button" key={thirdkey} onClick={() => this.ChangeLanguage(item)} >
                    <span className="LanguagePickerItemImgContainer">{item.Img}</span>
                    <span className='LanguagePickerItemName'>{item.LangName}</span>
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <Navbar color='faded' light expand='sm' className='mb-5'>
          <Container>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <div className="ConnectionLinks">
                  {isAuthenticated ? authLinks : guestLinks}
                </div>
                {isAuthenticated ? user.usertype === 'SysAdmin' && user.usertype !== "null" ? adminnavitems : navitems
                  : navitems}
              </Nav>
              <div className='COHeader' >
                <NavbarBrand href='/'>CO-Greenhouse</NavbarBrand>
              </div>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);