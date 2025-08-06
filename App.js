import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

export default function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://memecoinpulse-api.onrender.com/api/coins')
      .then(res => res.json())
      .then(data => {
        setCoins(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>Confidential Score: {item.confidentialScore}%</Text>
      <Text>Source: @{item.tweetSource}</Text>
      <Text>Blockchain: {item.blockchain}</Text>
      <Text>Market Cap: {item.marketCap || 'N/A'}</Text>
      <Text>Liquidity: {item.liquidity || 'N/A'}</Text>
      <Text>Liquidity Locked: {item.liquidityLocked ? 'Yes' : 'No'}</Text>
      <Text>Launch Price: {item.launchPrice || 'N/A'}</Text>
      <Text>Current Price: {item.currentPrice || 'N/A'}</Text>
      <Text>Age: {item.age || 'N/A'}</Text>
      <Text>Holders: {item.holders || 'N/A'}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>MemeCoin Pulse</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={coins}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 15
  },
  name: { fontSize: 18, fontWeight: 'bold' }
});
