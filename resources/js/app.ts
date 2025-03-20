import {EventManager} from './services/events';
import {HttpManager} from './services/http';
import {Translator} from './services/translations';
import * as componentMap from './components/index';
import {ComponentStore} from './services/components';
import {baseUrl, importVersioned} from "./services/util";

// eslint-disable-next-line no-underscore-dangle
window.__DEV__ = false;
function loadCDNScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
    
    return new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
    });
}

// Пример использования
loadCDNScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js')
    .then(() => console.log('Скрипт загружен'))
    .catch(error => console.error('Ошибка загрузки:', error));

// Make common important util functions global
window.baseUrl = baseUrl;
window.importVersioned = importVersioned;

// Setup events, http & translation services
window.$http = new HttpManager();
window.$events = new EventManager();
window.$trans = new Translator();

// Load & initialise components
window.$components = new ComponentStore();
window.$components.register(componentMap);
window.$components.init();

