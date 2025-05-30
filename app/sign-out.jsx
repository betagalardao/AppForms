export default function LogoutScreen() {
    const { signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        Alert.alert('Confirmar Saída', 'Tem certeza que deseja sair?', [
            { text: 'Cancelar', onPress: () => router.back() },
            { text: 'Sair', onPress: handleSignOut },
        ]);
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível fazer logout.');
        }
    };
}