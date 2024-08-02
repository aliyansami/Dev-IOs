import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import defaultImage from "../images/user.png";

interface ProfileCardProps {
  name: string;
  profileImage?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({name, profileImage}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{uri: profileImage || defaultImage}}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProfileCard;
