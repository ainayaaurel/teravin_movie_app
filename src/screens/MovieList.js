import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Header, Card, Button, Image, Rating} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import {getDataMovie} from '../redux/actions/MovieList';
import {ScrollView} from 'react-native-gesture-handler';

class MovieList extends Component {
  state = {
    movie: [],
  };
  // changeScreenToMovieDetails = () => {
  //   this.props.navigation.navigate('moviedetails', {
  //     data:
  //   });
  // };

  componentDidMount() {
    this.props.getDataMovie();
  }
  render() {
    console.log('ini movie', this.props.movie);
    return (
      <View>
        <View>
          <Header
            containerStyle={{marginTop: -30}}
            leftComponent={{icon: 'menu', color: '#fff'}}
            centerComponent={{text: 'LIST MOVIE', style: {color: '#fff'}}}
            rightComponent={{icon: 'home', color: '#fff'}}
          />
        </View>
        <ScrollView>
          <View>
            {this.props.movie.results &&
              this.props.movie.results.map((v, i) => {
                return (
                  <Card>
                    <View style={styles.coloum}>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('moviedetails', {
                              data: v,
                            });
                          }}>
                          <Image
                            source={{
                              uri: `https://image.tmdb.org/t/p/original/${v.poster_path}`,
                            }}
                            style={{width: 100, height: 140}}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.desc}>
                        <Text>{v.original_title}</Text>
                        <Text>Playing On {v.release_date}</Text>
                        <Rating
                          readonly
                          startingValue={v.vote_average / 2}
                          ratingCount={5}
                          imageSize={20}
                          style={{alignItems: 'flex-start'}}
                        />
                      </View>
                    </View>
                  </Card>
                );
              })}
          </View>
        </ScrollView>
      </View>
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
