import 'server-only';
import { AppThemeResponse } from '@/app/layout';
import { fetchGraphQL } from '@/contentful/api';
import { appTheme } from '@/contentful/gql-queries';

export async function getTheme() {
  const res = await fetchGraphQL<AppThemeResponse>(
    appTheme(process.env.DOMAIN as string)
  );

  const app = res.data.appCollection.items[0];

  return app.theme;
}
