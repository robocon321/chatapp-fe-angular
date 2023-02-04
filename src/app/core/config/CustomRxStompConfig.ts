import { LocalStorageService } from './../../services/local-storage/local-storage.service';
import { RxStompConfig } from '@stomp/rx-stomp';

var _token = new LocalStorageService();
export const customRxStompConfig: RxStompConfig = {
  brokerURL: 'ws://127.0.0.1:8082/ws',
  connectHeaders: {
    login: 'guest',
    passcode: 'guest',
  },
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds
  reconnectDelay: 1000,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};