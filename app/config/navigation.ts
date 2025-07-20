import { useI18n } from "vue-i18n";

export type NavigationLink = {
  label: string;
  to: string;
  icon: [string, string];
};

export function useNavigationLinks(): NavigationLink[] {
  const { t } = useI18n();

  // prettier-ignore
  return [
    { label: t("navigation.home"), to: "/", icon: ["far", "house"] },
    { label: t("navigation.books"), to: "/books", icon: ["far", "book-open"] },
    { label: t("navigation.wishlist"), to: "/wishlist", icon: ["far", "heart"] },
    { label: t("navigation.completed"), to: "/completed", icon: ["far", "circle-check"] },
    { label: t("navigation.add"), to: "/add", icon: ["far", "plus"] },
  ];
}
