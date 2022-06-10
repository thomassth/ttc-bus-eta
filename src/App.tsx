import { Stack, Text, Nav, INavLinkGroup } from '@fluentui/react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { boldStyle, stackStyles, stackTokens } from './styles/fluent'

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: 'Home',
        url: '/',
        key: 'home',
      },
      {
        name: 'Lines',
        url: `/lines`,
        key: 'lines',
      },
      {
        name:'About',
        url:'/about',
        key:'about'
      }
    ],
  },
];

export const App = (props: any) => {
  return (
    <div className='container'>
      <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
        <Text variant="large" styles={boldStyle}>
          TTC bus app
        </Text>
        <Nav groups={navLinkGroups}></Nav>
      </Stack>
      <Outlet />
    </div>
  );
};
