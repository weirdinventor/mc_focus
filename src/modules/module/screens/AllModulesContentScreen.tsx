import { ModuleSmallCard } from './../../../components/Cards/ModuleSmallCard';
import { ContentScreenWrapper } from './../../../components/ContentScreenWrapper';
// 1. RootStackScreenProps is removed as it's specific to React Navigation.
import { useGetAllModulesQuery } from './../../../react-query/queries/modules/modulesQueries';
import React from 'react';

// Define a type for the module data for better type safety.
// This infers the type directly from your query hook's return value.
type ModuleType = ReturnType<typeof useGetAllModulesQuery>['data'][0];

// 2. The component signature is simplified for the web.
export const AllModulesContentScreen = () => {
  // Data fetching logic remains unchanged.
  const { data: modules } = useGetAllModulesQuery({});

  return (
    <ContentScreenWrapper
      // The logic for adding a temporary categoryId remains the same.
      data={modules.map((el) => ({ ...el, categoryId: 'foo' }))}
      headerTitle="modules.allModules"
      smallCards={true}
      // 3. The RenderItem function is updated to match the web component's expected props.
      // It now correctly receives and types 'item' and 'index'.
      RenderItem={({ item, index }: { item: ModuleType & { categoryId: string }; index: number }) => (
        <ModuleSmallCard {...item} isPremium={index % 2 === 0} />
      )}
    />
  );
};