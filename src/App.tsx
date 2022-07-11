import { Text, Nav, INavLinkGroup, initializeIcons, DefaultButton } from '@fluentui/react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { boldStyle } from './styles/fluent'
import { useEffect, useState } from 'react';
import { Anchor, Nav as BottomNav } from 'grommet';
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
        <DefaultButton className='title' href={process.env.PUBLIC_URL+'/'} title="Return home">
          <Text variant="large" styles={boldStyle}>
            TTC bus app
          </Text>
        </DefaultButton>
        {(dimensions.width >= 800) && <Nav groups={navLinkGroups} />}
      </div>
      <Outlet />
      {(dimensions.width < 800) && <div className='nav-buffer'></div>}
      {(dimensions.width < 800) && <BottomBar />}
    </div>
  );
};

const navItems = [
  {label: 'Home', href: process.env.PUBLIC_URL+'/'},
  {label: 'Lines', href: process.env.PUBLIC_URL+`/lines`},
  {label: 'About', href: process.env.PUBLIC_URL+'/about'},
]

const BottomBar = () => {
  let nav: JSX.Element[] = []
  navItems.forEach((item,index) => {
    if (item.href === window.location.pathname) {
      nav.push(<Anchor key={index} href={item.href} label={item.label} className='active' />)
    } else
    nav.push (
<Anchor key={index} label={item.label} href={item.href}/>
    )
  })
  return (
    <BottomNav className='bottomNav' gap="medium" direction="row">
      {nav.map (item => item)}
  </BottomNav>
  );
}