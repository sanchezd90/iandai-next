import React from 'react';
import {Box} from '@mui/material';
import { HomeInfo } from './HomeInfo';
import getIntl from '../intl';
import ServerIntlProvider from './components/ServerIntlProvider';

export default async function Home({ params: { locale } }:any) {
    
  const intl = await getIntl(locale, 'landing');
  return (
    <ServerIntlProvider messages={intl.messages} locale={intl.locale}>
      <Box marginTop={6}>            
        <HomeInfo/>                      
      </Box>
    </ServerIntlProvider>
  );
}
