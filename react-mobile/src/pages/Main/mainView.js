import React, { useState } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfielButtonText,
} from './mainStyle';

export default function MainView({ navigation }) {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState('');
    const [loading, setloading] = useState(false);

    const handleAddUser = async () => {
        setloading(true);

        try {
            const response = await api.get(`/users/${newUser}`);
            const data = {
                name: response.data.name,
                login: response.data.login,
                bio: response.data.bio,
                avatar: response.data.avatar_url,
            };
            //validou apenas aqui, em cima antes da request não funcionou.
            const x = users.find((x) => x.login === data.login);
            if (x) {
                return;
            }

            setUsers([...users, data]);
            setNewUser('');
            setloading(false);
        } catch {
            console.log('Error');
        } finally {
            setloading(false);
            Keyboard.dismiss();
        }
    };

    const handleNavigate = (user) => {
        navigation.navigate('User', user);
        console.tron.log(user);

    };

    return (
        <Container>
            <Form>
                <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Adicionar usuário"
                    value={newUser}
                    onChangeText={(text) => setNewUser(text)}
                    returnKeyType="send"
                    onSubmitEditing={handleAddUser}
                />
                <SubmitButton onPress={handleAddUser}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                            <Icon name="add" size={20} color="#fff" />
                        )}
                </SubmitButton>
            </Form>
            <List
                data={users}
                keyExtractor={(user) => user.login}
                renderItem={({ item }) => (
                    <User>
                        <Avatar source={{ uri: item.avatar }} />
                        <Name>{item.name}</Name>
                        <Bio>{item.bio}</Bio>

                        <ProfileButton onPress={() => handleNavigate(item)}>
                            <ProfielButtonText>Ver perfil</ProfielButtonText>
                        </ProfileButton>
                    </User>
                )}
            />
        </Container>
    );
}
