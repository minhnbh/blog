import React, { useEffect } from 'react';
import './App.css';
import DataApiContext from 'app/components/core/contexts/DataAPIContext';
import AppContext from 'app/components/core/AppContext';
import I18next from 'app/components/I18next';
import { IconContext } from 'react-icons';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from 'AppContainer';
import { reducerMappingList } from 'storeConfigs';
import axios from 'axios';

const App: React.FC = () => {
  const handleGetConfigs = async () => {
    try {
      const configUrls = ['config/main.json'];
      const promiseList = configUrls.map(url => {
        return axios.get(url);
      });

      const configResponse = await Promise.all(promiseList);
      const [mainConfigResponse] = configResponse;
      const mainConfig = mainConfigResponse.data as AppConfiguration;
      window.appConfig = {
        ...mainConfig
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetConfigs();
  }, []);

  return (
    <DataApiContext.Provider value={{}}>
      <AppContext customReducers={reducerMappingList}>
        <I18next>
          <IconContext.Provider value={{ size: '1.6rem', className: 'icon' }}>
            <BrowserRouter>
              <AppContainer />
            </BrowserRouter>
          </IconContext.Provider>
        </I18next>
      </AppContext>
    </DataApiContext.Provider>
  );
};

export default App;
