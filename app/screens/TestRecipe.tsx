// import React, {useEffect, useState} from 'react';
// import {View, Text, Button, Alert, StyleSheet, FlatList} from 'react-native';
// import {Recipe, fetchRecipes, addRecipe} from '../utilitystore/Recipe';

// // Example recipe
// const newRecipe: Recipe = {
//   name: 'Pizza',
//   imageUrl: 'https://example.com/image.jpg',
//   ingredients: ['Flour', 'Tomato Sauce', 'Cheese'],
//   steps: [
//     'Preheat oven to 400°C.',
//     'Spread tomato sauce on the dough.',
//     'Add cheese and toppings.',
//     'Bake for 15-20 minutes.',
//   ],
//   additionalInfo: 'Can add any toppings you like.',
// };

// export default function RecipeTestPage(): JSX.Element {
//   const [recipes, setRecipes] = useState<Recipe[]>([]);

//   useEffect(() => {
//     fetchRecipes(setRecipes);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Recipe to Firestore</Text>
//       <Button title="Add Recipe" onPress={() => addRecipe(newRecipe)} />
//       <Text style={styles.subtitle}>Stored Recipes:</Text>
//       <FlatList
//         data={recipes}
//         keyExtractor={item => item.id || ''}
//         renderItem={({item}) => (
//           <View style={styles.recipeItem}>
//             <Text style={styles.recipeTitle}>{item.name}</Text>
//             <Text>{item.additionalInfo}</Text>
//             <Text>Ingredients: {item.ingredients.join(', ')}</Text>
//             <Text>Steps: {item.steps.join(' -> ')}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   subtitle: {
//     fontSize: 16,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   recipeItem: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//     width: '100%',
//   },
//   recipeTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faEdit, faCamera} from '@fortawesome/free-solid-svg-icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {addRecipe} from '../utilitystore/Recipe'; // Update path as necessary

interface Recipe {
  name: string;
  imageUrl: string;
  ingredients: string[];
  steps: string[];
  additionalInfo: string;
}

const NewRecipeScreen: React.FC = () => {
  const [recipeName, setRecipeName] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [cookingInstructions, setCookingInstructions] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState<string>('');

  const handleRecipeNameChange = (text: string) => {
    setRecipeName(text);
  };

  const handleAddGalleryImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.assets) {
        const newImages = response.assets.map(asset => asset.uri || '');
        setGalleryImages([...galleryImages, ...newImages]);
      }
    });
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (index: number, text: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = text;
    setIngredients(updatedIngredients);
  };

  const handleAddCookingInstruction = () => {
    setCookingInstructions([...cookingInstructions, '']);
  };

  const handleCookingInstructionChange = (index: number, text: string) => {
    const updatedInstructions = [...cookingInstructions];
    updatedInstructions[index] = text;
    setCookingInstructions(updatedInstructions);
  };

  const handleAdditionalInfoChange = (text: string) => {
    setAdditionalInfo(text);
  };

  const handleSaveRecipe = async () => {
    try {
      if (!recipeName || !ingredients.length || !cookingInstructions.length) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }

      const newRecipe: Recipe = {
        name: recipeName,
        imageUrl: galleryImages[0] || '', // Assuming the first image as the main image
        ingredients,
        steps: cookingInstructions,
        additionalInfo,
      };

      await addRecipe(newRecipe);
      // Clear the form after successful submission
      setRecipeName('');
      setGalleryImages([]);
      setIngredients([]);
      setCookingInstructions([]);
      setAdditionalInfo('');
      Alert.alert('Success', 'Recipe added!');
    } catch (error) {
      console.error('Error adding recipe:', error);
      Alert.alert('Error', 'Failed to add recipe.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Recipe</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Recipe Name</Text>
        <TextInput
          style={styles.input}
          value={recipeName}
          onChangeText={handleRecipeNameChange}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Gallery</Text>
          <FontAwesomeIcon icon={faEdit} size={16} color="#777" />
        </View>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={handleAddGalleryImage}>
          <FontAwesomeIcon icon={faCamera} size={16} color="#777" />
          <Text style={styles.cardButtonText}>
            Upload Images or Open Camera
          </Text>
        </TouchableOpacity>
        <View style={styles.gallery}>
          {galleryImages.map((image, index) => (
            <Image key={index} source={{uri: image}} style={styles.image} />
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Ingredients</Text>
          <FontAwesomeIcon icon={faEdit} size={16} color="#777" />
        </View>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={ingredient}
              onChangeText={text => handleIngredientChange(index, text)}
            />
          </View>
        ))}
        <TouchableOpacity
          style={styles.cardButton}
          onPress={handleAddIngredient}>
          <FontAwesomeIcon icon={faPlus} size={16} color="#777" />
          <Text style={styles.cardButtonText}>Add Ingredient</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>How to Cook</Text>
          <FontAwesomeIcon icon={faEdit} size={16} color="#777" />
        </View>
        {cookingInstructions.map((instruction, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={instruction}
              onChangeText={text => handleCookingInstructionChange(index, text)}
            />
          </View>
        ))}
        <TouchableOpacity
          style={styles.cardButton}
          onPress={handleAddCookingInstruction}>
          <FontAwesomeIcon icon={faPlus} size={16} color="#777" />
          <Text style={styles.cardButtonText}>Add Directions</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Additional Info</Text>
          <FontAwesomeIcon icon={faEdit} size={16} color="#777" />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={additionalInfo}
            onChangeText={handleAdditionalInfoChange}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSaveRecipe}>
          <Text style={styles.buttonText}>Save Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Post to Feed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 28, // Increased font size for better prominence
    fontWeight: 'bold',
    color: '#333', // Darker color for better readability
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15, // Increased margin for better spacing
  },
  label: {
    fontSize: 18, // Slightly larger font size for better readability
    marginBottom: 8,
    color: '#555', // Lighter color for labels
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12, // Increased padding for better touch interaction
    borderRadius: 8, // Rounded corners for inputs
    backgroundColor: '#fff', // White background for input fields
    fontSize: 16, // Slightly larger font size for input text
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 20, // Increased padding for better content spacing
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Darker color for card titles
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  cardButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555', // Slightly darker color for button text
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default NewRecipeScreen;
