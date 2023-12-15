"use client";
import { Provider } from 'react-redux';
import ToastWrapper from './ToastWrapper';
import { store } from '../state/store';
import { AuthProvider } from '../contexts/AuthContext';

const ProviderWrapper = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <AuthProvider>
            <Provider store={store}>
                <>
                    <ToastWrapper />
                    {children}
                </>
            </Provider>
        </AuthProvider>
    )
}

export default ProviderWrapper;