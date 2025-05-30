import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    firstName: Yup.string().required('Primeiro nome é obrigatório'),
    lastName: Yup.string().required('Sobrenome é obrigatório'),
});

import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
    Alert.alert('Selecionar Imagem', 'Escolha uma opção:', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Galeria', onPress: () => openImagePicker() },
        { text: 'Câmera', onPress: () => openCamera() },
    ]);
};

const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
    });

    if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
    }
};

const handleSubmit = async (values, { setSubmitting }) => {
    try {
        await user.update({
            unsafeMetadata: {
                firstName: values.firstName,
                lastName: values.lastName,
            },
        });

        if (selectedImage) {
            const response = await fetch(selectedImage);
            const blob = await response.blob();
            await user.setProfileImage({ file: blob });
        }

        setSnackbarMessage('Perfil atualizado com sucesso!');
    } catch (error) {
        setSnackbarMessage('Erro ao atualizar o perfil.');
    }
};