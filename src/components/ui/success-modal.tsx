import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from './alert-dialog';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, onLogin }) => {
    useEffect(() => {
        console.log('SuccessModal isOpen state changed:', isOpen);
    }, [isOpen]);

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 border-0">
                <AlertDialogHeader className="items-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <AlertDialogTitle className="text-2xl font-black text-slate-900 mb-2 text-center">
                        Pendaftaran Berhasil!
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-500 font-medium text-center">
                        Akun Anda telah berhasil dibuat. Silakan masuk untuk mulai menjelajah event seru.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center mt-4">
                    <AlertDialogAction
                        onClick={onLogin}
                        className="w-full py-6 text-lg font-black bg-primary hover:bg-orange-600 shadow-xl shadow-primary/20 rounded-2xl group text-white border-0"
                    >
                        MASUK SEKARANG
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

