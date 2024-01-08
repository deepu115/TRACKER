import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        setLoading(true);
        axios.post('http://localhost:5000/signup', { username, password }) // Replace with your backend URL
            .then(response => {
                setLoading(false);
                if (response.data.success) {
                    setSuccess(true);
                } else {
                    setError(true);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
                setError(true);
            });
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, color: 'white', marginBottom: 20 }}>Signup</Text>
            <TextInput
                style={{ width: '80%', height: 40, backgroundColor: 'white', marginBottom: 10, paddingHorizontal: 10 }}
                placeholder="Username"
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                style={{ width: '80%', height: 40, backgroundColor: 'white', marginBottom: 10, paddingHorizontal: 10 }}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
                style={{ width: '80%', height: 40, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}
                onPress={handleSignup}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="green" />
                ) : (
                    <Text style={{ fontSize: 16, color: 'green' }}>Signup</Text>
                )}
            </TouchableOpacity>
            {success && <Text style={{ fontSize: 16, color: 'white', marginBottom: 10 }}>Signup successful!</Text>}
            {error && <Text style={{ fontSize: 16, color: 'white', marginBottom: 10 }}>Signup error!</Text>}
        </View>
    );
};

export default Signup;
