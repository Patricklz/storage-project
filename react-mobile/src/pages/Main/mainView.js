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

export default function MainView() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState('');
    const [loading, setloading] = useState(false);

    const handleAddUser = async () => {
        setloading(true);

        const response = await api.get(`/users/${newUser}`);
        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
        };
        setUsers([...users, data]);
        setNewUser('');
        setloading(false);

        Keyboard.dismiss();
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

                        <ProfileButton onPress={() => { }}>
                            <ProfielButtonText>Ver perfil</ProfielButtonText>
                        </ProfileButton>
                    </User>
                )}
            />
        </Container>
    );
}
