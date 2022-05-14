import { useStore } from 'vuex';

import { defaultConfigData } from '@/store/config/data';

export default () => {
  const twitch = window?.Twitch?.ext;

  const store = useStore();

  const setBroadcasterConfig = () => {
    const broadcasterConfig = twitch.configuration.broadcaster;

    store.dispatch(
      'config/setConfig',
      broadcasterConfig?.content || JSON.stringify(defaultConfigData),
    );
  };

  if (!store.getters['config/configurationLoaded']) setBroadcasterConfig();

  twitch.configuration.onChanged(setBroadcasterConfig);

  return { twitch };
};
