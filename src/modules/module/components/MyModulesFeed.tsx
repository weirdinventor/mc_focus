import { ModuleCard } from './../../../components/Cards/ModuleCard';
import { FeedCardRow } from './../../../components/FeedCardsRow';
import { RootStackRoutes } from './../../../navigators/routes';
import { useGetMyModulesQuery } from './../../../react-query/queries/modules/modulesQueries';
import React, { memo } from 'react';

export const MyModulesFeed = memo(() => {
  const { data: modules } = useGetMyModulesQuery();

  return (
    <FeedCardRow
      data={modules.slice(0, 3)}

      // FIX: The navigationPath prop now receives a direct string,
      // not an object. This matches the updated FeedCardRow component.
      navigationPath={RootStackRoutes.MY_MODULES_CONTENT_SCREEN}

      RenderCard={({ item }) => <ModuleCard {...item} isPremium={false} />}
      headerTitle="modules.myModules"
    />
  );
});