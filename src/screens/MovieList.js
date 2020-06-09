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
import {Header, Card, Image, Rating, Button} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

// import redux
import {connect} from 'react-redux';
import {getDataMovie} from '../redux/actions/MovieList';

class MovieList extends Component {
  state = {
    movie: [],
    currentPage: 1,
    showModal: false,
  };

  getNewData = () => {
    this.setState({currentPage: this.state.currentPage + 1});
    this.props.getDataMovie(this.state.currentPage + 1);
  };

  // prevData = () => {
  //   this.props.getDataMovie(this.state.currentPage - 1);
  // };

  componentDidMount() {
    this.props.getDataMovie(this.state.currentPage);
    setTimeout(() => {
      this.setState({showModal: true});
    }, 60000);
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
        {this.state.showModal ? (
          <View
            style={{
              shadowOpacity: 0.8,
              shadowRadius: 12.35,

              elevation: 14,
              height: 60,
              backgroundColor: '#fff',

              position: 'absolute',
              bottom: '6%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{width: 300}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 16, width: '50%'}}>
                  List movie has been updated !
                </Text>
                <Button
                  buttonStyle={{backgroundColor: '#E44752'}}
                  containerStyle={{margin: 0}}
                  titleStyle={{fontSize: 14}}
                  title="Showing"
                  onPress={this.getNewData}
                />
                {/* <Button
                buttonStyle={{backgroundColor: '#043354'}}
                containerStyle={{margin: 0, width: '20%'}}
                titleStyle={{fontSize: 14}}
                title="Prev"
                onPress={this.prevData}
                type="outline"
              /> */}
              </View>
            </View>
          </View>
        ) : null}
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
