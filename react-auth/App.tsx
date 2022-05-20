import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';

import { theme } from './styles/theme';
import { queryClient } from './services/queryClient';
import { AppRoutes } from './routes';
import { AuthProvider } from './services/providers/AuthProvider';
import { SidebarDrawerProvider } from './services/providers/SidebarDrawerProvider';


function App() {

  return (
    <ChakraProvider resetCSS theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/* <SidebarDrawerProvider> */}
            <AppRoutes />
          {/* </SidebarDrawerProvider> */}
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default App;
