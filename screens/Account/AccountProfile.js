import React, { Component } from 'react'

import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Card, Icon } from 'react-native-elements'
// import { useSelector } from 'react-redux'

const AccountProfile = props => {
    navigationOptions = {
        title: 'profile',
    }

    const auth = useSelector(state => state.authReducer)

    const formatPhoneNumber = phoneNumberString => {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
    }

    return (
        <View style={styles.profile}>
            <Card style={styles.profileCard}>
                <View style={styles.avatarContainer}>
                    {/* If user has profile pic, use that as avatar
          else use the first letter of their name as a
          placeholder */}
                    {auth.photo && (
                        <Avatar size="xlarge" rounded source={auth.photo} />
                    )}
                    {!auth.photo && (
                        <Avatar
                            size="xlarge"
                            rounded
                            title={auth.username[0].toUpperCase()}
                        />
                    )}
                </View>
                <View>
                    <Text style={styles.userName}>{auth.username}</Text>
                    <Text style={styles.userDetails}>
                        <Text>
                            {auth.user.email} {'\n'}
                        </Text>
                        <Text>
                            {formatPhoneNumber(auth.user.phone)} {'\n'}
                        </Text>
                    </Text>
                    <Text style={{ marginBottom: 20 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. {'\n'}
                    </Text>
                    <Button
                        icon={<Icon name="code" color="#ffffff" />}
                        buttonStyle={{
                            borderRadius: 0,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 0,
                        }}
                        title="Some Action"
                    />
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    profile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    avatarContainer: {
        position: 'relative',
        marginTop: -80,
        alignSelf: 'center',
    },
    profileContainer: {
        padding: 0,
        zIndex: 1,
    },
    profileCard: {
        marginTop: 65,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
    },
    userDetails: {
        fontSize: 16,
        color: '#5d5d6d',
        marginTop: 10,
        textAlign: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    link: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
        color: 'blue',
    },
})
export default AccountProfile
