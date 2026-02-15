import Aurelia from 'aurelia';
import { RouterConfiguration } from '@aurelia/router-lite';
import { App } from './app/components/app/app';

const au = new Aurelia();
au.register(RouterConfiguration.customize({ useUrlFragmentHash: false }));
au.app({
  component: App,
  host: document.body,
});
au.start();
