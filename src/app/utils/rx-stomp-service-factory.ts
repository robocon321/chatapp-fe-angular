import { customRxStompConfig } from '../core/config/CustomRxStompConfig';
import { RxStompService } from './../services/rx-stomp/rx-stomp.service';

export function rxStompServiceFactory() {
  const rxStomp = new RxStompService();
  rxStomp.configure(customRxStompConfig);
  rxStomp.activate();
  return rxStomp;
}