import { connectSocket, disconnectSocket} from '@/services/socket';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';

export default function AppLayout() {
    const [socketReady, setSocketReady] = useState(false);

  useEffect(() => {
    const setupSocket = async () => {
            await connectSocket();
            setSocketReady(true);
        };

        setupSocket();
  }, []);

  if (!socketReady) {
    return null; // or a loading indicator
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}