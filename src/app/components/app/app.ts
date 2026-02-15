import { IRouteableComponent } from '@aurelia/router-lite';

export class App implements IRouteableComponent {
  static routes = [
    { path: ['', 'welcome'], component: () => import('../welcome/welcome'), title: 'Welcome' },
    { path: 'children/:id/:scrollPos', component: () => import('../children/children'), title: 'Heroes' },
    { path: 'ManageHeroes', component: () => import('../ManageHeroes/ManageHeroes'), title: 'Manage Heroes' },
    { path: 'ManageParents', component: () => import('../ManageParents/ManageParents'), title: 'Manage Parents' },
    { path: 'pet/:id/:scrollPos', component: () => import('../pet/pet'), title: 'Select Pet' },
    { path: 'notifications', component: () => import('../notifications/notifications'), title: 'Receive Notifications' },
    { path: 'register', component: () => import('../register/register'), title: 'Register' },
    { path: 'quickstart', component: () => import('../quickstart/quickstart'), title: 'QuickStart' },
    { path: 'achievements/:id/:scrollPos', component: () => import('../achievements/achievements'), title: 'Achievements' },
    { path: 'unlock/:level/:scrollPos', component: () => import('../unlock/unlock'), title: 'Unlock' },
    { path: 'levelup/:id/:scrollPos', component: () => import('../levelup/levelup'), title: 'LevelUp' },
    { path: 'privacy', component: () => import('../privacy/privacy'), title: 'Privacy' },
  ];

  public signedIn: boolean = true;
  public signedInAs: string;
}
