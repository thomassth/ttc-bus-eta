import { Text, Nav, INavLinkGroup, initializeIcons, DefaultButton } from '@fluentui/react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { boldStyle } from './styles/fluent'
import { useEffect, useState } from 'react';
initializeIcons();

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: 'Home',
        url: process.env.PUBLIC_URL+'/',
        key: 'home',
      },
      {
        name: 'Lines',
        url: process.env.PUBLIC_URL+`/lines`,
        key: 'lines',
      },
      {
        name: 'About',
        url: process.env.PUBLIC_URL+'/about',
        key: 'about'
      }
    ],
  },
];

export const App = (props: any) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);
  return (
    <div className='container'>
      <div className='navBar'>
        <DefaultButton className='title' href="/" title="Return home">
          <Text variant="large" styles={boldStyle}>
            TTC bus app
          </Text>
        </DefaultButton>
        {(dimensions.width >= 800) && <Nav groups={navLinkGroups} />}
      </div>
      <Outlet />
    </div>
  );
};
