// Location.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground, // Usado para colocar o pin sobre o mapa
} from 'react-native';
// Importa os ícones que você já usa
import {
  OutlineLocationOn,
  LocationOn,
  LocationPin,
} from '../../../components/Icons/Icons.js';
// Importa um ícone padrão para o botão "play"
import Icon from 'react-native-vector-icons/MaterialIcons';

// Função para formatar as coordenadas como no protótipo (ex: 4.1234° S)
const formatCoordinates = (lat, lon) => {
  try {
    if (
      lat === null ||
      lon === null ||
      lat === undefined ||
      lon === undefined
    ) {
      return 'Coordenadas indisponíveis';
    }

    const latVal = parseFloat(lat);
    const lonVal = parseFloat(lon);

    if (isNaN(latVal) || isNaN(lonVal)) {
      return 'Coordenadas inválidas';
    }

    const latDir = latVal >= 0 ? 'N' : 'S';
    const lonDir = lonVal >= 0 ? 'E' : 'W';

    const formattedLat = Math.abs(latVal).toFixed(4);
    const formattedLon = Math.abs(lonVal).toFixed(4);

    return `Coordenadas: ${formattedLat}° ${latDir}, ${formattedLon}° ${lonDir}`;
  } catch (e) {
    console.error('Erro ao formatar coordenadas:', e);
    return 'Erro nas coordenadas';
  }
};

export default function LocationTab({ schedule, openMap, error }) {
  // Formata as coordenadas vindas do 'schedule'
  const coordinates = formatCoordinates(
    schedule?.latitude,
    schedule?.longitude,
  );

  return (
    <View style={styles.container}>
      {/* Card de Informação da Localização */}
      <View style={styles.locationCard}>
        <OutlineLocationOn color="#8C8C8C" />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardLabel}>Localização do Atendimento</Text>
          <Text style={styles.cardValue}>{schedule?.property || '...'}</Text>
          <Text style={styles.coordinatesText}>{coordinates}</Text>
        </View>
      </View>

      {/* Botão Exibir Mapa */}
      <TouchableOpacity style={styles.mapButton} onPress={openMap}>
        <LocationPin
          name="play-arrow"
          size={22}
          color="#FFFFFF"
          style={styles.buttonIcon}
        />
        <Text style={styles.mapButtonText}>Exibir Mapa</Text>
      </TouchableOpacity>

      {/* Exibe erro do GPS, se houver (mantido da lógica antiga) */}
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
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 16,
    width: '100%',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 12, // Espaço do ícone
  },
  cardLabel: {
    fontSize: 13,
    color: '#8C8C8C',
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '500',
    marginBottom: 4,
  },
  coordinatesText: {
    fontSize: 13,
    color: '#555',
  },
  mapImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#E0E0E0', // Fundo para caso a imagem falhe
  },
  mapImageStyle: {
    borderRadius: 16, // Aplica borda à imagem de fundo
  },
  mapPin: {
    // Sombra para destacar o pin
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#008346',
    paddingVertical: 12,
    borderRadius: 12,
    width: '70%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  buttonIcon: {
    marginRight: 8,
    paddingLeft: 20,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
