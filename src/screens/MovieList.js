import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import {Header, Card, Image, Rating} from 'react-native-elements';
import {Toast} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

// import redux
import {connect} from 'react-redux';
import {getDataMovie} from '../redux/actions/MovieList';

class MovieList extends Component {
  state = {
    movie: [],
    currentPage: 1,
  };

  getNewData = () => {
    this.props.getDataMovie(this.state.currentPage + 1);
  };
  modalShow = () => {
    setTimeout(() => {
      Toast.show({
        text: 'List movie has been updated !',
        buttonText: 'Showing',
        onClose: (reason) => {
          reason === 'user' ? this.getNewData() : null;
        },
        duration: 10000,
        buttonTextStyle: {color: '#fff'},
        buttonStyle: {backgroundColor: '#2196F3'},
      });
    }, 20000);
  };
  componentDidMount() {
    this.props.getDataMovie(this.state.currentPage);
  }
  render() {
    console.log('ini movie', this.props.movie);
    return (
      <SafeAreaView>
        <View>
          <Header
            containerStyle={{
              marginTop: -25,
              backgroundColor: '#E44752',
              padding: '2%',
            }}
            // leftComponent={{icon: 'menu', color: '#fff'}}
            centerComponent={{text: 'NEUFLIX', style: {color: '#fff'}}}
            // rightComponent={{icon: 'bookmark', color: '#fff'}}
          />
        </View>

        <FlatList
          contentContainerStyle={{paddingBottom: 70}}
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
                    <View style={{width: '84%'}}>
                      <Text style={styles.labelTitle}>
                        {item.original_title}
                      </Text>
                    </View>
                    <Text>Release : {item.release_date}</Text>
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
                    <Text>Popularity : {item.popularity}</Text>
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
    padding: '5%',
    justifyContent: 'space-between',
  },
  labelTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'uppercase',
    backgroundColor: '#043354',
    color: 'white',

    borderRadius: 4,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '2%',
    paddingTop: '2%',
    textAlign: 'left',
  },
});

const mapStateToProps = (state) => {
  return {
    movie: state.movieList.movie,
  };
};

export default connect(mapStateToProps, {getDataMovie})(MovieList);
