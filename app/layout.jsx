import * as SecureStore from 'expo-secure-store';

const tokenCache = {
    async getToken(key) {
        return SecureStore.getItemAsync(key);
    },
    async saveToken(key, value) {
        return SecureStore.setItemAsync(key, value);
    },
};

import { ClerkProvider } from '@clerk/clerk-expo';

const CLERK_PUBLIC_KEY = 'sua_chave_publica_aqui';

export default function RootLayout() {
    return (
        <ClerkProvider publishableKey={CLERK_PUBLIC_KEY} tokenCache={tokenCache}>
            <AuthHandler />
        </ClerkProvider>
    );
}

function AuthHandler() {
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace('/sign-in');
        }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded) return <LoadingScreen />;
    if (isSignedIn) return <DrawerNavigation />;
    return <AuthStackNavigation />;
}