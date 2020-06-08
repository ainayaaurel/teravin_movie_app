import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import screens
import MovieList from '../screens/MovieList';
import MovieDetails from '../screens/MovieDetails';

const Stack = createStackNavigator();

export default class StackScreen extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="movielist"
            component={MovieList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="moviedetails"
            component={MovieDetails}
            options={{headerTitle: 'Info'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
