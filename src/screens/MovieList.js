import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Header, Card, Button, Image, Rating} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import {getDataMovie} from '../redux/actions/MovieList';
import {ScrollView} from 'react-native-gesture-handler';

class MovieList extends Component {
  state = {
    movie: [],
  };

  componentDidMount() {
    this.props.getDataMovie();
  }
  render() {
    console.log('ini movie', this.props.movie);
    return (
      <SafeAreaView>
        <View>
          <Header
            containerStyle={{marginTop: -30}}
            leftComponent={{icon: 'menu', color: '#fff'}}
            centerComponent={{text: 'LIST MOVIE', style: {color: '#fff'}}}
            rightComponent={{icon: 'home', color: '#fff'}}
          />
        </View>
        <FlatList
          data={this.props.movie.results}
          progressViewOffset={5}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('moviedetails', {
                  data: item,
                });
              }}>
              <Card>
                <View style={styles.coloum}>
                  <View>
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                      }}
                      style={{width: 100, height: 140}}
                    />
                  </View>
                  <View style={styles.desc}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 15,
                        textTransform: 'uppercase',
                      }}>
                      {item.original_title}
                    </Text>
                    <Text>Playing On {item.release_date}</Text>
                    <Text
                      style={{
                        color: '#EDD15C',
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginLeft: '4%',
                      }}>
                      Rating ({item.vote_average}/10)
                    </Text>
                    <Rating
                      readonly
                      startingValue={item.vote_average / 2}
                      ratingCount={5}
                      imageSize={20}
                      style={{alignItems: 'flex-start'}}
                    />
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  coloum: {
    flexDirection: 'row',
  },
  desc: {
    marginLeft: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    movie: state.movieList.movie,
  };
};

export default connect(mapStateToProps, {getDataMovie})(MovieList);
