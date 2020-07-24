import React, { useState, useEffect, useMemo } from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';

import ListItem, { IPost } from './PostView';

export default function InfiniteScroll() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<IPost[]>([]);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      setLoading(true);

      const posts: IPost[] = await createPosts();

      setItems((prev) => [...prev, ...posts]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: IPost }) => <ListItem data={item} />;

  const renderFooter = useMemo(
    () =>
      loading ? (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      ) : null,
    [loading],
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.list}
      onEndReached={retrieveData}
      onEndReachedThreshold={0.7}
      keyExtractor={(item) => String(item.id)}
      maxToRenderPerBatch={8}
      initialNumToRender={8}
      removeClippedSubviews
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 40,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

async function createPosts() {
  return new Promise<IPost[]>((resolve) => {
    setTimeout(() => {
      const data: IPost[] = Array.from({ length: 20 }).map(() => ({
        body: {
          text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sunt similique beatae expedita atque ipsa ab amet, adipisci suscipit vel consectetur quisquam necessitatibus. Accusamus similique ipsam sed molestiae eius animi.',
          imageUrl:
            Math.random() > 0.6 ? 'https://picsum.photos/400/250' : undefined,
        },
        title: 'Lorem ipsum',
        id: Math.floor(Math.random() * 10000000),
        user: {
          id: Math.floor(Math.random() * 100000),
          avatarUrl: 'https://picsum.photos/40',
        },
      }));

      resolve(data);
    }, 500);
  });
}
