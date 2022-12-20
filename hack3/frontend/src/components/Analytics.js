import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { GET_ITEMS_QUERY } from '../graphql/queries';
import { UPDATE_ITEM_MUTATION, DELETE_ITEM_MUTATION } from '../graphql/mutations';
import {
  ITEM_CREATED_SUBSCRIPTION,
  ITEM_UPDATED_SUBSCRIPTION,
  ITEM_DELETED_SUBSCRIPTION,
} from '../graphql/subscriptions';

import Balance from './Balance';
import Category from './Category';

function Analytics() {
  // TODO 2.2 Use the useQuery hook to get items from backend
  const {
    loading, error, data: itemsData, subscribeToMore,
  } = useQuery(GET_ITEMS_QUERY);

  useEffect(
    () => {
      subscribeToMore({
        document: ITEM_CREATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const item = subscriptionData.data.itemCreated;
          return {
            items: [item, ...prev.items],
          };
        },
      });
    },
    [subscribeToMore],
  );

  useEffect(
    () => {
      subscribeToMore({
        document: ITEM_UPDATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const updatedItem = subscriptionData.data.itemUpdated;
          return {
            items: prev.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
          };
        },
      });
    },
    [subscribeToMore],
  );

  if (loading) return <p>Loading...</p>;
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return (<p>Error :(</p>);
  }

  
  const { items } = itemsData;
  // TODO 2.2 End


  return (
    <div className="grid grid-cols-12 gap-6">
      {
        // TODO 2.3 Add Balence and Category (uncomment the following code)
      }
      <div className="col-span-6">
        <Balance items={items} />
      </div>
      <div className="col-span-6">
        <Category items={items} />
      </div>
      {
        // TODO 2.3 End
      }
    </div>
  );
}

export default Analytics;
