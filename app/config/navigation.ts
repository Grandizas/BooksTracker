import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

export type NavigationLink = {
  label: string;
  to: string;
  icon: [string, string];
  ariaCurrent: 'page' | undefined;
};

export function useNavigationLinks(): NavigationLink[] {
  const { t } = useI18n();
  const $route = useRoute();

  return [
    {
      label: t('navigation.home'),
      to: '/',
      icon: ['far', 'house'],
      ariaCurrent: $route.path === '/' ? 'page' : undefined,
    },
    {
      label: t('navigation.books'),
      to: '/books',
      icon: ['far', 'book-open'],
      ariaCurrent: $route.path.startsWith('/books') ? 'page' : undefined,
    },
    {
      label: t('navigation.wishlist'),
      to: '/wishlist',
      icon: ['far', 'heart'],
      ariaCurrent: $route.path.startsWith('/wishlist') ? 'page' : undefined,
    },
    {
      label: t('navigation.completed'),
      to: '/completed',
      icon: ['far', 'circle-check'],
      ariaCurrent: $route.path.startsWith('/completed') ? 'page' : undefined,
    },
    {
      label: t('navigation.add'),
      to: '/add',
      icon: ['far', 'plus'],
      ariaCurrent: $route.path.startsWith('/add') ? 'page' : undefined,
    },
  ];
}
