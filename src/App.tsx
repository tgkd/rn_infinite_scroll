import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

import InfiniteScroll from './components/InfiniteScroll';

declare const global: { HermesInternal: null | {} };

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <InfiniteScroll />
      </SafeAreaView>
    </>
  );
}
