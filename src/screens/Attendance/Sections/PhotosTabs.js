// Photos.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardAlert from '../../../components/ui/CardAlert';
import {
  EyeIconModal,
  Lixeira,
  ImageOutline,
  Download,
  CancelIcon,
  TriangleAlert,
  CircleAlert,
} from '../../../components/Icons/Icons';

const WarningBox = ({ text }) => (
  <View style={styles.warningBox}>
    <CircleAlert
      name="info-outline"
      size={24}
      color="#FFA500"
      style={styles.warningIcon}
    />
    <Text style={styles.warningText}>{text}</Text>
  </View>
);

export default function PhotosTab({
  inseminacaoVisit,
  hasCameraPermission,
  loading,
  getLocationPhoto,
  images,
  renderItem,
  isHaveAttendence,
}) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {!inseminacaoVisit.id && <WarningBox text="Inicie o Atendimento!" />}

        {inseminacaoVisit && inseminacaoVisit.id && (
          <>
            {images.length > 0 ? (
              <FlatList
                data={images}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                style={styles.listContainer}
                scrollEnabled={false}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <WarningBox
                  text=" Aviso: Cada atendimento deve conter no mínimo 3 fotos e no
                  máximo 5 fotos."
                />
              </View>
            )}

            {inseminacaoVisit.pending == 0 && (
              <View style={styles.listContainer}>
                {!hasCameraPermission && (
                  <View style={styles.permissionWarning}>
                    <TriangleAlert />
                    <Text style={styles.permissionText}>
                      Permissão da câmera necessária
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={[
                    styles.addButton,
                    !hasCameraPermission && styles.disabledButton,
                  ]}
                  onPress={getLocationPhoto}
                  activeOpacity={0.8}
                  disabled={!hasCameraPermission && loading}
                >
                  <Text style={styles.addButtonText}>
                    {loading
                      ? 'Carregando...'
                      : images.length > 0
                      ? 'Adicionar Foto'
                      : 'Tirar Foto'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderWidth: 1,
    borderColor: '#FFE5B3',
    borderRadius: 12,
    padding: 16,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 24,
    width: '90%',
  },
  warningIcon: {
    marginRight: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#665A3E',
    lineHeight: 20,
    paddingLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 16,
    paddingVertical: 10,
  },

  emptyTitle: {
    fontFamily: 'Ubuntu-Light',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 18,
    maxWidth: '90%',
    lineHeight: 20,
  },
  emptyBox: {
    width: '90%',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBoxText: {
    fontFamily: 'Ubuntu-Light',
    fontSize: 15,
    color: '#888',
    marginTop: 12,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  addButton: {
    backgroundColor: '#008346',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    marginTop: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
  },
  photoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#ffffffff',
  },
  photoThumbnail: {
    width: 80,
    height: 70,
    borderRadius: 5,
    backgroundColor: '#ffffffff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  photoInfo: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  photoTitle: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 15,
    color: '#333',
  },
  photoDate: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 12,
    color: '#777',
    marginVertical: 4,
  },
  statusTag: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FFC107',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  statusTagText: {
    color: '#FFA000',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  photoActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '90%',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 90,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  modalDownloadButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },

  permissionWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFEAA7',
  },
  permissionText: {
    marginLeft: 8,
    color: '#856404',
    fontSize: 14,
    fontWeight: '500',
  },
  disabledButton: {
    backgroundColor: '#6c757d',
    opacity: 0.6,
  },
});
