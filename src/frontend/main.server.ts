import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { config } from './app.config.server';
// import 'zone.js';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
