import * as WebBrowser from 'expo-web-browser';
import { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import useAxios from '../hooks/useAxios';

export default function SearchResults({ subject }: { subject: string }) {
  const { data, error, loaded } = useAxios(
    `http://localhost:8000/api/players?filter[search]=${subject}`,
    'GET'
  );

  const stringifiedData = useMemo(() => {
    return JSON.stringify(data || {}, null, 2);
  }, [data]);

  if (loaded) {
    return error ? (
      <Text>Error: {error}</Text>
    ) : (
      <Text>{stringifiedData}</Text>
    );
  }

  return <Text>Loading...</Text>;
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text>Search for: {subject}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formattedData: {
    color: '#ccc',
    backgroundColor: '#333',
    padding: 10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
