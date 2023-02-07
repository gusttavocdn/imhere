import dayjs from 'dayjs';
import { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Participant } from '../../components/Participant';
import { styles } from './styles';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  const day = dayjs().format('dddd, D [de] MMMM [de] YYYY');

  const handleParticipantRemove = (name: string) => {
    Alert.alert('Remover', 'Deseja remover o participante?', [
      {
        text: 'Sim',
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name)
          ),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  };

  const handleParticipantAdd = () => {
    if (participants.includes(participantName)) {
      return Alert.alert('Participante já adicionado');
    }

    setParticipants((prevState) => [...prevState, participantName]);
    setParticipantName('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>{`${day}.`}</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nome do participante'
          placeholderTextColor='#6B6B6B'
          value={participantName}
          onChangeText={setParticipantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item, i) => `${item}-${i}`}
        renderItem={({ item }) => (
          <Participant
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista
            de presença
          </Text>
        )}
      />

      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {participants.map((participant, i) => (
          <Participant
            key={`${participant}-${i}`}
            name={participant}
            onRemove={handleParticipantRemove}
          />
        ))}
      </ScrollView> */}
    </View>
  );
}
