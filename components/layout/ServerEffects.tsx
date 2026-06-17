// Server component for static effects
import { Suspense } from 'react';
import ClientEffects from './ClientEffects';

export default function ServerEffects() {
    return (
        <Suspense fallback={null}>
            <ClientEffects />
        </Suspense>
    );
}

