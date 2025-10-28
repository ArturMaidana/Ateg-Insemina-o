import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { ShieldCheckIcon } from '../Icons/Icons';

const CloseIcon = () => (
  <Text style={{ fontSize: 24, color: '#333', fontWeight: '300' }}>×</Text>
);

export default function NotesUpdates({ isVisible, onClose }) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropOpacity={0.5}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionOutTiming={1}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <ShieldCheckIcon width={22} height={22} />
            <Text style={styles.headerTitle}>Notas de Atualização</Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
        >
          <Text style={styles.title}>
            🆕 Notas de Atualização – Senar Mutirão
          </Text>
          <Text style={styles.subtitle}>Versão: 1.0.0 | Outubro de 2025</Text>

          <Text style={styles.paragraph}>
            O Senar Mutirão foi desenvolvido pelo Serviço Nacional de
            Aprendizagem Rural de Mato Grosso (SENAR-MT) para aproximar os
            cidadãos das ações sociais promovidas em todo o estado.
          </Text>
          <Text style={styles.paragraph}>
            Nesta versão, apresentamos a primeira liberação oficial do
            aplicativo, com foco em acessibilidade, praticidade e transparência
            das informações sobre os mutirões realizados.
          </Text>

          <Text style={styles.sectionTitle}>
            🚀 Novidades e Funcionalidades
          </Text>
          <Text style={styles.bullet}>
            • Visualização dos mutirões realizados e em andamento pelo SENAR-MT;
          </Text>
          <Text style={styles.bullet}>
            • Consulta detalhada dos serviços oferecidos, como oftalmologia,
            odontologia, enfermagem, corte de cabelo, maquiagem e confecção de
            óculos;
          </Text>
          <Text style={styles.bullet}>
            • Cadastro de participantes de forma prática e segura;
          </Text>
          <Text style={styles.bullet}>
            • Interface moderna e intuitiva, desenvolvida para facilitar a
            navegação;
          </Text>
          <Text style={styles.bullet}>
            • Compatibilidade com diferentes tamanhos de tela e dispositivos
            Android.
          </Text>

          <Text style={styles.sectionTitle}>🔒 Segurança e Privacidade</Text>
          <Text style={styles.paragraph}>
            • Implementação de medidas de segurança e criptografia para proteger
            os dados dos usuários.
          </Text>
          <Text style={styles.paragraph}>
            • Coleta de informações pessoais apenas para fins de registro e
            controle das atividades do SENAR-MT, conforme a Lei Geral de
            Proteção de Dados (LGPD).
          </Text>

          <Text style={styles.sectionTitle}>🛠️ Melhorias e Correções</Text>
          <Text style={styles.bullet}>
            • Ajustes na estabilidade e desempenho do aplicativo;
          </Text>
          <Text style={styles.bullet}>
            • Correção de pequenos erros de navegação e carregamento de dados;
          </Text>
          <Text style={styles.bullet}>
            • Aprimoramento da experiência do usuário (UX).
          </Text>

          <Text style={styles.sectionTitle}>💡 Próximas Atualizações</Text>
          <Text style={styles.bullet}>
            • Histórico completo de mutirões anteriores;
          </Text>
          <Text style={styles.bullet}>
            • Notificações sobre novos eventos e serviços;
          </Text>
          <Text style={styles.bullet}>
            • Integração com outros sistemas do SENAR-MT.
          </Text>

          <Text style={styles.sectionTitle}>📞 Contato</Text>
          <Text style={styles.paragraph}>
            Em caso de dúvidas ou sugestões, entre em contato com o SENAR Mato
            Grosso pelos canais oficiais:
          </Text>
          <Text style={styles.paragraph}>
            📧 E-mail: [inserir e-mail oficial]
          </Text>
          <Text style={styles.paragraph}>
            🌐 Site: https://www.senarmt.org.br
          </Text>

          <Text style={styles.paragraph}>
            SENAR Mato Grosso – Serviço Nacional de Aprendizagem Rural
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    height: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 15,
    color: '#212121',
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 14,
    color: '#212121',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 12,
    color: '#757575',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 14,
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontFamily: 'Ubuntu-Light',
    fontSize: 13,
    color: '#000000ff',
    lineHeight: 22,
    marginBottom: 12,
  },
  bullet: {
    fontFamily: 'Ubuntu-Light',
    fontSize: 13,
    color: '#000000ff',
    lineHeight: 22,
    marginBottom: 6,
    marginLeft: 10,
  },
});
