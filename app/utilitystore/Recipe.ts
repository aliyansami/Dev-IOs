// app/services/firebaseService.ts
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

// Define TypeScript types
export interface Recipe {
  id?: string;
  name: string;
  imageUrl: string;
  ingredients: string[];
  steps: string[];
  additionalInfo: string;
}

// Function to fetch recipes
export async function fetchRecipes(
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>,
) {
  try {
    const user = auth().currentUser;
    if (!user) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    const snapshot = await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('recipes')
      .get();

    const recipes = snapshot.docs.map(
      doc => ({id: doc.id, ...doc.data()} as Recipe),
    );
    setRecipes(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    Alert.alert('Error', 'Failed to fetch recipes.');
  }
}

// Function to add a recipe
export async function addRecipe(recipe: Recipe) {
  try {
    const user = auth().currentUser;
    if (!user) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    await firestore()
      .collection('users')
      .doc(user.uid)
      .collection('recipes')
      .add(recipe);
    console.log('Recipe added!');
    Alert.alert('Success', 'Recipe added!');
  } catch (error) {
    console.error('Error adding recipe:', error);
    Alert.alert('Error', 'Failed to add recipe.');
  }
}
