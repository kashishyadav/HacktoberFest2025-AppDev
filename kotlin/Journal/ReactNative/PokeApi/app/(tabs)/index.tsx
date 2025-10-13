import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
  FlatList,
} from "react-native";

const { width } = Dimensions.get('window');

interface Sprite {
  front_default: string;
  back_default: string;
}

interface Ability {
  ability: { name: string };
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: Sprite;
  abilities: Ability[];
}

// Popular Pokemon suggestions
const POPULAR_POKEMON = [
  { name: "pikachu", emoji: "⚡", color: "#FFD700" },
  { name: "charizard", emoji: "🔥", color: "#FF6B47" },
  { name: "blastoise", emoji: "💧", color: "#4A90E2" },
  { name: "venusaur", emoji: "🌿", color: "#7ED321" },
  { name: "mewtwo", emoji: "🧠", color: "#9013FE" },
  { name: "mew", emoji: "💫", color: "#FF69B4" },
  { name: "lucario", emoji: "🥋", color: "#5D4E75" },
  { name: "garchomp", emoji: "🦈", color: "#417DC1" },
  { name: "rayquaza", emoji: "🐉", color: "#2ECC71" },
  { name: "gengar", emoji: "👻", color: "#6A4C93" },
];

const App = () => {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [front, setFront] = useState(true);
  const [randomLoading, setRandomLoading] = useState(false);

  const fetchPokemon = async (pokemonName: string | number) => {
    if (!pokemonName) {
      setError("Please enter a Pokémon name!");
      return;
    }

    setLoading(true);
    setError("");
    setPokemon(null);

    try {
      const searchTerm = typeof pokemonName === 'string' 
        ? pokemonName.toLowerCase().trim() 
        : pokemonName;
        
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );
      
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      
      const data = await response.json();
      setPokemon(data);
      
      // Only clear search if it was a manual search
      if (typeof pokemonName === 'string' && pokemonName === search) {
        setSearch("");
      }
      
      setError("");
      setFront(true); // Reset to front view for new Pokemon
    } catch (err) {
      setError("Pokémon not found! Please check the spelling.");
      setPokemon(null);
    }
    setLoading(false);
    setRandomLoading(false);
  };

  const fetchRandomPokemon = async () => {
    setRandomLoading(true);
    // Generate random number between 1 and 1010 (total number of Pokemon in API)
    const randomId = Math.floor(Math.random() * 1010) + 1;
    await fetchPokemon(randomId);
  };

  const fetchPoki = () => {
    fetchPokemon(search);
  };

  const selectPopularPokemon = (pokemonName: string) => {
    setSearch(pokemonName);
    fetchPokemon(pokemonName);
  };

  const toggleSprite = () => {
    if (pokemon?.sprites.back_default && pokemon?.sprites.front_default) {
      setFront(!front);
    } else {
      Alert.alert("Info", "Back sprite not available for this Pokémon");
    }
  };

  const renderPopularPokemon = ({ item }: { item: typeof POPULAR_POKEMON[0] }) => (
    <TouchableOpacity
      style={[styles.popularItem, { borderColor: item.color }]}
      onPress={() => selectPopularPokemon(item.name)}
      activeOpacity={0.7}
    >
      <Text style={styles.popularEmoji}>{item.emoji}</Text>
      <Text style={[styles.popularName, { color: item.color }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>🔍 Poké Dictionary</Text>

            {/* Search Container */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Pokémon name..."
                placeholderTextColor="#666"
                value={search}
                onChangeText={setSearch}
                onSubmitEditing={fetchPoki}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
              />
              <TouchableOpacity
                style={[styles.searchButton, loading && styles.searchButtonDisabled]}
                onPress={fetchPoki}
                disabled={loading}
                activeOpacity={0.7}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.buttonText}>Search</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Random Pokemon Button */}
            <TouchableOpacity
              style={[styles.randomButton, randomLoading && styles.randomButtonDisabled]}
              onPress={fetchRandomPokemon}
              disabled={randomLoading || loading}
              activeOpacity={0.7}
            >
              {randomLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Text style={styles.randomButtonEmoji}>🎲</Text>
                  <Text style={styles.randomButtonText}>Get Random Pokémon</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Popular Pokemon Suggestions */}
            <View style={styles.popularSection}>
              <Text style={styles.popularTitle}>✨ Popular Pokémon</Text>
              <FlatList
                data={POPULAR_POKEMON}
                renderItem={renderPopularPokemon}
                keyExtractor={(item) => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.popularList}
                ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
              />
            </View>

            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {pokemon && (
              <View style={styles.infoContainer}>
                <View style={styles.pokemonHeader}>
                  <Text style={styles.pokemonName}>
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                  </Text>
                  <Text style={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</Text>
                </View>

                <View style={styles.imageContainer}>
                  <TouchableOpacity 
                    onPress={toggleSprite}
                    activeOpacity={0.8}
                    style={styles.imageButton}
                  >
                    {front ? (
                      pokemon.sprites.front_default ? (
                        <Image
                          source={{ uri: pokemon.sprites.front_default }}
                          style={styles.image}
                          resizeMode="contain"
                        />
                      ) : (
                        <View style={styles.noImage}>
                          <Text style={styles.noImageText}>No Image</Text>
                        </View>
                      )
                    ) : (
                      pokemon.sprites.back_default ? (
                        <Image
                          source={{ uri: pokemon.sprites.back_default }}
                          style={styles.image}
                          resizeMode="contain"
                        />
                      ) : (
                        <View style={styles.noImage}>
                          <Text style={styles.noImageText}>No Back View</Text>
                        </View>
                      )
                    )}
                  </TouchableOpacity>
                  <Text style={styles.imageHint}>
                    {pokemon.sprites.back_default ? "Tap to flip" : "Front view only"}
                  </Text>
                </View>

                <View style={styles.statsContainer}>
                  <View style={styles.statBox}>
                    <Text style={styles.statIcon}>📏</Text>
                    <Text style={styles.statLabel}>Height</Text>
                    <Text style={styles.statValue}>{(pokemon.height / 10).toFixed(1)}m</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statIcon}>⚖️</Text>
                    <Text style={styles.statLabel}>Weight</Text>
                    <Text style={styles.statValue}>{(pokemon.weight / 10).toFixed(1)}kg</Text>
                  </View>
                </View>

                <View style={styles.abilitiesSection}>
                  <Text style={styles.abilitiesTitle}>✨ Abilities</Text>
                  <View style={styles.abilitiesContainer}>
                    {pokemon.abilities.map((item, index) => (
                      <View key={index} style={styles.abilityTag}>
                        <Text style={styles.abilityText}>
                          {item.ability.name.replace('-', ' ')}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    minHeight: 200,
  },
  title: {
    fontSize: Math.min(32, width * 0.08),
    fontWeight: "900",
    textAlign: "center",
    color: "#2d3436",
    marginBottom: 24,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#e1e5eb",
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    color: "#2d3436",
    minHeight: 52,
  },
  searchButton: {
    backgroundColor: "#FF5D5D",
    borderRadius: 16,
    padding: 16,
    minWidth: 90,
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF5D5D",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  searchButtonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  randomButton: {
    backgroundColor: "#6C5CE7",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6C5CE7",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  randomButtonDisabled: {
    opacity: 0.7,
  },
  randomButtonEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  randomButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  popularSection: {
    marginBottom: 20,
  },
  popularTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  popularList: {
    paddingHorizontal: 4,
  },
  popularItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  popularEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  popularName: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
    textAlign: "center",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 93, 93, 0.1)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 93, 93, 0.2)",
  },
  errorIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  errorText: {
    color: "#FF5D5D",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  infoContainer: {
    marginTop: 16,
    backgroundColor: "#fcfcfc",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  pokemonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  pokemonName: {
    fontSize: Math.min(28, width * 0.07),
    fontWeight: "800",
    color: "#2d3436",
    letterSpacing: 1,
    flex: 1,
  },
  pokemonId: {
    fontSize: 18,
    fontWeight: "600",
    color: "#636e72",
    backgroundColor: "#f1f2f6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  imageButton: {
    backgroundColor: "#f1f2f6",
    borderRadius: 100,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#e1e5eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    width: 200,
    height: 200,
  },
  image: {
    width: 160,
    height: 160,
  },
  noImage: {
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e5eb",
    borderRadius: 80,
  },
  noImageText: {
    color: "#636e72",
    fontSize: 16,
    fontWeight: "500",
  },
  imageHint: {
    marginTop: 8,
    fontSize: 12,
    color: "#636e72",
    fontStyle: "italic",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  statBox: {
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    width: "47%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e1e5eb",
    minHeight: 100,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#636e72",
    marginBottom: 8,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2d3436",
  },
  abilitiesSection: {
    marginTop: 8,
  },
  abilitiesTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  abilitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  abilityTag: {
    backgroundColor: "#E8F0FE",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    shadowColor: "#4285F4",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(66, 133, 244, 0.2)",
  },
  abilityText: {
    color: "#4285F4",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});

export default App;
