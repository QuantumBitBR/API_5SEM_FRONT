import mitt from 'mitt';

type ToastPayload = {
    severity: 'success' | 'info' | 'warn' | 'error';
    summary: string;
    detail: string;
    life?: number;
};

type Events = {
    toast: ToastPayload;
};

const emitter = mitt<Events>();

export function showToast(payload: ToastPayload) {
    emitter.emit('toast', payload);
}

export function onToast(callback: (payload: ToastPayload) => void) {
    emitter.on('toast', callback);
}

export function offToast(callback: (payload: ToastPayload) => void) {
    emitter.off('toast', callback);
}

export default emitter;
