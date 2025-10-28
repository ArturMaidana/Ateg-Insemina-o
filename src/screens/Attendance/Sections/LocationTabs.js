// Location.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function LocationTab({ openMap, location, error }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/Maps.png')}
        style={styles.image}
      />
      <Text style={styles.title}>
        Acesse o mapa para consultar a localização
      </Text>

      <TouchableOpacity style={styles.mapButton} onPress={openMap}>
        <Text style={styles.mapButtonText}>Mostrar Mapa</Text>
      </TouchableOpacity>

      {location && (
        <Text style={styles.locationText}>
          Latitude: {location.latitude} {'\n'}
          Longitude: {location.longitude}
        </Text>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: '80%',
  },
  mapButton: {
    backgroundColor: '#008346',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Bold',
    fontSize: 16,
  },

  // Estilos do Modal (mantidos do fonte, embora o Modal em si esteja no index.js)
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Bold',
    fontSize: 16,
  },

  // --- Estilos ADICIONADOS para suportar a lógica do 'LocationTab' (destino) ---
  locationText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
