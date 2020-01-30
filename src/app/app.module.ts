import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RemoteDevToolsProxy } from './remote-devtools-proxy';

// Register our remote devtools if we're on-device and not in a browser
if (!window['devToolsExtension'] && !window['__REDUX_DEVTOOLS_EXTENSION__']) {
  const remoteDevToolsProxy = new RemoteDevToolsProxy({
    connectTimeout: 300000, // extend for pauses during debugging
    ackTimeout: 120000, // extend for pauses during debugging
    secure: false // dev only
  });

  // support both the legacy and new keys, for now
  window['devToolsExtension'] = remoteDevToolsProxy;
  window['__REDUX_DEVTOOLS_EXTENSION__'] = remoteDevToolsProxy;
  console.log(`window: `, window);
}
@NgModule({
  declarations: [AppComponent, CounterComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ count: counterReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

