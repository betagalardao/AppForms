import { useOAuth } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
    
    const signInWithGoogle = useCallback(async () => {
        try {
            const { createdSessionId, setActive } = await startOAuthFlow();
            if (createdSessionId && setActive) {
                await setActive({ session: createdSessionId });
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, [startOAuthFlow]);
}

return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.subtitle}>Faça login para acessar sua conta</Text>
        </View>
        
        <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
            <Ionicons name="logo-google" size={24} color="#ffffff" />
            <Text style={styles.googleButtonText}>Continuar com Google</Text>
        </TouchableOpacity>
    </View>
);

function DrawerNavigation() {
    return (
        <Drawer screenOptions={{
            headerStyle: { backgroundColor: '#6366F1' },
            headerTintColor: '#ffffff',
            drawerActiveTintColor: '#6366F1',
            drawerInactiveTintColor: '#6B7280',
        }}>
            <Drawer.Screen
                name="home"
                options={{
                    title: 'Início',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="profile"
                options={{
                    title: 'Perfil',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer>
    );
}