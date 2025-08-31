// MyModulesContentScreen.tsx

import { ModuleSmallCard } from './../../../components/Cards/ModuleSmallCard';
import { ContentScreenWrapper } from './../../../components/ContentScreenWrapper';
import { RootStackScreenProps } from './../../../navigators/stacks/RootNavigator';
import { useGetMyModulesQuery } from './../../../react-query/queries/modules/modulesQueries';
import React from 'react';

// Assuming a type for your module data for better type safety
type ModuleType = ReturnType<typeof useGetMyModulesQuery>['data'][0];

export const MyModulesContentScreen =
  ({}: RootStackScreenProps<'MyModulesContentScreen'>) => {
    const { data: modules } = useGetMyModulesQuery();

    return (
      <ContentScreenWrapper
        data={modules.map((el) => ({ ...el, categoryId: 'foo' }))}
        headerTitle="modules.myModules"
        smallCards={true}
        // FIX: The function now correctly destructures 'item' and 'index' from a single props object
        // and provides explicit types, resolving all three errors.
        RenderItem={({ item, index }: { item: ModuleType & { categoryId: string }; index: number }) => (
          <ModuleSmallCard {...item} isPremium={index % 2 === 0} />
        )}
      />
    );
  };