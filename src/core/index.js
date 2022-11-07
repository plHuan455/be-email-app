import MessageTypes from './constants/message-types';
import {
  // NotAllowedType,
  RequestPermissionFailed,
  SystemNotReadyError,
} from './utils/errors';
import EventEmitter from './utils/event-emitter';

/**
 *
 * @param {string} message
 * @returns {Promise<string | {type: string; payload: any} | undefined>}
 */
//receive nsg
// data

const receiveData = {
  'get-person-info': -1,
  'get-wallet': -1,
  'get-view-on-boarding': -1,
  'check-performance': -1,
  'get-raw-seed': -1,
  'get-raw-seed-confirm': -1,
  'create-wallet': -1,
  'get-node': -1,
  'connect-node': -1,
  'scan-qr': -1,
  'get-file-zip': -1,
  'get-balance-wallet': -1,
  'unzip-process': -1,
  'unzip-file': -1,
  'read-abi-file': -1,
  'get-all-smart-contract': -1,
  'watch-approve': -1,
  'send-transaction': -1,
  'take-picture': -1,
  'get-transaction': -1,
  'read-abi-string': -1,
  'get-white-list-pagination': -1,
  'get-my-setting': -1,
  'set-status-notification': -1,
  'backup-data': -1,
  'on-zip-process': -1,
  'on-zip-result': -1,
  'sync-data-to-watch': -1,
  'insert-white-list': -1,
  'check-white-list-is-exist': -1,
  'copy-clipboard': -1,
  'capture-screen': -1,
  'get-qr-from-image': -1,
  'get-qr-from-camera': -1,
  'get-from-clipboard': -1,
  'select-image': -1,
  'check-amount': -1,
  'set-pin-code': -1,
  'check-pin-code': -1,
  'request-face-touch-id': -1,
  'on-off-confirm-watch': -1,
  tel: -1,
  'register-bottom': -1,
  'register-bottom-off': -1,
  'on-click-submit-button-bottom': -1,
  'select-date': -1,
};
async function waitUntil(command) {
  return await new Promise((resolve) => {
    const interval = setInterval(() => {
      if (typeof receiveData[command] != 'number') {
        resolve();
        clearInterval(interval);
      }
    }, 1000);
  });
}
async function sendMessageToFlutter(message) {
  if (typeof receiveData[message.command] != 'undefined') {
    receiveData[message.command] = 0;
  }
  //post msg
  if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.callbackHandler
  ) {
    window.webkit.messageHandlers.callbackHandler.postMessage(
      JSON.stringify(message),
    );
  } else {
    console.log('not found window.webkit');
  }

  if (typeof receiveData[message.command] === 'undefined') {
    return;
  }

  // sleep
  await waitUntil(message.command);

  // console.log("4444", message.command);
  // console.log("5555", receiveData[message.command]);

  return receiveData[message.command];

  // return window.flutter_inappwebview?.callHandler?.('Flutter', message);
}

class SystemCore extends EventEmitter {
  // get acceptedTypes() {
  //   return this._acceptedTypes;
  // }

  get isReady() {
    return this._isReady;
  }

  constructor() {
    super();
    // this._isReady = !window.flutter_inappwebview ? !!window.opener : false;
    this._isReady =
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.callbackHandler
        ? true
        : !!window.opener;
    // this._acceptedTypes = Object.values(MessageTypes);
    this._subscribe();
  }
  // type,
  async send(payload = {}) {
    if (!this.isReady) {
      throw new SystemNotReadyError();
    }
    // if (!this._checkIsAllowType(type)) {
    //   throw new NotAllowedType();
    // }
    // type,
    // const msg = JSON.stringify(payload);
    if (window.webkit && window.webkit.messageHandlers) {
      // const res = await sendMessageToFlutter(msg);
      const res = await sendMessageToFlutter(payload);
      // console.log('xxxxx2', res);
      if (res == null) {
        return;
      }
      if (typeof res === 'string') {
        return this._handleJsonStringMessage(res);
      }
      const command = res.command;
      const response = res.data;
      receiveData[command] = -1;

      // console.log('response =>', response);
      if (typeof response == 'undefined') {
        throw `Command not response - ${JSON.stringify(res)}`;
      }
      if (response.success !== true) {
        throw response.message;
      }
      // if (res?.type !== type) {
      //   return;
      // }
      // res?.type || type,
      // this.emit(command, res.data);
      return res.data;
    }
    // type,
    var valueResponse = await this._postMessageToWindow(payload);
    // console.log('valueResponse = ', valueResponse);
    return valueResponse;
  }

  async exit() {
    await this.send(MessageTypes.EXIT);
  }

  async requestPermission(permission, option = undefined) {
    const res = await this.send(MessageTypes.PERMISSION, {
      permission,
      option,
    });
    if (!res?.payload?.success) {
      const error = new RequestPermissionFailed();

      if (!res?.payload) {
        error.success = false;
        error.permission = permission;
        throw error;
      }
      Object.assign(error, res.payload);
      throw error;
    }
    res.payload.permission = permission;
    return res.payload;
  }
  // type,
  _postMessageToWindow(message) {
    const _this = this;
    return new Promise((resolve) => {
      const handleReceivedResponse = function (res) {
        resolve(res);
        // type,
        this.removeEventListener(handleReceivedResponse);
      }.bind(_this);
      // type,
      this.on(handleReceivedResponse);
      window.opener?.postMessage(message, '*');
    });
  }

  // _checkIsAllowType(type) {
  //   return this._acceptedTypes.includes(type);
  // }

  _subscribe() {
    window.addEventListener('flutterInAppWebViewPlatformReady', () => {
      this._isReady = true;
      this.emit('ready');
    });
    window.addEventListener('message', (ev) => {
      const { data } = ev;
      // console.log('=== React - 22222 ====', JSON.stringify(data), typeof data);
      if (typeof data === 'string') {
        return this._handleJsonStringMessage(data, true);
      }
      if (data.platform == 'ios') {
        // console.log('=== React - 33333 ====', data, data.command);
        if (data.isSocket !== true) {
          return (receiveData[data.command] = data.data);
        }
        console.log('=== React - receive socket ====', data, data.command);
        this.emit(data.command, data.data);
        return;
      }
      this.emit(data.command, data.data);
      // this.emit(data);
      return data;
    });
  }

  /**
   *
   * @param {string} stringData
   * @returns {Promise<{type: string; payload: any} | undefined>}
   */
  _handleJsonStringMessage(stringData, isListen) {
    if (!stringData) {
      return;
    }
    try {
      const res = JSON.parse(stringData);
      // console.log("<=== res ===>", JSON.stringify(res));

      const command = res.command;
      const response = res.data;
      if (response.success !== true) {
        if (isListen) {
          this.emit(command, res);
        }
        throw response.message;
      }
      if (isListen) {
        this.emit(command, res);
      }
      return res.data;
    } catch (err) {
      throw err.toString();
    }
  }
}

const core = new SystemCore();
export { core as SystemCore };
