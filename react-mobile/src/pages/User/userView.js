import React, { useState } from 'react';
import { Container, Header, Avatar, Name, Bio, Stars, Starred, OwnerAvatar, Info, Title, Author } from './userStyles';

export default function UserView({ route, navigation }) {
    const { avatar, name, bio, stars } = route.params;

    return (
        <Container>
            <Header>
                <Avatar source={{ uri: avatar }} />
                <Name>{name}</Name>
                <Bio>{bio}</Bio>
            </Header>
            <Stars
                data={stars}
                keyExtractor={stars => String(stars.id)}
                renderItem={({ item }) => (
                    <Starred>
                        <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                        <Info>
                            <Title>{item.name}</Title>
                            <Author>{item.owner.login}</Author>
                        </Info>
                    </Starred>
                )}
            />
        </Container>


    )
}

