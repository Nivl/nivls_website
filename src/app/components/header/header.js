import React from 'react';
import { Link } from 'react-router';

import IconButton from 'material-ui/IconButton/IconButton';
import ActionHMenu from 'material-ui/svg-icons/navigation/menu';

import './header.scss';

const Header = ({ navigation }) => {
  const colorStyle = {
    backgroundColor: navigation.color,
  };

  return (
    <header className="pageHeader" style={colorStyle}>
      <div className="appBar">
        <IconButton>
          <ActionHMenu />
        </IconButton>

        <span className="branding">Melvin Laplanche</span>

        <ul className="rightLinks">
          <li>
            <Link to={"/"}>Blog</Link>
          </li>

          <li>
            <Link to={"/about"}>About</Link>
          </li>

          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>

      </div>
      <div className="subHeader">
        <div className="content">
          <h1>{navigation.title}</h1>
          <h2>{navigation.description}</h2>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  navigation: React.PropTypes.object.isRequired,
};

export default Header;
