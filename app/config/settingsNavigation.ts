export type SettingsNavigationLink = {
  id: number;
  name: string;
  to: string;
  icon: string;
  ariaCurrent: 'page' | undefined;
};

export function useSettingsNavigation(): SettingsNavigationLink[] {
  const { t, locale } = useI18n();
  const $route = useRoute();
  const localeValue = locale.value === 'en' ? '' : locale.value;

  return [
    {
      id: 1,
      name: t('profile.profile'),
      to: '/settings/profile',
      icon: 'user',
      ariaCurrent: $route.path.startsWith(`/${localeValue}/settings/profile`)
        ? 'page'
        : undefined,
    },
    {
      id: 2,
      name: t('settings.preferences'),
      to: '/settings/preferences',
      icon: 'gear',
      ariaCurrent: $route.path.startsWith(
        `/${localeValue}/settings/preferences`,
      )
        ? 'page'
        : undefined,
    },
    {
      id: 3,
      name: t('settings.notifications'),
      to: '/settings/notifications',
      icon: 'bell',
      ariaCurrent: $route.path.startsWith(
        `/${localeValue}/settings/notifications`,
      )
        ? 'page'
        : undefined,
    },
    {
      id: 4,
      name: t('settings.privacyAndSecurity'),
      to: '/settings/privacyAndSecurity',
      icon: 'shield',
      ariaCurrent: $route.path.startsWith(
        `/${localeValue}/settings/privacyAndSecurity`,
      )
        ? 'page'
        : undefined,
    },
    {
      id: 5,
      name: t('settings.account'),
      to: '/settings/account',
      icon: 'credit-card',
      ariaCurrent: $route.path.startsWith(`/${localeValue}/settings/account`)
        ? 'page'
        : undefined,
    },
    {
      id: 6,
      name: t('settings.about'),
      to: '/settings/about',
      icon: 'circle-info',
      ariaCurrent: $route.path.startsWith(`/${localeValue}/settings/about`)
        ? 'page'
        : undefined,
    },
  ];
}
