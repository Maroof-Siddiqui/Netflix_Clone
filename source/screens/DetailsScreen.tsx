import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const DetailsScreen = ({ route }) => {
  // Get the movieId from the navigation route params
  const { movieId } = route.params;
  const [numol,setnumol] = useState(2);

  // State to store movie details
  const [movieDetails, setMovieDetails] = useState(null);

  // Function to fetch movie details based on movieId
  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${movieId}`);
      const data = await response.json();
      setMovieDetails(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  // Fetch movie details on component mount

useEffect(() => {
  if (movieId) {
    fetchMovieDetails();
  }
}, [movieId]);


  // Render loading until movie details are fetched
  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Render movie details
  return (
    <View style={styles.container}>
      {/* Movie Banner */}
      <Image source={{ uri: movieDetails.image?.original }} style={styles.banner} />

      {/* Movie Title */}
      <Text style={styles.movieTitle}>{movieDetails.name}</Text>

      {/* Movie Details (Launch Year, Runtime, Language, Rating) */}
      <View style={styles.detailsRow}>
        <Text style={styles.text}>{`Year: ${movieDetails.premiered}`}</Text>
        <Text style={styles.text}>{`Runtime: ${movieDetails.runtime} minutes`}</Text>
      </View>

      <View style={styles.detailsRow}>
      <Text style={styles.text}>{`Language: ${movieDetails.language}`}</Text>
        <Text style={styles.text}>{`Rating: ${movieDetails.rating?.average || 'N/A'}`}</Text>
      </View>

      {/* Watch Now Button */}
      <TouchableOpacity style={styles.watchNowButton}>
        <Text style={styles.watchNowButtonText}>Watch Now</Text>
      </TouchableOpacity>

      {/* Movie Summary */}
      
      <TouchableOpacity onPress={() => setnumol(numol === 100 ? 2 : 100)}>
  <Text numberOfLines={numol} style={styles.movieSummary}>
    {movieDetails.summary}
  </Text>
</TouchableOpacity>


      {/* Genres */}
      <Text style={styles.genres}>{`Genres: ${movieDetails.genres.join(', ')}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  banner: {
    width: 100,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color:'black'
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems:'center',
    width: '100%',
    marginBottom: 10,
    
  
  },
  text:{
    
      color: 'black',
      fontWeight:'bold',
      fontSize:15,

    
  },
  watchNowButton: {
    backgroundColor: 'black',
    width: '100%',
    paddingVertical: 10,
    marginBottom: 10,
  },
  watchNowButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  movieSummary: {
    textAlign: 'center',
    marginBottom: 10,
    color:'black',
    textAlign: 'left',
    borderWidth:3,
    borderRadius:10,
    borderColor:"grey",
    padding:5,
  },
  genres: {
    fontWeight: 'bold',
    color:'black',
  },
});

export default DetailsScreen;
