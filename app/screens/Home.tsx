import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {fetchRecipes} from '../utilitystore/Recipe'; // Adjust the path as needed
import {Recipe} from '../utilitystore/Recipe'; // Adjust the path as needed
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigation = useNavigation();
  const user = auth().currentUser;

  useEffect(() => {
    const getRecipes = async () => {
      if (user) {
        await fetchRecipes(setRecipes);
      }
    };

    getRecipes();
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error logging out', error);
      Alert.alert('Error', 'Unable to log out');
    }
  };

  const renderItem = ({item}: {item: Recipe}) => (
    <View style={styles.card}>
      <Text style={styles.makerName}>{item.name || 'Unnamed Recipe'}</Text>
      {/* <Image source={{uri: item.imageUrl}} style={styles.foodImage} /> */}
      <Text style={styles.additionalInfo}>
        {item.additionalInfo || 'No additional info available'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.content}>
          <FlatList
            data={recipes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
            snapToAlignment="center"
            snapToInterval={width * 0.9 + 20} // Width of card plus margin
            decelerationRate="fast" // Smooth snap effect
          />
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: (width - width * 0.9) / 2, // Center the cards
  },
  card: {
    width: width * 0.9, // Adjust width to suit your design
    height: height * 0.6, // Adjust height to suit your design
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  makerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  additionalInfo: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#00796b',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
