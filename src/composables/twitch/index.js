import { useStore } from 'vuex';
import { defaultConfigData } from '@/store/config/data';
import i18n from '@/plugins/i18n';

export default () => {
  const twitch = window?.Twitch?.ext;

  const store = useStore();

  const saveConfig = () => {
    const configuration = store.state.config.data;

    store.commit('config/lastSavedData', configuration);
    twitch.configuration.set('broadcaster', '1', JSON.stringify(configuration));
  };

  const setBroadcasterConfig = () => {
    const broadcasterConfig = twitch.configuration.broadcaster;

    store.dispatch(
      'config/setConfig',
        broadcasterConfig?.content || JSON.stringify(defaultConfigData),
    );
  };

  if (!store.getters['config/configurationLoaded']) setBroadcasterConfig();

  twitch.configuration.onChanged(setBroadcasterConfig);

  twitch.onContext((context) => {
    if (context.theme) store.commit('config/theme', context.theme);
    if (context.language) i18n.global.locale = context.language;
  });

  return { twitch, saveConfig };
};
