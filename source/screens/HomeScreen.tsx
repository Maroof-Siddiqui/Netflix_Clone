import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);

  const [isHomePressed,SetisHomePressed] = useState(false);
  const [isSearchPressed,SetisSearchedPressed] = useState(false);

  const handleHomePress = () =>{
    SetisHomePressed(true);
    SetisSearchedPressed(false);
  }
  const handleSearchPress = () =>{
    SetisSearchedPressed(true);
    SetisHomePressed(false);
  }

  useEffect(() => {
    // Fetch data from the API
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderMovieItem = ({item}) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('DetailsScreen', { movieId: item.show.id })}>
      <Image
        source={{uri: item.show.image?.medium}}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{item.show.name}</Text>
      {/* <Text numberOfLines={1} style={styles.movieSummary}>
        {item.show.summary}
      </Text> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoView}>
          <Image source={require('../assets/Netflix_Logo.png')} style={styles.logo} />
        </View>
        <View style={styles.iconsView}>
          <TouchableOpacity>
          <Image source={require('../assets/Cast.webp')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
          <Image source={require('../assets/Search.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
      <View style={styles.genre}>
      <Text style={styles.genreText}>All Genre</Text>
      <FlatList
        data={movies}
        keyExtractor={item => item.show.id.toString()}
        renderItem={renderMovieItem}
        horizontal={true}
        />
      </View>

      <View style={styles.genre}>
      <Text style={styles.genreText}>Horror Genre</Text>
      <FlatList
        data={movies}
        keyExtractor={item => item.show.id.toString()}
        renderItem={renderMovieItem}
        horizontal={true}
        />
      </View>

      <View style={styles.genre}>
      <Text style={styles.genreText}>Comedy Genre</Text>
      <FlatList
        data={movies}
        keyExtractor={item => item.show.id.toString()}
        renderItem={renderMovieItem}
        horizontal={true}
        />
      </View>

      <View style={styles.genre}>
      <Text style={styles.genreText}>Emotional Genre</Text>
      <FlatList
        data={movies}
        keyExtractor={item => item.show.id.toString()}
        renderItem={renderMovieItem}
        horizontal={true}
        />
      </View>
      </ScrollView>

      <View style={styles.footer}>
      <TouchableOpacity onPress={handleHomePress} style={[{ borderColor: isHomePressed ? 'red' : 'white' },styles.footerbutton]}>
          <Image source={require('../assets/Home.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearchPress} style={[{ borderColor: isSearchPressed ? 'red' : 'white' },styles.footerbutton]}>
          <Image source={require('../assets/Search.png')} style={styles.icon} />
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderColor:'black',
    borderBottomWidth:4,
  },
  logoView: {
    flex: 1,
    alignItems: 'flex-start',
  },
  iconsView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 16,
  },
  movieItem: {
    margin:5,
    width:150,
    height:140,
  },
  movieImage: {
    width: 150,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color:'black'
  },
  genre:{
    margin:5,
    backgroundColor:'#f5f5f5'
  },
  genreText: {
    color: 'black',
    fontWeight:'bold',
    fontSize:20,
  },
  movieSummary: {
    textAlign: 'center',
    marginBottom: 10,
    color:'black'
  },
  footer:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    width:'100%',
    height:50,
    borderWidth:3,
    borderRadius:10,
    borderColor:"black",
  },
  footerbutton:{
    width:'50%',
    height:40,
    alignItems:'center',
    borderRadius:10,
    borderWidth:4,
  },
});

export default HomeScreen;
