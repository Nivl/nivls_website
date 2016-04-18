import React from 'react';

import IconButton from 'material-ui/IconButton/IconButton';
import ActionHMenu from 'material-ui/svg-icons/navigation/menu';

import './header.scss';

const HeaderContainer = () => (
  <header className="pageHeader">
    <div className="appBar">
      <IconButton>
        <ActionHMenu />
      </IconButton>

      <span className="branding">Melvin Laplanche</span>

      <ul className="rightLinks">
        <li>
          <a href="#">Blog</a>
        </li>

        <li>
          <a href="#">About</a>
        </li>

        <li>
          <a href="#">Portfolio</a>
        </li>
      </ul>

    </div>
    <div className="subHeader">
      <div className="content">
        <h1>Blog</h1>
        <h2>Company Updates & Technology Articles</h2>
      </div>
    </div>
  </header>
);

export default HeaderContainer;
