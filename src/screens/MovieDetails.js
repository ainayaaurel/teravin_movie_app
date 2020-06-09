import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Image, Rating} from 'react-native-elements';

export default class MovieDetails extends Component {
  render() {
    return (
      <ScrollView>
        <View>
          <View style={styles.card}>
            <Text style={styles.title}>
              {this.props.route.params.data.title} (YEAR)
            </Text>
          </View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original${this.props.route.params.data.backdrop_path}`,
            }}
            style={{width: '100%', height: 250}}
          />

          <View style={styles.card}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#a3a2a0',
                textTransform: 'uppercase',
              }}>
              Release : {this.props.route.params.data.release_date}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#a3a2a0',
                textTransform: 'uppercase',
              }}>
              | Rating :
            </Text>
            <Rating
              readonly
              startingValue={this.props.route.params.data.vote_average / 2}
              ratingCount={5}
              imageSize={15}
              style={{alignItems: 'flex-start', marginLeft: 3}}
            />
            <Text style={{fontSize: 12}}>
              ({this.props.route.params.data.vote_average}/10)
            </Text>
          </View>
          <View style={styles.desc}>
            <Text style={styles.subtitle}>Synopsis</Text>
            <Text style={styles.caption}>
              {this.props.route.params.data.overview}
            </Text>
          </View>
          <View style={styles.desc}>
            <Text style={styles.subtitle}>Language</Text>
            <Text style={styles.caption}>
              Language : {this.props.route.params.data.original_language}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 5,
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  desc: {
    backgroundColor: 'white',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    textTransform: 'uppercase',
  },

  subtitle: {
    marginLeft: '5%',
    marginTop: '3%',
    fontWeight: 'bold',
    color: '#a3a2a0',
    fontSize: 16,
    textTransform: 'uppercase',
  },

  caption: {
    marginTop: '-3%',
    padding: '5%',
    fontSize: 16,
    textAlign: 'justify',
  },
});
