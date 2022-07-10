import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  NgcCookieConsentConfig,
  NgcCookieConsentModule,
} from 'ngx-cookieconsent';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { OnlyLoggedInUsersGuard } from './core/guards/onlyLoggedInUsers.guard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ErrorInterceptor } from './core/http-interceptors/error.interceptor';
import { AuthInterceptor } from './core/http-interceptors/auth.interceptor';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CookieService } from 'ngx-cookie-service';

const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost', // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000',
    },
    button: {
      background: '#f1d600',
    },
  },
  theme: 'edgeless',
  type: 'opt-out',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    YouTubePlayerModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    NgcCookieConsentModule.forRoot(cookieConfig),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    OnlyLoggedInUsersGuard,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
